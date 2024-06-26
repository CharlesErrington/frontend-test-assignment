import { CatItem } from "../molecules/CatItem";
import { HiXMark, HiOutlineHeart, HiHeart } from "react-icons/hi2";
import { useStore } from "../../store";
import { PulseAnimation } from "../molecules/PulseAnimation";
import { SelectedBreed } from "../molecules/CatsDropdown";
import { BasicCat } from "../molecules/CatItem";

export type ExtendedCat = BasicCat & {
  isFavourite: boolean;
  favouriteId?: number;
};

type CatListProps = {
  selectedBreed: SelectedBreed;
  cats: ExtendedCat[];
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
    (state) => state.openRemoveFromFavouritesModal,
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
        icon: <HiXMark className="text-3xl text-simbase-blue-900" />,
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
            className="text-3xl text-simbase-orange-800"
          />
        ) : (
          <HiOutlineHeart
            data-cy="HiOutlineHeart"
            data-
            className="text-3xl text-simbase-orange-500"
          />
        ),
        dataCyValue: "favourite-button",
      },
    ];
  };

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
    <div
      className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
      data-cy="cat-list"
    >
      {selectedBreed &&
        cats?.map((cat, index) => (
          <CatItem key={index} cat={cat} buttons={getButtonsForCat(cat)} />
        ))}
    </div>
  );
}
