import { useQuery } from "@tanstack/react-query";
import { fetchFavouriteCats } from "../services/api";
import { Favourite } from "../types/types";

export function useGetFavouriteCats() {
  const { data, isLoading } = useQuery<Favourite[]>({
    queryFn: () => fetchFavouriteCats(),
    queryKey: ["fetchFavouriteCats"],
  });

  return { favourites: data, favouritesAreLoading: isLoading };
}
