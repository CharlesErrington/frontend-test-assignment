import { create } from "zustand";
import { SliderValue } from "@nextui-org/slider";
import { SelectedBreed } from "./components/molecules/CatsDropdown";

type Store = {
  isDeleteCatsModalOpen: boolean;
  isRemoveFromFavouritesModalOpen: boolean;
  selectedCatId: string | null;
  openDeleteCatsModal: (catId: string) => void;
  closeDeleteCatsModal: () => void;
  openRemoveFromFavouritesModal: (
    catId: string,
    favouriteId: number | undefined | null,
  ) => void;
  closeRemoveFromFavouritesModal: () => void;
  selectedFavouriteId: number | undefined | null;
  limitValue: SliderValue;
  setLimitValue: (value: SliderValue) => void;
  selectedBreed: SelectedBreed;
  setSelectedBreed: (value: SelectedBreed) => void;
};

export const useStore = create<Store>((set) => ({
  isDeleteCatsModalOpen: false,
  isRemoveFromFavouritesModalOpen: false,
  selectedCatId: null,
  openDeleteCatsModal: (catId: string) =>
    set({ isDeleteCatsModalOpen: true, selectedCatId: catId }),
  closeDeleteCatsModal: () =>
    set({ isDeleteCatsModalOpen: false, selectedCatId: null }),
  openRemoveFromFavouritesModal: (
    catId: string,
    favouriteId: number | undefined | null,
  ) =>
    set({
      isRemoveFromFavouritesModalOpen: true,
      selectedCatId: catId,
      selectedFavouriteId: favouriteId,
    }),
  closeRemoveFromFavouritesModal: () =>
    set({
      isRemoveFromFavouritesModalOpen: false,
      selectedCatId: null,
      selectedFavouriteId: null,
    }),
  selectedFavouriteId: null,
  limitValue: 20,
  setLimitValue: (value) => set({ limitValue: value }),
  selectedBreed: { name: "Abyssinian", id: "abys" },
  setSelectedBreed: (value) => set({ selectedBreed: value }),
}));
