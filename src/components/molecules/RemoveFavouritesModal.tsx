import { BaseModal } from "../atoms/BaseModal";
import { useStore } from "../../store";

type RemoveFavouritesModalProps = {
  removeFavourite: (id: string, favouriteId?: number | null) => void;
};

export const RemoveFavouritesModal = ({
  removeFavourite,
}: RemoveFavouritesModalProps) => {
  const isOpen = useStore((state) => state.isRemoveFromFavouritesModalOpen);
  const close = useStore((state) => state.closeRemoveFromFavouritesModal);
  const catId = useStore((state) => state.selectedCatId);
  const favouriteId = useStore((state) => state.selectedFavouriteId);

  const handleClose = () => {
    close();
  };

  const handleRemoveFavourite = () => {
    if (!catId) return;
    removeFavourite(catId, favouriteId);
    handleClose();
  };

  return (
    <BaseModal
      data-cy="remove-favourites-modal"
      baseModalTitle="💔 Remove from favorites?"
      baseModalText="Are you sure you want to remove this cat from favorites?"
      isOpen={isOpen}
      onClose={handleClose}
      modalButtonText="Remove"
      modalButtonAction={handleRemoveFavourite}
    />
  );
};
