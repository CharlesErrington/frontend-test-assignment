import { CatItem } from "../molecules/CatItem";
type CatListProps = {
  selectedBreed: {
    name: string;
    id: string;
  };
  cats: { url: string; id: string }[];
};

export function CatList({ selectedBreed, cats }: CatListProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {selectedBreed &&
        cats?.map((cat, index) => <CatItem key={index} cat={cat} />)}
    </div>
  );
}
