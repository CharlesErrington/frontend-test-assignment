export const fetchCatsByBreed = async (id: string) => {
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
    console.log("cats 2", cats);
    return cats;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchBreeds = async () => {
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
