import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {
  baseUrl,
  getCredits,
  getPersonDetails,
} from "../../Services/services/services";
import ImgSlider from "../imgSlider/ImgSlider";

export default function PersonDetails() {
  const { peopleId } = useParams();

  const { data: details } = useQuery({
    queryKey: ["details", peopleId],
    queryFn: () => getPersonDetails({ peopleId }),
  });

  const { data: credits } = useQuery({
    queryKey: ["credits", peopleId],
    queryFn: () => getCredits({ peopleId }),
  });

  interface Credit {
    poster_path: string;
    title?: string;
    name?: string;
    vote_average: number;
    id: number;
    overview: string;
    release_date?: string;
    first_air_date?: string;
    category: string;
  }

  const formattedCredits = credits?.map((credit: Credit) => {
    return {
      poster_path: credit.poster_path,
      title: credit.title,
      name: credit.name,
      vote_average: credit.vote_average,
      id: credit.id,
      overview: credit.overview,
      release_date: credit.release_date,
      first_air_date: credit.first_air_date,
      category: credit.release_date ? "movie" : "tv", // Add category here
    };
  });
  
  const category = formattedCredits?.map((formattedCredit: Credit) => {
    return formattedCredit.category === "movie" ? "movie" : "tv"
  });



  return (
    <>
      <section className="py-10 bg-[#1f2937]">
        <div className="flex flex-wrap md:flex-nowrap px-5 gap-x-3 text-white">
          {/* Profile Image and Personal Info */}
          <div className="w-full md:w-1/5 flex flex-col gap-4">
            <img
              src={baseUrl + details?.profile_path}
              className="w-full h-[30rem] object-cover rounded-md shadow-lg"
              alt=""
            />
            <h3 className="text-lg font-bold">Personal Info</h3>
            <p className="text-sm font-semibold text-gray-400">Known for</p>
            <span>{details?.known_for_department}</span>
            <p className="text-sm font-semibold text-gray-400">Known Credits</p>
            <span>{formattedCredits?.length}</span>
            <p className="text-sm font-semibold text-gray-400">Gender</p>
            <span>{details?.gender === 1 ? "Female" : "Male"}</span>
            <p className="text-sm font-semibold text-gray-400">Birthday</p>
            <span>{details?.birthday}</span>
            <p className="text-sm font-semibold text-gray-400">Place of Birth</p>
            <span>{details?.place_of_birth}</span>
            <p className="text-sm font-semibold text-gray-400">Also Known As</p>
            <span className="text-sm">
              {details?.also_known_as.join(", ")}
            </span>
          </div>
  
          {/* Main Content - Biography and Slider */}
          <div className="w-full md:w-4/5 px-6">
            <h2 className="text-3xl font-bold mb-4">{details?.name}</h2>
            <span className="block mt-4 mb-2 text-lg font-semibold">
              Biography
            </span>
            <p className="text-gray-300 text-md line-clamp-4 mb-5 leading-relaxed">
              {details?.biography}
            </p>
            <div className="container mt-6">
              <span className="block text-lg font-semibold mb-4">
                Known for
              </span>
  
              {/* Check if formattedCredits exists before rendering ImgSlider */}
              {formattedCredits?.length ? (
                <ImgSlider
                category={category}
                  baseUrl={baseUrl}
                  movieTitle={formattedCredits.map(
                    (formattedCredit: Credit) =>
                      formattedCredit.title
                        ? formattedCredit.title
                        : formattedCredit.name
                  )}
                  movieDescription={formattedCredits.map(
                    (formattedCredit: Credit) => formattedCredit.overview
                  )}
                  movieId={formattedCredits.map(
                    (formattedCredit: Credit) => formattedCredit.id
                  )}
                  movieDate={formattedCredits.map((formattedCredit: Credit) =>
                    formattedCredit.release_date
                      ? formattedCredit.release_date
                      : formattedCredit.first_air_date
                  )}
                  movieRating={formattedCredits.map(
                    (formattedCredit: Credit) => formattedCredit.vote_average
                  )}
                  posterPaths={formattedCredits.map(
                    (formattedCredit: Credit) => formattedCredit.poster_path
                  )}
                />
              ) : (
                <p>No credits available for this person.</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
