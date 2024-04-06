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
    <div className="absolute bottom-2 w-auto h-[20%] max-h-20  bg-white/50 rounded-full ">
      <div className="h-[100%] p-2 flex gap-4 justify-between">
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
