import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { baseUrl } from "../../Services/services/services";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

export default function SeasonDetails() {
  const { seasonId, seriesId } = useParams();
  const [isOpen , setIsOpen] = useState(false);

  const cleanSeasonId = seasonId ? seasonId.replace(/^:/, "") : "";
  const cleanSeriesId = seriesId ? seriesId.replace(/^:/, "") : "";


  async function getSessionDetails(
    cleanSeriesId: string,
    cleanSeasonId: string
  ) {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/${cleanSeriesId}/season/${cleanSeasonId}?api_key=ae525d27a8fab4d0a9a4155dc3e4d7ec`
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  const {
    data: details,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["details", cleanSeriesId, cleanSeasonId],
    queryFn: () => getSessionDetails(cleanSeriesId, cleanSeasonId),
  });

  interface Episode{
    air_date: string,
    episode_number: number,
    id: number,
    name: string,
    overview: string,
    still_path: string,
    vote_average: number,
    runtime: number
  }




  if (isLoading) return <LoadingScreen />;
  if (error) return <div>..error</div>;

  return (
    <>
      <main className="bg-[#111827]">
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-[80%] mx-auto p-4 overflow-hidden">
            <div className="bg-[#1f2937] rounded-md p-4 text-white">
              <div className="flex">
                <div className="lg:w-2/5">
                  <img
                    className="w-full h-auto max-h-[30rem] object-contain rounded-md shadow-md"
                    src={baseUrl + details.poster_path}
                    alt={details.name}
                  />
                </div>
                <div className="lg:w-3/5 mt-4 lg:mt-0">
                  <h2 className="text-3xl font-semibold">{details.name}</h2>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="bg-[#6028ff] text-white text-sm rounded-md px-2 py-1 flex items-center">
                      <FaStar className="text-yellow-400 me-1" />{" "}
                      {details.vote_average.toFixed(1)}
                    </span>
                    <span className="text-sm">
                      {details.air_date.split("-")[0]}
                    </span>
                    {/* <span className="flex gap-2">
                      {details.genres.map((genre) => (
                        <span className="text-sm" key={genre.id}>
                          {genre.name}
                        </span>
                      ))}
                    </span> */}
                  </div>
                  <p className="mt-4">{details.overview}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-5">
                {details.episodes.map((episode: Episode) => {
                  return (
                    <div
                      key={episode.id}
                      className="bg-[#111827] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                      {/* Episode Image */}
                      <img
                        src={baseUrl + episode.still_path}
                        alt={episode.name}
                        className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                      />

                      {/* Episode Content */}
                      <div className="p-4 flex flex-col justify-between">
                        <h3 className="text-lg font-semibold text-white mb-2">
                          {episode.name}
                        </h3>

                        <p className="text-gray-400 text-sm line-clamp-2 mb-3">
                          {episode.overview}
                        </p>

                        <div className="flex items-center justify-between mt-auto">
                          {/* Rating Badge */}
                          <span className="bg-[#6028ff] text-white text-xs rounded-md px-2 py-1 flex items-center shadow-sm">
                            <FaStar className="text-yellow-400 mr-1" />{" "}
                            {episode.vote_average.toFixed(1)}
                          </span>

                          {/* Favorite Icon */}
                          <CiStar
                            className="text-2xl cursor-pointer text-yellow-500 transition-colors duration-300 hover:text-yellow-400"
                            onClick={() => {
                              setIsOpen(!isOpen);
                            }}
                          />

                          {/* Episode Runtime */}
                          <p className="text-white text-xs">
                            {episode.runtime} min
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
