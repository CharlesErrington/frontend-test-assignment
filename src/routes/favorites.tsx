import { useState, useEffect } from "react";
import { useRemoveFromFavourites } from "../hooks/queries/useRemoveFromFavourites";
import { useGetFavouriteCats } from "../hooks/queries/useGetFavouriteCats";
import { favouriteMapper } from "../utils/mapper";
import { RemoveFavouritesModal } from "../components/molecules/RemoveFavouritesModal";
import { FavouriteList } from "../components/organisims/FavouriteList";

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
      setMappedCats(favouriteMapper(favourites));
    }
  }, [favourites]);

  const { removeFromFavourites } = useRemoveFromFavourites();
  const handleRemoveFromFavourites = (
    id: string,
    favouriteId?: number | null,
  ) => {
    if (favouriteId) {
      removeFromFavourites(favouriteId);
    }
    setMappedCats((prevCats) => prevCats.filter((cat) => cat.id !== id));
  };

  return (
    <main className="container mx-auto px-4 py-4 md:px-8">
      <FavouriteList cats={mappedCats} isLoading={favouritesAreLoading} />
      <RemoveFavouritesModal removeFavourite={handleRemoveFromFavourites} />
    </main>
  );
};

export default Favorites;
