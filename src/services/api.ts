import { Favourite, Breed, Cat } from "../types/types";

export const fetchCatsByBreed = async (
  id: string,
  limit: number,
): Promise<Cat[]> => {
  try {
    const url = new URL(
      "v1/images/search/",
      import.meta.env.VITE_CAT_API_ENDPOINT_URL,
    );
    url.searchParams.append("breed_ids", id);
    url.searchParams.append("limit", limit.toString());
    url.searchParams.append("include_breeds", "false");
    const response = await fetch(url, {
      headers: {
        "x-api-key": import.meta.env.VITE_CAT_API_KEY,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(
        `HTTP error for fetchCatsByBreed! status: ${response.status}`,
      );
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
    const url = new URL("v1/breeds", import.meta.env.VITE_CAT_API_ENDPOINT_URL);
    const response = await fetch(url, {
      headers: {
        "x-api-key": import.meta.env.VITE_CAT_API_KEY,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error for fetchBreeds! status: ${response.status}`);
    }

    const breeds = await response.json();
    return breeds;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchFavouriteCats = async (): Promise<Favourite[]> => {
  try {
    const url = new URL(
      "v1/favourites",
      import.meta.env.VITE_CAT_API_ENDPOINT_URL,
    );
    url.searchParams.append("order", "DESC");

    const response = await fetch(url, {
      headers: {
        "x-api-key": import.meta.env.VITE_CAT_API_KEY,
        "content-type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `HTTP error for fetchFavouriteCats! status: ${response.status}`,
      );
    }

    const favourites = await response.json();
    return favourites;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addCatToFavourites = async (imageId: string) => {
  try {
    const url = new URL(
      "v1/favourites",
      import.meta.env.VITE_CAT_API_ENDPOINT_URL,
    );
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "x-api-key": import.meta.env.VITE_CAT_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image_id: imageId,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `HTTP error for addCatToFavourites! status: ${response.status}`,
      );
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const removeCatFromFavourites = async (favouriteId: number) => {
  try {
    const url = new URL(
      "v1/favourites/" + favouriteId.toString(),
      import.meta.env.VITE_CAT_API_ENDPOINT_URL,
    );

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "x-api-key": import.meta.env.VITE_CAT_API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(
        `HTTP error for removeCatFromFavourites! status: ${response.status}`,
      );
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
