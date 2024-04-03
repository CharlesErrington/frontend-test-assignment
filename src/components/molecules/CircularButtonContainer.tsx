import { CircularButton } from "../atoms/CircularButton";

type CircularButtonContainerProps = {
  buttons: {
    icon: JSX.Element;
    onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
    onClose: () => void;
    isOpen: boolean;
    baseModalTitle?: string;
    baseModalText?: string;
  }[];
};

export function CircularButtonContainer({
  buttons,
}: CircularButtonContainerProps) {
  return (
    <div className="absolute bottom-2 w-auto p-2 bg-white/50 rounded-full ">
      <div className="flex gap-2 ">
        {buttons.map((button, index) => (
          <CircularButton
            key={index}
            onClick={button.onClick}
            icon={button.icon}
            baseModalTitle={button.baseModalTitle}
            baseModalText={button.baseModalText}
            isOpen={button.isOpen}
            onClose={button.onClose}
          />
        ))}
      </div>
    </div>
  );
}
