import { useQuery } from "@tanstack/react-query";
import { fetchCatsByBreed } from "../services/api";
import { Cat } from "../types/types";

export function useGetCatsByBreed(breedId: string, limit: number) {
  const { data, isLoading } = useQuery<Cat[]>({
    queryFn: () => fetchCatsByBreed(breedId, limit),
    queryKey: ["fetchCatsByBreed", breedId, limit],
  });

  return { cats: data, catsAreLoading: isLoading };
}
