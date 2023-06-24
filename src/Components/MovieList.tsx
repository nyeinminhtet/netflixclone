import React from "react";
import { isEmpty } from "lodash";
import MovieCard from "./MovieCard";
import { MovieInterface } from "@/types";

interface Props {
  data: MovieInterface[];
  title: string;
}

const MovieList = ({ data, title }: Props) => {
  if (isEmpty(data)) {
    return null;
  }
  return (
    <div className="px-4 md:px-10 mt-[15%] sm:mt-[10%] md:mt-5 space-y-6">
      <div>
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-2 md:mb-4">
          {title}
        </p>
        <div className=" grid grid-cols-2 md:grid-cols-4 gap-2">
          {data.map((movie, index) => (
            <MovieCard key={index} data={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
