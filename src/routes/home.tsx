import { useEffect, useState } from "react";
import { CatsDropdownWrapper } from "../components/molecules/CatsDropdownWrapper";
import { CatList } from "../components/organisims/CatList";

const Home = () => {
  const [selectedBreed, setSelectedBreed] = useState<{
    name: string;
    id: string;
  }>({ name: "Abyssinian", id: "abys" });
  const [cats, setCats] = useState<{ url: string; id: string }[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `https://api.thecatapi.com/v1/images/search?breed_ids=${selectedBreed?.id}&limit=10`,
        {
          headers: {
            "x-api-key": import.meta.env.VITE_CAT_API_KEY,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setCats(data);
    })();
  }, [selectedBreed]);

  return (
    <main className="container mx-auto">
      <CatsDropdownWrapper
        selectedBreed={selectedBreed}
        setSelectedBreed={setSelectedBreed}
      />
      <CatList selectedBreed={selectedBreed} cats={cats} />
    </main>
  );
};

export default Home;
