type CircularButtonProps = {
  icon: JSX.Element;
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  dataCyValue?: string;
};

export function CircularButton({
  icon,
  onClick,
  dataCyValue,
}: CircularButtonProps) {
  return (
    <button
      className="grid aspect-square h-[100%] place-items-center rounded-full bg-gray-100"
      onClick={onClick}
      data-cy={dataCyValue}
    >
      {icon}
    </button>
  );
}
