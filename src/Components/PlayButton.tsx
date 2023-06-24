import React from "react";
import { useRouter } from "next/router";
import { BsFillPlayFill } from "react-icons/bs";

interface PlayButtonProps {
  movieId: string;
}

const PlayButton: React.FC<PlayButtonProps> = ({ movieId }) => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push(`/watch/${movieId}`)}
      className="bg-white rounded-md py-0 md:py-2 px-1 md:px-3 w-auto text-sm md:text-xl lg:text-lg font-semibold flex items-center hover:bg-neutral-300 transition"
    >
      <BsFillPlayFill className="mr-0 md:mr-2 text-[15px] sm:text-xl" />
      <span className=" text-[.6rem] md:text-xl">Play</span>
    </button>
  );
};

export default PlayButton;
