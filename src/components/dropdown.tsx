import { Dispatch, SetStateAction } from "react";
import { BaseDropdown } from "./ui/BaseDropdown";
import { fetchBreeds } from "../services/api";
import { useQuery } from "@tanstack/react-query";
import { Breed } from "../types/types";

const CatsDropdown = ({
  setSelectedBreed,
  selectedBreed,
}: {
  selectedBreed: { name: string; id: string };
  setSelectedBreed: Dispatch<SetStateAction<{ name: string; id: string }>>;
}) => {
  const { data: breeds } = useQuery<Breed[]>({
    queryFn: () => fetchBreeds(),
    queryKey: ["fetchBreeds"],
  });

  const values = breeds || [];

  return (
    <BaseDropdown
      values={values}
      selectedValue={selectedBreed}
      setSelectedValue={setSelectedBreed}
    />
  );
};

export default CatsDropdown;
