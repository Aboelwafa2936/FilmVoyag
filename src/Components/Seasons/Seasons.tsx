import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../Services/services/services";

interface Season {
  id: number;
  poster_path: string;
  name: string;
  season_number: number;
  overview: string;
  vote_average: number;
  air_date: string;
}

interface SeasonsProps {
  seasons: Season[];
  seriesId: string;
}

export default function Seasons({ seasons, seriesId }: SeasonsProps) {
  const navigate = useNavigate();


  return (
    <>
      <div className="flex items-center flex-wrap">
        {seasons.map((season: Season) => {
          return (
            <div
              key={season.id}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4"
            >
              <div className="bg-[#1f2937] rounded-lg shadow-lg overflow-hidden relative group hover:shadow-xl transition-shadow duration-500">
                {/* Image */}
                <img
                  src={baseUrl + season.poster_path}
                  className="w-full h-[22rem] object-contain transition-transform duration-300 group-hover:scale-110"
                  alt={season.name}
                />
                {/* Overlay hover */}
                <div
                  data-id={season.season_number}
                  onClick={(e) => {
                    navigate(
                      `/seasonDetails/:${seriesId}/:${e.currentTarget.getAttribute(
                        "data-id"
                      )}`
                    );
                  }}
                  className="absolute top-0 right-0 left-0 bottom-0 bg-gradient-to-t from-[#111827] via-[#111827]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-4 flex flex-col justify-end"
                >
                  <h2 className="text-lg font-semibold text-white drop-shadow-md mb-2">
                    {season.name}
                  </h2>
                  <p
                    title={season.overview}
                    className="text-sm text-gray-300 line-clamp-3 mb-2 leading-relaxed"
                  >
                    {season.overview}
                  </p>
                  {/* Season Details */}
                  <div className="flex items-center justify-between mt-2">
                    <span className="bg-[#6028ff] text-white text-sm rounded-lg px-3 py-1 flex items-center shadow-md">
                      <FaStar className="text-yellow-400 mr-1" />{" "}
                      {season.vote_average.toFixed(1)}
                    </span>
                    <p className="text-gray-400 text-sm">
                      {season?.air_date
                        ? season.air_date.split("-")[0]
                        : "Unknown"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
