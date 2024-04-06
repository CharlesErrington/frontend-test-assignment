import { Dispatch, SetStateAction } from "react";
import { BaseDropdown } from "../atoms/BaseDropdown";
import { useGetBreeds } from "../../hooks/queries/useGetBreeds";

const CatsDropdown = ({
  setSelectedBreed,
  selectedBreed,
}: {
  selectedBreed: { name: string; id: string };
  setSelectedBreed: Dispatch<SetStateAction<{ name: string; id: string }>>;
}) => {
  const { breeds } = useGetBreeds();

  const values = breeds || [];

  return (
    <div data-cy="cats-dropdown">
      <BaseDropdown
        values={values}
        selectedValue={selectedBreed}
        setSelectedValue={setSelectedBreed}
      />
    </div>
  );
};

export default CatsDropdown;
