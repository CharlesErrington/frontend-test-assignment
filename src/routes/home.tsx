import { useState } from "react";
import { CatsDropdownWrapper } from "../components/molecules/CatsDropdownWrapper";
import { CatList } from "../components/organisims/CatList";
import { useQuery } from "@tanstack/react-query";
import { fetchCatsByBreed } from "../services/api";

const Home = () => {
  const [selectedBreed, setSelectedBreed] = useState<{
    name: string;
    id: string;
  }>({ name: "Abyssinian", id: "abys" });

  const { data: cats, isLoading } = useQuery({
    queryFn: () => fetchCatsByBreed(selectedBreed.id),
    queryKey: ["fetchCatsByBreed", selectedBreed.id],
  });

  return (
    <main className="container mx-auto">
      <CatsDropdownWrapper
        selectedBreed={selectedBreed}
        setSelectedBreed={setSelectedBreed}
      />
      <CatList
        selectedBreed={selectedBreed}
        cats={cats}
        isLoading={isLoading}
      />
    </main>
  );
};

export default Home;
