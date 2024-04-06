type CircularButtonProps = {
  icon: JSX.Element;
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

export function CircularButton({ icon, onClick }: CircularButtonProps) {
  return (
    <>
      <button
        className="h-[100%] aspect-square bg-gray-100 p-4 rounded-full grid place-items-center"
        onClick={onClick}
      >
        {icon}
      </button>
    </>
  );
}
