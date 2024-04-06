import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeCatFromFavourites } from "../../services/api";
import { Favourite } from "../../types/types";

export function useRemoveFromFavourites() {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (favouriteId: number) => removeCatFromFavourites(favouriteId),
    onSuccess: (_, variables) => {
      queryClient.setQueryData(
        ["fetchFavouriteCats"],
        (favourites: Favourite[]) =>
          favourites.filter((favourite) => favourite.id !== variables)
      );
    },
  });

  return { removeFromFavourites: mutate };
}
