import { useState } from "react";
import { CircularButtonContainer } from "./CircularButtonContainer";
import { HiXMark, HiOutlineHeart, HiHeart } from "react-icons/hi2";

type CatItemProps = {
  cat: { id: string; url: string; isFavourite: boolean };
  onAddToFavourites?: (imageId: string) => void;
};

export function CatItem({ cat, onAddToFavourites }: CatItemProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isFavoriteModalOpen, setIsFavoriteModalOpen] = useState(false);

  const handleAddToFavourites = (imageId: string) => {
    if (onAddToFavourites) {
      onAddToFavourites(imageId);
    }
  };

  const buttons = [
    {
      onClick: () => setIsDeleteModalOpen(true),
      onClose: () => setIsDeleteModalOpen(false),
      isOpen: isDeleteModalOpen,
      icon: <HiXMark className="text-red-500 text-3xl" />,
      baseModalTitle: "Delete this cat?",
      baseModalText: "Are you sure you want to delete this cat?",
    },
    {
      onClick: () =>
        cat.isFavourite
          ? setIsFavoriteModalOpen(true)
          : handleAddToFavourites(cat.id),
      onClose: () => setIsFavoriteModalOpen(false),
      isOpen: isFavoriteModalOpen,
      icon: cat.isFavourite ? (
        <HiHeart className="text-3xl" />
      ) : (
        <HiOutlineHeart className="text-3xl" />
      ),
      baseModalTitle: "Remove from favorites?",
      baseModalText: "Are you sure you want to remove this cat from favorites?",
    },
  ];

  return (
    <div key={cat.id}>
      <div
        key={cat.id}
        className="relative border rounded-lg overflow-hidden shadow-md flex justify-center"
      >
        <img src={cat.url} className="object-cover aspect-square " />
        <CircularButtonContainer buttons={buttons} />
      </div>
    </div>
  );
}
