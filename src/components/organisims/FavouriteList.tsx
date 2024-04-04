import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { CatItem } from "../molecules/CatItem";
import { HiHeart } from "react-icons/hi2";
import { removeCatFromFavourites } from "../../services/api";

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
  const [mappedCats, setMappedCats] = useState<Cat[]>([]);

  useEffect(() => {
    if (cats) {
      setMappedCats(cats);
    }
  }, [cats]);

  const [favoriteModalOpenCatId, setFavoriteModalOpenCatId] = useState<
    string | null
  >(null);

  const { mutate: removeFromFavourites } = useMutation({
    mutationFn: (favouriteId: number) => removeCatFromFavourites(favouriteId),
  });

  const handleRemoveFromFavourites = (favouriteId: number) => {
    removeFromFavourites(favouriteId);
    setMappedCats((prevCats) =>
      prevCats.filter((cat) => cat.favouriteId !== favouriteId)
    );
    setFavoriteModalOpenCatId(null);
  };

  const getButtonsForCat = (cat: { id: string; favouriteId: number }) => [
    {
      onClick: () => setFavoriteModalOpenCatId(cat.id),
      onClose: () => setFavoriteModalOpenCatId(null),
      isOpen: favoriteModalOpenCatId === cat.id,
      icon: <HiHeart className="text-red-500 text-3xl" />,
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
      {cats &&
        mappedCats?.map((cat, index) => (
          <CatItem key={index} cat={cat} buttons={getButtonsForCat(cat)} />
        ))}
    </div>
  );
}
