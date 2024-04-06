import { useState, useEffect } from "react";
import { CatsDropdownWrapper } from "../components/molecules/CatsDropdownWrapper";
import { CatList } from "../components/organisims/CatList";
import { DeleteCatsModal } from "../components/molecules/DeleteCatsModal";
import { RemoveFavouritesModal } from "../components/molecules/RemoveFavouritesModal";
import { useGetCatsByBreed } from "../hooks/useGetCatsByBreed";
import { useGetFavouriteCats } from "../hooks/useGetFavouriteCats";
import { useAddToFavourites } from "../hooks/useAddToFavourites";
import { useRemoveFromFavourites } from "../hooks/useRemoveFromFavourites";
import { Favourite, Cat } from "../types/types";
import { SliderValue } from "@nextui-org/slider";

type MappedCat = {
  url: string;
  id: string;
  isFavourite: boolean;
  favouriteId?: number;
};

const Home = () => {
  const [mappedCats, setMappedCats] = useState<MappedCat[]>([]);
  const [limitValue, setLimitValue] = useState<SliderValue>(20);
  const [selectedBreed, setSelectedBreed] = useState<{
    name: string;
    id: string;
  }>({ name: "Abyssinian", id: "abys" });

  const { cats, catsAreLoading } = useGetCatsByBreed(
    selectedBreed.id,
    limitValue as number
  );

  const { favourites, favouritesAreLoading } = useGetFavouriteCats();

  const catMapper = (cats: Cat[], favourites: Favourite[]) => {
    const result = cats.map((cat) => {
      const isFavourite = favourites.some(
        (favourite) => favourite.image_id === cat.id
      );
      const favouriteId = favourites.find(
        (favourite) => favourite.image_id === cat.id
      )?.id;
      return {
        url: cat.url,
        id: cat.id,
        isFavourite,
        favouriteId: favouriteId,
      };
    });
    return result;
  };

  const { addToFavourites } = useAddToFavourites();

  const handleAddToFavourites = (imageId: string) => {
    addToFavourites(imageId);
    setMappedCats((prevCats) =>
      prevCats.map((cat) =>
        cat.id === imageId ? { ...cat, isFavourite: true } : cat
      )
    );
  };

  const { removeFromFavourites } = useRemoveFromFavourites();
  const handleRemoveFromFavourites = (
    id: string,
    favouriteId?: number | null
  ) => {
    if (favouriteId) {
      removeFromFavourites(favouriteId);
    }
    setMappedCats((prevCats) =>
      prevCats.map((cat) =>
        cat.id === id ? { ...cat, isFavourite: false } : cat
      )
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
    <main className="container mx-auto">
      <CatsDropdownWrapper
        selectedBreed={selectedBreed}
        setSelectedBreed={setSelectedBreed}
        setLimitValue={setLimitValue}
      />
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
