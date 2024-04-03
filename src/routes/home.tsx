import { useState, useEffect } from "react";
import { CatsDropdownWrapper } from "../components/molecules/CatsDropdownWrapper";
import { CatList } from "../components/organisims/CatList";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  fetchCatsByBreed,
  fetchFavouriteCats,
  addCatToFavourites,
} from "../services/api";
import { Favourite, Cat } from "../types/types";

type MappedCat = {
  url: string;
  id: string;
  isFavourite: boolean;
};

const Home = () => {
  const [mappedCats, setMappedCats] = useState<MappedCat[]>([]);

  const [selectedBreed, setSelectedBreed] = useState<{
    name: string;
    id: string;
  }>({ name: "Abyssinian", id: "abys" });

  const { data: cats, isLoading: catsAreLoading } = useQuery<Cat[]>({
    queryFn: () => fetchCatsByBreed(selectedBreed.id),
    queryKey: ["fetchCatsByBreed", selectedBreed.id],
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
      return {
        url: cat.url,
        id: cat.id,
        isFavourite,
      };
    });
    return result;
  };

  const { mutate: addToFavourites } = useMutation({
    mutationFn: (imageId: string) => addCatToFavourites(imageId),
  });

  const handleAddToFavourites = (imageId: string) => {
    addToFavourites(imageId);
    setMappedCats((prevCats) =>
      prevCats.map((cat) =>
        cat.id === imageId ? { ...cat, isFavourite: true } : cat
      )
    );
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
      />
      <CatList
        selectedBreed={selectedBreed}
        cats={mappedCats}
        isLoading={isLoading}
        onAddToFavourites={handleAddToFavourites}
      />
    </main>
  );
};

export default Home;
