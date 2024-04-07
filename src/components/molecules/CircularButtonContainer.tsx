import { CircularButton } from "../atoms/CircularButton";

type CircularButtonContainerProps = {
  buttons: {
    icon: JSX.Element;
    onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
    dataCyValue?: string;
  }[];
};

export function CircularButtonContainer({
  buttons,
}: CircularButtonContainerProps) {
  return (
    <div className="absolute bottom-2 h-[20%] max-h-20 w-auto  rounded-full bg-white/50 ">
      <div className="flex h-[100%] justify-between gap-4 p-2">
        {buttons.map((button, index) => (
          <CircularButton
            key={index}
            onClick={button.onClick}
            icon={button.icon}
            dataCyValue={button.dataCyValue}
          />
        ))}
      </div>
    </div>
  );
}
