import Billboard from "@/Components/Billboard";
import InfoModel from "@/Components/InfoModel";
import MovieList from "@/Components/MovieList";
import Navbar from "@/Components/Navbar";
import useFavorites from "@/hooks/useFavorites";
import useInfoModel from "@/hooks/useInfoModel";
import useMovieList from "@/hooks/useMovieList";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  return { props: {} };
}

export default function Home() {
  const { data: movies = [] } = useMovieList();
  const { data: favorites } = useFavorites();
  const { isOpen, closeModel } = useInfoModel();

  return (
    <main>
      <InfoModel visible={isOpen} onClose={closeModel} />
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Tredening Now" data={movies} />
        <MovieList title="My List" data={favorites} />
      </div>
    </main>
  );
}
