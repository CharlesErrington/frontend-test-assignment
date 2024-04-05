import { BaseModal } from "../atoms/BaseModal";
import { useStore } from "../../store";

type DeleteCatsModalProps = {
  deleteCat: (id: string) => void;
};
export const DeleteCatsModal = ({ deleteCat }: DeleteCatsModalProps) => {
  const isOpen = useStore((state) => state.isDeleteCatsModalOpen);
  const close = useStore((state) => state.closeDeleteCatsModal);
  const catId = useStore((state) => state.selectedCatId);

  const handleClose = () => {
    close();
  };

  const handleDeletCat = () => {
    if (!catId) return;
    deleteCat(catId);
    handleClose();
  };
  return (
    <BaseModal
      baseModalTitle="Delete this cat?"
      baseModalText="Are you sure you want to delete this cat? This cannot be undone."
      isOpen={isOpen}
      onClose={handleClose}
      modalButtonText="Delete"
      modalButtonAction={handleDeletCat}
    />
  );
};
