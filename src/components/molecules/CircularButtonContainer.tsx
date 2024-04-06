import { CircularButton } from "../atoms/CircularButton";

type CircularButtonContainerProps = {
  buttons: {
    icon: JSX.Element;
    onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  }[];
};

export function CircularButtonContainer({
  buttons,
}: CircularButtonContainerProps) {
  return (
    <div className="absolute bottom-2 w-auto h-[20%]  bg-white/50 rounded-full ">
      <div className="h-[100%] flex gap-2 justify-between">
        {buttons.map((button, index) => (
          <CircularButton
            key={index}
            onClick={button.onClick}
            icon={button.icon}
          />
        ))}
      </div>
    </div>
  );
}
