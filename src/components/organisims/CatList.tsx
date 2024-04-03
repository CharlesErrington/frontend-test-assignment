import { useState } from "react";
import { CatItem } from "../molecules/CatItem";
import { HiXMark, HiOutlineHeart, HiHeart } from "react-icons/hi2";

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
  onRemoveFromFavourites: (favouriteId: number) => void;
};

export function CatList({
  selectedBreed,
  cats,
  isLoading,
  onAddToFavourites,
  onRemoveFromFavourites,
}: CatListProps) {
  const [deleteModalOpenCatId, setDeleteModalOpenCatId] = useState<
    string | null
  >(null);
  const [favoriteModalOpenCatId, setFavoriteModalOpenCatId] = useState<
    string | null
  >(null);

  const handleAddToFavourites = (imageId: string) => {
    onAddToFavourites(imageId);
  };

  const handleRemoveFromFavourites = (favouriteId?: number) => {
    if (favouriteId) {
      onRemoveFromFavourites(favouriteId);
    }
  };

  const getButtonsForCat = (cat: {
    id: string;
    isFavourite: boolean;
    favouriteId?: number;
  }) => [
    {
      onClick: () => setDeleteModalOpenCatId(cat.id),
      onClose: () => setDeleteModalOpenCatId(null),
      isOpen: deleteModalOpenCatId === cat.id,
      icon: <HiXMark className="text-red-500 text-3xl" />,
      baseModalTitle: "Delete this cat?",
      baseModalText: "Are you sure you want to delete this cat?",
      modalButtonText: "Remove",
      modalButtonAction: () => console.log("Delete"),
    },
    {
      onClick: () =>
        cat.isFavourite
          ? setFavoriteModalOpenCatId(cat.id)
          : handleAddToFavourites(cat.id),
      onClose: () => setFavoriteModalOpenCatId(null),
      isOpen: favoriteModalOpenCatId === cat.id,
      icon: cat.isFavourite ? (
        <HiHeart className="text-red-500 text-3xl" />
      ) : (
        <HiOutlineHeart className="text-3xl" />
      ),
      baseModalTitle: "Remove from favorites?",
      baseModalText: "Are you sure you want to remove this cat from favorites?",
      modalButtonText: "Remove",
      modalButtonAction: () => handleRemoveFromFavourites(cat.favouriteId),
    },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="grid grid-cols-3 gap-3">
      {selectedBreed &&
        cats?.map((cat, index) => (
          <CatItem key={index} cat={cat} buttons={getButtonsForCat(cat)} />
        ))}
    </div>
  );
}
