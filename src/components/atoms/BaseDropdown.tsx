import { Combobox, Transition } from "@headlessui/react";
import { useState } from "react";
import { HiCheck, HiChevronUpDown } from "react-icons/hi2";
import { Fragment } from "react/jsx-runtime";
import { useStore } from "../../store";

type BaseDropdownValue = {
  name: string;
  id: string;
};
export const BaseDropdown = <T extends BaseDropdownValue>({
  values,
}: {
  values: T[];
}) => {
  const [searchString, setSearchString] = useState("");
  const setSelectedBreed = useStore((state) => state.setSelectedBreed);
  const selectedBreed = useStore((state) => state.selectedBreed);
  const filteredValues =
    searchString === ""
      ? values
      : values.filter((value) => {
          return value.name.toLowerCase().includes(searchString.toLowerCase());
        });

  return (
    <Combobox value={selectedBreed} onChange={setSelectedBreed}>
      <div className="relative z-10 mt-1">
        <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus:ring-transparent focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 sm:text-sm">
          <Combobox.Input
            className="w-full rounded-lg border border-transparent py-2 pl-3 pr-10 text-sm leading-5 text-simbase-blue-900 focus:border-simbase-orange-500 focus:outline-none"
            displayValue={(value: BaseDropdownValue) => value.name}
            onChange={(event) => setSearchString(event.target.value)}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <HiChevronUpDown
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setSearchString("")}
        >
          <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {filteredValues?.length === 0 && searchString !== "" ? (
              <div className="relative cursor-default select-none px-4 py-2 text-simbase-blue-900">
                Nothing found.
              </div>
            ) : (
              filteredValues?.map((value) => (
                <Combobox.Option
                  key={value.name}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active
                        ? "bg-simbase-orange-500 text-white"
                        : "text-simbase-blue-900"
                    }`
                  }
                  value={value}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {value.name}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? "text-white" : "text-simbase-orange-800"
                          }`}
                        >
                          <HiCheck className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
};
