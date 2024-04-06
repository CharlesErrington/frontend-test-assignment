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
      className="h-[100%] aspect-square bg-gray-100 rounded-full grid place-items-center"
      onClick={onClick}
      data-cy={dataCyValue}
    >
      {icon}
    </button>
  );
}
