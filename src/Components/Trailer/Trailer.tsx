import { useQuery } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useMemo } from "react";
import { IoClose } from "react-icons/io5";
import { fetchClips } from "../../Services/services/services";


interface Clip {
  key: string;
  name: string;
  type: string;
}

interface TrailerProps {
  setIsTrailerOpen: Dispatch<SetStateAction<boolean>>;
  cleanId: string | number;
  cleanCategory: string;
  setAutoplay: Dispatch<SetStateAction<boolean>>;
}

export default function Trailer({ setIsTrailerOpen, cleanId, cleanCategory, setAutoplay }: TrailerProps) {
  const { data: Clips } = useQuery<Clip[]>({
    queryKey: ["Clips", cleanId, cleanCategory],
    queryFn: () => fetchClips({ cleanCategory, cleanId: String(cleanId) }),
  });

  const videos = useMemo(
    () => Clips?.filter((clip) => clip.type === "Trailer") || [],
    [Clips]
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
      <IoClose
        className="text-3xl absolute md:top-24 lg:top-5 md:right-[12rem] lg:left-3/4 cursor-pointer text-white"
        onClick={() => {
          setIsTrailerOpen(false);
          setAutoplay((prev) => !prev); // Toggle based on the previous state
        }}
      />
      <div className="bg-[#111827] p-5 text-white text-center rounded-md z-50 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full md:w-1/2">
        {videos.length > 0 && (
          <iframe
            width="100%"
            height="500"
            src={`https://www.youtube.com/embed/${videos[0].key}`}
            title={videos[0].name}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg"
          />
        )}
      </div>
    </div>
  );
}

