import React from "react";
import { BsFillPlayFill } from "react-icons/bs";
import FavoriteButton from "./FavoriteButton";
import { useRouter } from "next/router";
import { BiChevronDown } from "react-icons/bi";
import useInfoModel from "@/hooks/useInfoModel";

interface Props {
  data: Record<string, any>;
}

const MovieCard = ({ data }: Props) => {
  const router = useRouter();
  const { openModel } = useInfoModel();
  return (
    <div className="group bg-zinc-900 col-span relative h-[20vw] sm:h-[12vw]">
      <img
        src={data.thumbnailUrl}
        alt="Thumbnail"
        className="cursor-pointer object-cover transition duration shadwo-xl rounded-md group-hover:opacity-90 sm:group-hover:opacity-0 delay-300 w-full h-[20vw] sm:h-[12vw]"
      />
      <div
        className="absolute top-0 transition duration-200 z-10 delay-300 w-full scale-0 group-hover:scale-110 group-hover:-translate-y-[6vw]
         group-hover:translate-x-[2vw] group-hover:opactiy-100"
      >
        <img
          src={data.thumbnailUrl}
          className=" cursor-pointer object-cover transition duration shadow-xl rounded-t-md w-full h-[20vw] sm:h-[12vw]"
        />
        <div className="z-10 bg-zinc-800 p-2 lg:p-3 absolute w-full transition shadow-md rounded-b-md">
          <div className="flex flex-row items-center gap-3">
            <div
              className=" cursor-pointer w-5 h-5 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300"
              onClick={() => {
                router.push(`/watch/${data?.id}`);
              }}
            >
              <BsFillPlayFill className=" text-[15px] sm:text-2xl" />
            </div>
            <FavoriteButton movieId={data?.id} />
            <div
              onClick={() => openModel(data?.id)}
              className=" cursor-pointer ml-auto group/item w-5 h-5 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
            >
              <BiChevronDown className=" text-white group-hover/item:text-nutral-300  text-[15px] sm:text-2xl" />
            </div>
          </div>
          <p className=" text-green-400 font-semibold mt-3">
            New <span className="text-white">2023</span>
          </p>
          <div className="flex flex-row items-center mt-3 gap-2">
            <p className=" text-white text-[10px] lg:text-sm">
              {data.duration}
            </p>
          </div>
          <div className="flex flex-row items-center mt-3 gap-2">
            <p className=" text-white text-[10px] lg:text-sm">{data.genre}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
