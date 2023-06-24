import useMovie from "@/hooks/useMovie";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

const Watch = () => {
  const router = useRouter();
  const { movieId } = router.query;
  const { data } = useMovie(movieId as string);

  return (
    <div className=" h-screen w-screen bg-black">
      <nav className=" fixed w-full p-3 z-10 flex items-center gap-8 bg-black bg-opacity-70">
        <AiOutlineArrowLeft
          onClick={() => router.back()}
          size={35}
          className="text-white cursor-pointer"
        />
        <p className=" text-white text-1xl md:text-3xl font-bold">
          <span className=" font-light">Watching:</span>
          {data?.title}
        </p>
      </nav>
      <video
        src={data?.videoUrl}
        className="w-full h-full"
        autoPlay
        controls
      ></video>
    </div>
  );
};

export default Watch;
