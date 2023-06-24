import useBillBoard from "@/hooks/useBillBoard";
import React, { useCallback } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import PlayButton from "./PlayButton";
import useInfoModel from "@/hooks/useInfoModel";

const Billboard = () => {
  const { data } = useBillBoard();
  const { openModel } = useInfoModel();

  const handleOpne = useCallback(() => {
    openModel(data?.id);
  }, [openModel, data?.id]);
  return (
    <div className="relative h-[40vw] md:h-[36.25vw]">
      <video
        className="w-full h-[50.25vw] sm:h-[36.25vw] object-cover brightness-[60%]"
        muted
        loop
        autoPlay
        poster={data?.thumbnailUrl}
        src={data?.videoUrl}
      ></video>
      <div className=" absolute top-[40%] md:top-[30%] ml-4 md:ml-10">
        <p className="text-white text-sm md:text-4xl h-full w-[40%] md:w-[70%] lg:text-6xl font-bold drop-shadow-xl">
          {data?.title}
        </p>
        <p className="text-white text-[8px] md:text-lg mt-2 md:mt-6 w-[70%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
          {data?.description}
        </p>
        <div className="flex flex-row items-center mt-1 md:mt-4 gap-3">
          <PlayButton movieId={data?.id} />
          <button
            onClick={handleOpne}
            className="bg-white text-white bg-opacity-40 rounded-md py-0 md:py-2 px-1 md:px-4 w-auto text-xl lg:text-lg font-semibold flex flex-row items-center hover:bg-opacity-20 transition"
          >
            <AiOutlineInfoCircle className="mr-1 text-[13px] md:text-xl" />{" "}
            <span className=" text-[11px] md:text-xl"> More Info</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
