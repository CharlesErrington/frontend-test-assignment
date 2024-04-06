import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCatToFavourites } from "../../services/api";

export function useAddToFavourites() {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (imageId: string) => addCatToFavourites(imageId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchFavouriteCats"] });
    },
  });

  return { addToFavourites: mutate };
}
