import { Dispatch, SetStateAction } from "react";
import { BaseDropdown } from "./ui/BaseDropdown";
import { fetchBreeds } from "../services/api";
import { useQuery } from "@tanstack/react-query";

const CatsDropdown = ({
  setSelectedBreed,
  selectedBreed,
}: {
  selectedBreed: { name: string; id: string };
  setSelectedBreed: Dispatch<SetStateAction<{ name: string; id: string }>>;
}) => {
  const { data: breeds } = useQuery({
    queryFn: () => fetchBreeds(),
    queryKey: ["fetchBreeds"],
  });

  return (
    <BaseDropdown
      values={breeds}
      selectedValue={selectedBreed}
      setSelectedValue={setSelectedBreed}
    />
  );
};

export default CatsDropdown;
