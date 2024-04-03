import { Favourite, Breed, Cat } from "../types/types";

export const fetchCatsByBreed = async (id: string): Promise<Cat[]> => {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_CAT_API_ENDPOINT_URL
      }/images/search?breed_ids=${id}&limit=10`,
      {
        headers: {
          "x-api-key": import.meta.env.VITE_CAT_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const cats = await response.json();
    return cats;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchBreeds = async (): Promise<Breed[]> => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_CAT_API_ENDPOINT_URL}/breeds?limit=100&page=0`,
      {
        headers: {
          "x-api-key": import.meta.env.VITE_CAT_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    const breeds = await response.json();
    return breeds;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchFavouriteCats = async (): Promise<Favourite[]> => {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_CAT_API_ENDPOINT_URL
      }/favourites?limit=20&sub_id=user-123&order=DESC`,
      {
        headers: {
          "x-api-key": import.meta.env.VITE_CAT_API_KEY,
          "content-type": "application/json",
        },
      }
    );

    const favourites = await response.json();
    return favourites;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addCatToFavourites = async (imageId: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_CAT_API_ENDPOINT_URL}/favourites`,
      {
        method: "POST",
        headers: {
          "x-api-key": import.meta.env.VITE_CAT_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image_id: imageId,
          sub_id: "user-123",
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const removeCatFromFavourites = async (favouriteId: number) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_CAT_API_ENDPOINT_URL}/favourites/${favouriteId}`,
      {
        method: "DELETE",
        headers: {
          "x-api-key": import.meta.env.VITE_CAT_API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
