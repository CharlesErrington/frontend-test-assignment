import { useQuery } from "@tanstack/react-query";
import { fetchBreeds } from "../services/api";
import { Breed } from "../types/types";

export function useGetBreeds() {
  const { data } = useQuery<Breed[]>({
    queryFn: () => fetchBreeds(),
    queryKey: ["fetchBreeds"],
  });

  return { breeds: data };
}
