import { useStore } from "../../store";
import { CatItem } from "../molecules/CatItem";
import { HiHeart } from "react-icons/hi2";
import { PulseAnimation } from "../molecules/PulseAnimation";

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
    (state) => state.openRemoveFromFavouritesModal,
  );

  const getButtonsForCat = (cat: { id: string; favouriteId: number }) => [
    {
      onClick: () => openRemoveFromFavouritesModal(cat.id, cat.favouriteId),
      icon: <HiHeart className="text-3xl text-simbase-orange-800" />,
      dataCyValue: "favourite-button",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <PulseAnimation key={index} />
        ))}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {cats &&
        cats?.map((cat, index) => (
          <CatItem key={index} cat={cat} buttons={getButtonsForCat(cat)} />
        ))}
    </div>
  );
}
