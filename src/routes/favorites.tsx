import { useQuery } from "@tanstack/react-query";
import { fetchFavouriteCats } from "../services/api";
import { FavouriteList } from "../components/organisims/FavouriteList";
import { Favourite } from "../types/types";

const Favorites = () => {
  const { data: favourites, isLoading } = useQuery<Favourite[]>({
    queryFn: () => fetchFavouriteCats(),
    queryKey: ["fetchFavouriteCats"],
  });

  const mappedFavourites = favourites?.map((favourite) => ({
    url: favourite.image.url,
    id: favourite.image_id,
    isFavourite: true,
  }));

  return (
    <>
      <FavouriteList cats={mappedFavourites} isLoading={isLoading} />
    </>
  );
};

export default Favorites;
