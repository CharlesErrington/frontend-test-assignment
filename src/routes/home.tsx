import { useState, useEffect } from "react";
import { CatsDropdownWrapper } from "../components/molecules/CatsDropdownWrapper";
import { CatList } from "../components/organisims/CatList";
import { DeleteCatsModal } from "../components/molecules/DeleteCatsModal";
import { RemoveFavouritesModal } from "../components/molecules/RemoveFavouritesModal";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchCatsByBreed,
  fetchFavouriteCats,
  addCatToFavourites,
  removeCatFromFavourites,
} from "../services/api";
import { Favourite, Cat } from "../types/types";
import { SliderValue } from "@nextui-org/slider";

type MappedCat = {
  url: string;
  id: string;
  isFavourite: boolean;
  favouriteId?: number;
};

const Home = () => {
  const queryClient = useQueryClient();
  const [mappedCats, setMappedCats] = useState<MappedCat[]>([]);
  const [limitValue, setLimitValue] = useState<SliderValue>(20);

  const [selectedBreed, setSelectedBreed] = useState<{
    name: string;
    id: string;
  }>({ name: "Abyssinian", id: "abys" });

  const { data: cats, isLoading: catsAreLoading } = useQuery<Cat[]>({
    queryFn: () => fetchCatsByBreed(selectedBreed.id, limitValue as number),
    queryKey: ["fetchCatsByBreed", selectedBreed.id, limitValue],
  });

  const { data: favourites, isLoading: favouritesAreLoading } = useQuery<
    Favourite[]
  >({
    queryFn: () => fetchFavouriteCats(),
    queryKey: ["fetchFavouriteCats"],
  });

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

  const { mutate: addToFavourites } = useMutation({
    mutationFn: (imageId: string) => addCatToFavourites(imageId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchFavouriteCats"] });
    },
  });

  const handleAddToFavourites = (imageId: string) => {
    addToFavourites(imageId);
    setMappedCats((prevCats) =>
      prevCats.map((cat) =>
        cat.id === imageId ? { ...cat, isFavourite: true } : cat
      )
    );
  };

  const { mutate: removeFromFavourites } = useMutation({
    mutationFn: (favouriteId: number) => removeCatFromFavourites(favouriteId),
    onSuccess: (_, variables) => {
      queryClient.setQueryData(
        ["fetchFavouriteCats"],
        (favourites: Favourite[]) =>
          favourites.filter((favourite) => favourite.id !== variables)
      );
    },
  });

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
