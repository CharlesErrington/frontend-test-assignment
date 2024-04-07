import { Dispatch, SetStateAction } from "react";
import { BaseDropdown } from "../atoms/BaseDropdown";
import { useGetBreeds } from "../../hooks/queries/useGetBreeds";

export type SelectedBreed = {
  name: string;
  id: string;
};

const CatsDropdown = ({
  setSelectedBreed,
  selectedBreed,
}: {
  selectedBreed: SelectedBreed;
  setSelectedBreed: Dispatch<SetStateAction<SelectedBreed>>;
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
