import { Dispatch, SetStateAction } from "react";

import CatsDropdown from "./CatsDropdown";
import { Slider, SliderValue } from "@nextui-org/slider";

type FilterWrapperProps = {
  limitValue: SliderValue;
  selectedBreed: {
    name: string;
    id: string;
  };
  setSelectedBreed: Dispatch<SetStateAction<{ name: string; id: string }>>;
  setLimitValue: Dispatch<SetStateAction<SliderValue>>;
};

export function FilterWrapper({
  limitValue,
  selectedBreed,
  setSelectedBreed,
  setLimitValue,
}: FilterWrapperProps) {
  return (
    <div className=" z-10 w-[100%]" data-cy="filter-wrapper">
      <div className="my-5 flex flex-col justify-center gap-5 align-middle sm:flex-row sm:justify-start">
        <CatsDropdown
          selectedBreed={selectedBreed}
          setSelectedBreed={setSelectedBreed}
        />
        <div className="flex grow justify-center sm:max-w-52">
          <Slider
            data-cy="slider"
            size="sm"
            step={5}
            label="Number of cats:"
            showSteps={true}
            maxValue={50}
            minValue={5}
            defaultValue={limitValue}
            showTooltip={true}
            onChangeEnd={setLimitValue}
            classNames={{
              base: "max-w-md",
              filler: "bg-gradient-to-r from-primary-500 to-simbase-blue-900",
              label: "text-simbase-blue-900",
              value: "text-simbase-blue-900",
              thumb: "bg-simbase-blue-900",
              step: "data-[in-range=true]:bg-simbase-blue-900",
            }}
          />
        </div>
      </div>
    </div>
  );
}
