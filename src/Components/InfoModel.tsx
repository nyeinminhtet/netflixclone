import useInfoModel from "@/hooks/useInfoModel";
import useMovie from "@/hooks/useMovie";
import { useCallback, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import PlayButton from "./PlayButton";
import FavoriteButton from "./FavoriteButton";

interface Props {
  visible?: boolean;
  onClose: any;
}
const InfoModel: React.FC<Props> = ({ visible, onClose }) => {
  const [isVisible, setIsVisible] = useState(!!visible);

  const { movieId } = useInfoModel();
  const { data = {} } = useMovie(movieId as string);

  useEffect(() => {
    setIsVisible(!!visible);
  }, [visible]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  if (!visible) return null;

  return (
    <div className=" z-50 transition duration-300 bg-black bg-opacity-80 felx justify-center items-center overflow-hidden overflow-y-auto fixed inset-0">
      <div className=" w-[70%] sm:w-auto relative mx-auto my-20 max-w-2xl rounded-md overflow-hidden">
        <div
          className={`${
            isVisible ? "scale-100" : "scale-0"
          } transition duration-300 relative flex-auto bg-zinc-900 drop-shadow-md`}
        >
          <div className=" relative h-76 sm:h-96">
            <video
              autoPlay
              loop
              muted
              src={data?.videoUrl}
              poster={data?.thumbnailUrl}
              className=" w-full brightness-[60%] object-cover h-full"
            ></video>
            <div
              onClick={handleClose}
              className=" cursor-pointer absolute top-3 right-3 h-10 w-10 rounded-full bg-black bg-opacity-70 flex items-center justify-center"
            >
              <AiOutlineClose size={20} className="text-white" />
            </div>
            <div className=" absolute bottom-[10%] left-10">
              <p className=" text-white text-1xl md:text-3xl h-full lg:text-4xl font-bold mb-4">
                {data?.title}
              </p>
              <div className="flex gap-4 items-center">
                <PlayButton movieId={data?.id} />
                <FavoriteButton movieId={data?.id} />
              </div>
            </div>
          </div>
          <div className=" px-8 py-4">
            <p className=" text-green-400 font-semibold text-lg">New</p>
            <p className=" text-white text-lg">{data?.duration} </p>
            <p className=" text-white text-lg">{data?.genre} </p>
            <p className=" text-gray-500 text-md">{data?.description} </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModel;
