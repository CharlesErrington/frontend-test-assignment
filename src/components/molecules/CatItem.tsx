import { CircularButtonContainer } from "./CircularButtonContainer";
import { HiXMark, HiOutlineHeart } from "react-icons/hi2";

type CatItemProps = {
  cat: { id: string; url: string };
};

export function CatItem({ cat }: CatItemProps) {
  const buttons = [
    {
      onClick: () =>
        console.log("Open confirmation modal -> remove from local state"),
      icon: <HiXMark className="text-red-500 text-3xl" />,
    },
    {
      onClick: () => "Add/Remove from favorites",
      icon: <HiOutlineHeart className="text-3xl" />,
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
