import { useState, useEffect } from "react";
import { useRemoveFromFavourites } from "../hooks/useRemoveFromFavourites";
import { useGetFavouriteCats } from "../hooks/useGetFavouriteCats";
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
  const { favourites, favouritesAreLoading } = useGetFavouriteCats();

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

  const { removeFromFavourites } = useRemoveFromFavourites();
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
      <FavouriteList cats={mappedCats} isLoading={favouritesAreLoading} />
      <RemoveFavouritesModal removeFavourite={handleRemoveFromFavourites} />
    </>
  );
};

export default Favorites;
