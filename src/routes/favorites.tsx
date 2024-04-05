import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchFavouriteCats, removeCatFromFavourites } from "../services/api";
import { RemoveFavouritesModal } from "../components/molecules/RemoveFavouritesModal";
import { FavouriteList } from "../components/organisims/FavouriteList";
import { Favourite } from "../types/types";

type Cat = {
  url: string;
  id: string;
  favouriteId: number;
};

const Favorites = () => {
  const [mappedCats, setMappedCats] = useState<Cat[]>([]);

  const queryClient = useQueryClient();
  const { data: favourites, isLoading } = useQuery<Favourite[]>({
    queryFn: () => fetchFavouriteCats(),
    queryKey: ["fetchFavouriteCats"],
  });

  useEffect(() => {
    if (favourites) {
      setMappedCats(mappedFavourites(favourites));
    }
  }, [favourites]);

  const mappedFavourites = (favourites: Favourite[]) => {
    return favourites?.map((favourite) => ({
      url: favourite.image.url,
      id: favourite.image_id,
      favouriteId: favourite.id,
    }));
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
    setMappedCats((prevCats) => prevCats.filter((cat) => cat.id !== id));
  };

  return (
    <>
      <FavouriteList cats={mappedCats} isLoading={isLoading} />
      <RemoveFavouritesModal removeFavourite={handleRemoveFromFavourites} />
    </>
  );
};

export default Favorites;
