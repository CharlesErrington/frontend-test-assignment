import { CircularButtonContainer } from "./CircularButtonContainer";

type CatItemProps = {
  cat: { id: string; url: string };
  buttons: {
    icon: JSX.Element;
    onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
    dataCyValue?: string;
  }[];
};

export function CatItem({ cat, buttons }: CatItemProps) {
  return (
    <div key={cat.id} data-cy="cat-item">
      <div
        key={cat.id}
        className="relative flex justify-center overflow-hidden rounded-lg border shadow-md"
      >
        <img src={cat.url} className="aspect-square object-cover" />
        <CircularButtonContainer buttons={buttons} />
      </div>
    </div>
  );
}
