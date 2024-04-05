import { useStore } from "../../store";
import { CatItem } from "../molecules/CatItem";
import { HiHeart } from "react-icons/hi2";

type Cat = {
  url: string;
  id: string;
  favouriteId: number;
};

type CatListProps = {
  cats: Cat[] | undefined;
  isLoading: boolean;
};

export function FavouriteList({ cats, isLoading }: CatListProps) {
  const openRemoveFromFavouritesModal = useStore(
    (state) => state.openRemoveFromFavouritesModal
  );

  const getButtonsForCat = (cat: { id: string; favouriteId: number }) => [
    {
      onClick: () => openRemoveFromFavouritesModal(cat.id, cat.favouriteId),
      icon: <HiHeart className="text-red-500 text-3xl" />,
    },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="grid grid-cols-3 gap-3">
      {cats &&
        cats?.map((cat, index) => (
          <CatItem key={index} cat={cat} buttons={getButtonsForCat(cat)} />
        ))}
    </div>
  );
}
