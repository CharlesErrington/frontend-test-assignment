import { create } from "zustand";

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
}));
