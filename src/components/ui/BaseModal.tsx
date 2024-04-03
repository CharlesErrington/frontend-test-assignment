import { Dialog } from "@headlessui/react";

type BaseModalProps = {
  baseModalTitle: string;
  baseModalText: string;
  isOpen: boolean;
  onClose: () => void;
  modalButtonText?: string;
  modalButtonAction?: () => void;
};
export const BaseModal = ({
  baseModalTitle,
  baseModalText,
  isOpen,
  onClose,
  modalButtonText,
  modalButtonAction,
}: BaseModalProps): JSX.Element => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50 bg-red-500"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-sm rounded bg-white">
          <Dialog.Title>{baseModalTitle}</Dialog.Title>

          <Dialog.Description>{baseModalText}</Dialog.Description>
          <button onClick={modalButtonAction}>{modalButtonText}</button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
