import { useQuery } from "@tanstack/react-query";
import { Suspense, lazy, useMemo } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaStar } from "react-icons/fa";
import HeadingSection from "../Components/HeadingSection";
import { baseUrl, fetchClips, fetchDetails, fetchRecommendations, getCast } from "../Services/services/services";
import Cast from "../Components/Cast/Cast";
import LoadingScreen from "../Components/LoadingScreen/LoadingScreen";

// Lazy load components
const ImgSlider = lazy(() => import("../Components/imgSlider/ImgSlider"));
const Reviews = lazy(() => import("../Components/Reviews/Reviews"));
const Seasons = lazy(() => import("../Components/Seasons/Seasons"));

export default function Details() {
  const { category, id } = useParams();
  const cleanId = id?.replace(/^:/, "") || "";
  const cleanCategory = category?.replace(/^:/, "") || "";


  const { data: details, error, isLoading } = useQuery({
    queryKey: ['details', cleanId, cleanCategory],
    queryFn:()=> fetchDetails({cleanCategory , cleanId}),
    // staleTime: 60 * 1000, // Cache for 1 minute
  });

  const { data: recommendations } = useQuery({
    queryKey: ['recommendations', cleanId, cleanCategory],
    queryFn:()=> fetchRecommendations({cleanCategory , cleanId}),
  });

  const { data: Clips } = useQuery({
    queryKey: ['Clips', cleanId, cleanCategory],
    queryFn:()=> fetchClips({cleanCategory , cleanId}),
  });

  const { data: cast } = useQuery({
    queryKey: ['cast', cleanId, cleanCategory],
    queryFn:()=> getCast(cleanCategory , cleanId),
  });

  // Memoize filtered videos to avoid recalculating on every render
  const videos = useMemo(
    () => [
      ...(Clips?.filter((clip: {type: string}) => clip.type === "Trailer") || []),
      ...(Clips?.filter((clip: {type: string}) => clip.type !== "Trailer") || []),
    ],
    [Clips]
  );

  
  const sliderSettings = useMemo(
    () => ({
      slidesToShow: 3,
      slidesToScroll: 1,
      infinite: true,
      dots: false,
      centerMode: true,
      centerPadding: "0px",
      arrows: true,
      responsive: [
        { breakpoint: 1024, settings: { slidesToShow: 4 } },
        { breakpoint: 600, settings: { slidesToShow: 2 } },
        { breakpoint: 480, settings: { slidesToShow: 1 } },
      ],
    }),
    []
  );

  if (isLoading) return <LoadingScreen />;
  if (error) return <div>Error occurred. Please try again later.</div>;

  return (
    <main className="bg-[#111827]">
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-[80%] mx-auto p-4 overflow-hidden">
          <div className="bg-[#1f2937] rounded-md p-4 text-white">
            <div className="flex flex-col lg:flex-row gap-x-5">
              <div className="lg:w-2/5">
                <img
                  className="w-full h-auto min-h-[30rem] lg:max-h-[30rem] object-cover lg:object-contain rounded-md shadow-md"
                  src={baseUrl + details.poster_path}
                  alt={details.title || details.name}
                />
              </div>
              <div className="lg:w-3/5 mt-4 lg:mt-0">
                <h2 className="text-3xl font-semibold">
                  {details.title || details.name}
                </h2>
                <div className="flex items-center gap-4 mt-2">
                  <span className="bg-[#6028ff] text-white text-sm rounded-md px-2 py-1 flex items-center">
                    <FaStar className="text-yellow-400 me-1" />{" "}
                    {details.vote_average.toFixed(1)}
                  </span>
                  <span className="text-sm">
                    {details.release_date
                      ? details?.release_date?.split("-")[0]
                      : details?.first_air_date?.split("-")[0]}
                  </span>
                  <span className="flex gap-2">
                    {details.genres.map((genre: {name: string, id: number}) => (
                      <span className="text-sm" key={genre.id}>
                        {genre.name}
                      </span>
                    ))}
                  </span>
                </div>
                <p className="mt-4">{details.overview}</p>
              </div>
            </div>

            <div className="md:w-[70%] ms-auto">
              <h2 className="text-2xl mt-8 mb-4">Trailers and Clips</h2>
              <Slider {...sliderSettings}>
                {videos.map((video) => (
                  <div key={video.id} className="flex justify-center">
                    <div className="w-full p-4">
                      <iframe
                        width="100%"
                        height="215"
                        src={`https://www.youtube.com/embed/${video.key}`}
                        title={video.name}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="rounded-lg"
                      ></iframe>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>

            {cleanCategory === "tv" && (
              <Suspense fallback={<div>Loading Seasons...</div>}>
                <section className="py-5">
                  <HeadingSection heading="Series Seasons" />
                  <Seasons seasons={details.seasons} seriesId={cleanId} />
                </section>
              </Suspense>
            )}

            {/* top cast section */}
            <Cast cast={ cast }/>

            {recommendations && (
              <Suspense fallback={<div>Loading Recommendations...</div>}>
                <HeadingSection heading="You May Also Like" />
                <ImgSlider
                  baseUrl={baseUrl}
                  posterPaths={recommendations.map(
                    (recommendation: {poster_path: string}) => recommendation.poster_path
                  )}
                  movieTitle={recommendations.map(
                    (recommendation: {title: string,  name: string}) =>
                      recommendation.title || recommendation.name
                  )}
                  movieRating={recommendations.map(
                    (recommendation: {vote_average: string}) => recommendation.vote_average
                  )}
                  movieDescription={recommendations.map(
                    (recommendation: {overview: string}) => recommendation.overview
                  )}
                  movieDate={recommendations.map(
                    (recommendation: {release_date: string , first_air_date: string}) =>
                      recommendation.release_date ||
                      recommendation.first_air_date
                  )}
                  movieId={recommendations.map(
                    (recommendation: {id: number}) => recommendation.id
                  )}

                  category={cleanCategory}
                />
              </Suspense>
            )}

            <Suspense fallback={<div>Loading Reviews...</div>}>
              <section className="py-5">
                <Reviews category={cleanCategory} id={cleanId} />
              </section>
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}


