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
    <div className=" w-[100%] z-10" data-cy="filter-wrapper">
      <div className="my-5 flex flex-col sm:flex-row justify-center sm:justify-start align-middle gap-5">
        <CatsDropdown
          selectedBreed={selectedBreed}
          setSelectedBreed={setSelectedBreed}
        />
        <div className="flex justify-center sm:max-w-52 grow">
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
