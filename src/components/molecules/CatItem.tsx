import { CircularButtonContainer } from "./CircularButtonContainer";
import { CircularButtonProps } from "../atoms/CircularButton";

export type BasicCat = {
  id: string;
  url: string;
};

type CatItemProps = {
  cat: BasicCat;
  buttons: CircularButtonProps[];
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
