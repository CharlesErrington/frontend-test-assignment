import { CatItem } from "../molecules/CatItem";
import { HiXMark, HiOutlineHeart, HiHeart } from "react-icons/hi2";
import { useStore } from "../../store";

type CatListProps = {
  selectedBreed: {
    name: string;
    id: string;
  };
  cats: {
    url: string;
    id: string;
    isFavourite: boolean;
    favouriteId?: number;
  }[];
  isLoading: boolean;
  onAddToFavourites: (imageId: string) => void;
};

export function CatList({
  selectedBreed,
  cats,
  isLoading,
  onAddToFavourites,
}: CatListProps) {
  const openDeleteCatsModal = useStore((state) => state.openDeleteCatsModal);
  const openRemoveFromFavouritesModal = useStore(
    (state) => state.openRemoveFromFavouritesModal
  );

  const handleAddToFavourites = (imageId: string) => {
    onAddToFavourites(imageId);
  };

  const getButtonsForCat = (cat: {
    id: string;
    isFavourite: boolean;
    favouriteId?: number;
  }) => {
    return [
      {
        onClick: () => openDeleteCatsModal(cat.id),
        icon: <HiXMark className="text-red-500 text-3xl" />,
      },
      {
        onClick: () =>
          cat.isFavourite
            ? openRemoveFromFavouritesModal(cat.id, cat.favouriteId)
            : handleAddToFavourites(cat.id),
        icon: cat.isFavourite ? (
          <HiHeart className="text-red-500 text-3xl" />
        ) : (
          <HiOutlineHeart className="text-3xl" />
        ),
      },
    ];
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {selectedBreed &&
        cats?.map((cat, index) => (
          <CatItem key={index} cat={cat} buttons={getButtonsForCat(cat)} />
        ))}
    </div>
  );
}
