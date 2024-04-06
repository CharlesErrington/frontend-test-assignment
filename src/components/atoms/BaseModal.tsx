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
      <div className="fixed inset-0 bg-black/50 " aria-hidden="true" />

      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <Dialog.Panel className="w-96 p-4 mx-auto max-w-sm rounded-lg bg-white">
          <div className="flex flex-col gap-4">
            <div>
              <Dialog.Title className="font-semibold text-lg">
                {baseModalTitle}
              </Dialog.Title>

              <Dialog.Description className="text-gray-500 text-sm mt-2">
                {baseModalText}
              </Dialog.Description>
            </div>

            <div className="flex justify-end">
              <button
                className="inline-flex items-center justify-center h-9 px-4 py-2 text-sm font-medium transition-colors duration-150 ease-in-out bg-background border border-input rounded-md shadow-sm sm:mt-0 whitespace-nowrap hover:bg-gray-100 focus:outline-none"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="inline-flex items-center justify-center ml-2 h-9 px-4 py-2 text-sm font-medium text-primary-foreground transition-colors duration-150 ease-in-out bg-black rounded-md shadow sm:space-x-2 whitespace-nowrap hover:bg-gray-800"
                onClick={modalButtonAction}
              >
                {modalButtonText}
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
