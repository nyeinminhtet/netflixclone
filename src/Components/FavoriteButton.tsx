import { useCallback, useMemo } from "react";
import axios from "axios";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorites from "@/hooks/useFavorites";
import { AiOutlinePlus } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";

interface Props {
  movieId: string;
}

const FavoriteButton: React.FC<Props> = ({ movieId }) => {
  const { mutate: mutateFavorite } = useFavorites();

  const { data: currentUser, mutate } = useCurrentUser();

  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(movieId);
  }, [currentUser, movieId]);

  const toggleFavorite = useCallback(async () => {
    let response;

    if (isFavorite) {
      response = await axios.put("/api/favorite", { movieId });
    } else {
      response = await axios.post(`/api/favorite`, {
        movieId,
      });
    }
    const updateFavoriteIds = response?.data?.favoriteIds;

    mutate({
      ...currentUser,
      favoriteIds: updateFavoriteIds,
    });
    mutateFavorite();
  }, [currentUser, isFavorite, movieId, mutate, mutateFavorite]);

  const Icons = isFavorite ? FaCheck : AiOutlinePlus;

  return (
    <div
      onClick={toggleFavorite}
      className=" cursor-pointer group/item w-5 h-5 sm:w-6 sm:h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
    >
      <Icons className="text-white text-[12px] sm:text-2xl" />
    </div>
  );
};

export default FavoriteButton;
