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
        icon: <HiXMark className="text-simbase-blue-900 text-3xl" />,
        dataCyValue: "delete-button",
      },
      {
        onClick: () =>
          cat.isFavourite
            ? openRemoveFromFavouritesModal(cat.id, cat.favouriteId)
            : handleAddToFavourites(cat.id),
        icon: cat.isFavourite ? (
          <HiHeart
            data-cy="HiHeart"
            className="text-simbase-orange-800 text-3xl"
          />
        ) : (
          <HiOutlineHeart
            data-cy="HiOutlineHeart"
            data-
            className="text-simbase-orange-500 text-3xl"
          />
        ),
        dataCyValue: "favourite-button",
      },
    ];
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
      data-cy="cat-list"
    >
      {selectedBreed &&
        cats?.map((cat, index) => (
          <CatItem key={index} cat={cat} buttons={getButtonsForCat(cat)} />
        ))}
    </div>
  );
}
