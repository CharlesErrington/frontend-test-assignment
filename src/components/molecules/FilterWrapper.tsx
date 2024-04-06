import { Dispatch, SetStateAction } from "react";

import CatsDropdown from "../dropdown";
import { Slider, SliderValue } from "@nextui-org/slider";

type FilterWrapperProps = {
  selectedBreed: {
    name: string;
    id: string;
  };
  setSelectedBreed: Dispatch<SetStateAction<{ name: string; id: string }>>;
  setLimitValue: Dispatch<SetStateAction<SliderValue>>;
};

export function FilterWrapper({
  selectedBreed,
  setSelectedBreed,
  setLimitValue,
}: FilterWrapperProps) {
  return (
    <div className=" w-72 z-10">
      <div className="my-3">
        <CatsDropdown
          selectedBreed={selectedBreed}
          setSelectedBreed={setSelectedBreed}
        />
        <Slider
          size="sm"
          step={5}
          color="foreground"
          label="Number of cats:"
          showSteps={true}
          maxValue={50}
          minValue={5}
          defaultValue={10}
          showTooltip={true}
          onChangeEnd={setLimitValue}
          className="max-w-md"
        />
      </div>
    </div>
  );
}
