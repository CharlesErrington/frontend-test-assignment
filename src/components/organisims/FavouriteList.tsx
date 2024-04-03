import { CatItem } from "../molecules/CatItem";
type CatListProps = {
  cats: { url: string; id: string; isFavourite: boolean }[] | undefined;
  isLoading: boolean;
};

export function FavouriteList({ cats, isLoading }: CatListProps) {
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="grid grid-cols-3 gap-3">
      {cats && cats?.map((cat, index) => <CatItem key={index} cat={cat} />)}
    </div>
  );
}
