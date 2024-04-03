import { BaseModal } from "../ui/BaseModal";

type CircularButtonProps = {
  icon: JSX.Element;
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  onClose: () => void;
  isOpen: boolean;
  baseModalTitle?: string;
  baseModalText?: string;
  modalButtonText?: string;
  modalButtonAction?: () => void;
};

export function CircularButton({
  icon,
  onClick,
  onClose,
  isOpen,
  baseModalTitle,
  baseModalText,
  modalButtonText,
  modalButtonAction,
}: CircularButtonProps) {
  return (
    <>
      <button className="bg-gray-100 p-4 rounded-full" onClick={onClick}>
        {icon}
      </button>
      {baseModalTitle && baseModalText && (
        <BaseModal
          baseModalTitle={baseModalTitle}
          baseModalText={baseModalText}
          isOpen={isOpen}
          onClose={onClose}
          modalButtonText={modalButtonText}
          modalButtonAction={modalButtonAction}
        />
      )}
    </>
  );
}
