import { Cat, Favourite } from "../types/types";

export const catMapper = (cats: Cat[], favourites: Favourite[]) => {
  const result = cats.map((cat) => {
    const isFavourite = favourites.some(
      (favourite) => favourite.image_id === cat.id,
    );
    const favouriteId = favourites.find(
      (favourite) => favourite.image_id === cat.id,
    )?.id;
    return {
      url: cat.url,
      id: cat.id,
      isFavourite,
      favouriteId: favouriteId,
    };
  });
  return result;
};

export const favouriteMapper = (favourites: Favourite[]) => {
  return favourites?.map((favourite) => ({
    url: favourite.image.url,
    id: favourite.image_id,
    favouriteId: favourite.id,
  }));
};
