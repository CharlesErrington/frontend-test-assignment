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
        <Dialog.Panel className="mx-auto w-96 max-w-sm rounded-lg bg-white p-4">
          <div className="flex flex-col gap-4">
            <div>
              <Dialog.Title className="text-lg font-semibold text-simbase-blue-900">
                {baseModalTitle}
              </Dialog.Title>

              <Dialog.Description className="mt-2 text-sm text-gray-500">
                {baseModalText}
              </Dialog.Description>
            </div>

            <div className="flex justify-end">
              <button
                className="border-input inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md border bg-background px-4 py-2 text-sm font-medium text-simbase-blue-900 shadow-sm transition-colors duration-150 ease-in-out hover:bg-gray-100 focus:outline-none sm:mt-0"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="ml-2 inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md bg-simbase-blue-900 px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors duration-150 ease-in-out hover:bg-simbase-blue-800 sm:space-x-2"
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
