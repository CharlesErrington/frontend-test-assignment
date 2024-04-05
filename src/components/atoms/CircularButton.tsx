type CircularButtonProps = {
  icon: JSX.Element;
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

export function CircularButton({ icon, onClick }: CircularButtonProps) {
  return (
    <>
      <button className="bg-gray-100 p-4 rounded-full" onClick={onClick}>
        {icon}
      </button>
    </>
  );
}
