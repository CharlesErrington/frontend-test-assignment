import { CatItem } from "../molecules/CatItem";
type CatListProps = {
  selectedBreed: {
    name: string;
    id: string;
  };
  cats: { url: string; id: string }[];
  isLoading: boolean;
};

export function CatList({ selectedBreed, cats, isLoading }: CatListProps) {
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="grid grid-cols-3 gap-3">
      {selectedBreed &&
        cats?.map((cat, index) => <CatItem key={index} cat={cat} />)}
    </div>
  );
}
