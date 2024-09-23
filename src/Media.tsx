import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import HeadingSection from "./Components/HeadingSection";
import MovieCrad from "./Components/movieCard/MovieCrad";
import Pagination from "./Components/Pagination/Pagination";
import { getMedia } from "./Services/services/services";
import LoadingScreen from "./Components/LoadingScreen/LoadingScreen";

interface MediaProps {
  Url: string;
  heading: string;
  category: string;
}

export default function Media({ Url, heading, category}: MediaProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const url = Url;
  const params = {
    page: currentPage,
  };

  const { data: Media , isLoading } = useQuery({
    queryKey: ["Media", currentPage],
    queryFn: () => getMedia(url, params),
  });

  if(isLoading){
    return <LoadingScreen />
  }

  interface Movie {
    id: number;
    title: string;
    name?: string;
    poster_path: string;
    overview: string;
    vote_average: number;
    release_date?: string;
    first_air_date?: string;
  }
  return (
    <>
      <section className="py-10 bg-[#111827] text-white">
        <div className="container mx-auto">
          <HeadingSection heading={heading} />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Media?.map((movie: Movie) => {
              return (
                <>
                  <MovieCrad movie={movie} category={category} />
                </>
              );
            })}
          </div>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </section>
    </>
  );
}
