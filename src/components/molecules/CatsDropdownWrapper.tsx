import { Dispatch, SetStateAction } from "react";

import CatsDropdown from "../dropdown";

type CatsDropdownWrapperProps = {
  selectedBreed: {
    name: string;
    id: string;
  };
  setSelectedBreed: Dispatch<SetStateAction<{ name: string; id: string }>>;
};

export function CatsDropdownWrapper({
  selectedBreed,
  setSelectedBreed,
}: CatsDropdownWrapperProps) {
  return (
    <div className=" w-72 z-10">
      <div className="my-3">
        <CatsDropdown
          selectedBreed={selectedBreed}
          setSelectedBreed={setSelectedBreed}
        />
      </div>
    </div>
  );
}
