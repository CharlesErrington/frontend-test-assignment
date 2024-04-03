import { CircularButtonContainer } from "./CircularButtonContainer";

type CatItemProps = {
  cat: { id: string; url: string; isFavourite: boolean };
  buttons: {
    icon: JSX.Element;
    onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
    onClose: () => void;
    isOpen: boolean;
    baseModalTitle?: string;
    baseModalText?: string;
    modalButtonText?: string;
    modalButtonAction?: () => void;
  }[];
};

export function CatItem({ cat, buttons }: CatItemProps) {
  return (
    <div key={cat.id}>
      <div
        key={cat.id}
        className="relative border rounded-lg overflow-hidden shadow-md flex justify-center"
      >
        <img src={cat.url} className="object-cover aspect-square " />
        <CircularButtonContainer buttons={buttons} />
      </div>
    </div>
  );
}
