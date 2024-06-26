import { useState, useEffect } from "react";
import { FilterWrapper } from "../components/molecules/FilterWrapper";
import { CatList } from "../components/organisims/CatList";
import { DeleteCatsModal } from "../components/molecules/DeleteCatsModal";
import { RemoveFavouritesModal } from "../components/molecules/RemoveFavouritesModal";
import { useGetCatsByBreed } from "../hooks/queries/useGetCatsByBreed";
import { useGetFavouriteCats } from "../hooks/queries/useGetFavouriteCats";
import { useAddToFavourites } from "../hooks/queries/useAddToFavourites";
import { useRemoveFromFavourites } from "../hooks/queries/useRemoveFromFavourites";
import { useStore } from "../store";
import { catMapper } from "../utils/mapper";
import { ExtendedCat } from "../components/organisims/CatList";

const Home = () => {
  const [mappedCats, setMappedCats] = useState<ExtendedCat[]>([]);
  const selectedBreed = useStore((state) => state.selectedBreed);
  const limitValue = useStore((state) => state.limitValue);

  const { cats, catsAreLoading } = useGetCatsByBreed(
    selectedBreed.id,
    limitValue as number,
  );

  const { favourites, favouritesAreLoading } = useGetFavouriteCats();

  const { addToFavourites } = useAddToFavourites();
  const handleAddToFavourites = (imageId: string) => {
    addToFavourites(imageId);
    setMappedCats((prevCats) =>
      prevCats.map((cat) =>
        cat.id === imageId ? { ...cat, isFavourite: true } : cat,
      ),
    );
  };

  const { removeFromFavourites } = useRemoveFromFavourites();
  const handleRemoveFromFavourites = (
    id: string,
    favouriteId?: number | null,
  ) => {
    if (favouriteId) {
      removeFromFavourites(favouriteId);
    }
    setMappedCats((prevCats) =>
      prevCats.map((cat) =>
        cat.id === id ? { ...cat, isFavourite: false } : cat,
      ),
    );
  };

  const deleteCat = (imageId: string) => {
    setMappedCats((prevCats) => prevCats.filter((cat) => cat.id !== imageId));
  };

  useEffect(() => {
    if (cats && favourites) {
      const result = catMapper(cats, favourites);
      setMappedCats(result);
    }
  }, [cats, favourites]);

  const isLoading = catsAreLoading || favouritesAreLoading;

  return (
    <main className="container mx-auto px-4 md:px-8">
      <FilterWrapper limitValue={limitValue} />
      <CatList
        selectedBreed={selectedBreed}
        cats={mappedCats}
        isLoading={isLoading}
        onAddToFavourites={handleAddToFavourites}
      />
      <DeleteCatsModal deleteCat={deleteCat} />
      <RemoveFavouritesModal removeFavourite={handleRemoveFromFavourites} />
    </main>
  );
};

export default Home;
