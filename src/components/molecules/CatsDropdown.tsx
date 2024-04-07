import { BaseDropdown } from "../atoms/BaseDropdown";
import { useGetBreeds } from "../../hooks/queries/useGetBreeds";

export type SelectedBreed = {
  name: string;
  id: string;
};

const CatsDropdown = () => {
  const { breeds } = useGetBreeds();
  const values = breeds || [];

  return (
    <div data-cy="cats-dropdown">
      <BaseDropdown values={values} />
    </div>
  );
};

export default CatsDropdown;
