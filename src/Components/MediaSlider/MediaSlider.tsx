import { useMemo, lazy, Suspense, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMedia } from "../../Services/services/services";
import MediaSwitcher from "../MediaSwitcher/MediaSwitcher";
import HeadingSection from "../HeadingSection";
import LoadingScreen from "../LoadingScreen/LoadingScreen";

interface Movie {
  id: number;
  poster_path: string;
  title?: string;
  name?: string;
  vote_average: number;
  overview: string;
  release_date?: string;
  first_air_date?: string;
}

interface MediaSliderProps {
  heading: string;
  baseUrl: string;
  param: string;
}

// Lazy load the ImgSlider component
const ImgSlider = lazy(() => import("../imgSlider/ImgSlider"));

export default function MediaSlider({
  heading,
  baseUrl,
  param,
}: MediaSliderProps) {
  const [selectedCategory, setSelectedCategory] = useState("movie");

  const url =
    heading === "Weekly Trending"
      ? `trending/${selectedCategory}/week`
      : heading === "Upcoming" && selectedCategory === "tv"
      ? `${selectedCategory}/on_the_air`
      : `${selectedCategory}/${param}`;

  const {
    data: mediaData,
    error,
    isLoading,
  } = useQuery<Movie[]>({
    queryKey: [url],
    queryFn: () => getMedia(url),
  });

  // Memoize the media data to prevent unnecessary re-renders
  const memoizedMedia = useMemo(() => mediaData || [], [mediaData]);

  if (isLoading) return <LoadingScreen />;
  if (error) return <div>Error loading media.</div>;
  if (!memoizedMedia.length) return <div>No media found.</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row items-center gap-x-2 text-white">
        <HeadingSection heading={heading} />
        <MediaSwitcher setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} />
      </div>
      <div className="relative">
        <Suspense fallback={<LoadingScreen />}>
          <ImgSlider
            baseUrl={baseUrl}
            posterPaths={memoizedMedia.map((media) => media.poster_path)}
            movieTitle={memoizedMedia.map((media) =>
              media.title || media.name
            ).filter((title): title is string => title !== undefined)} // Filter out undefined values
            movieRating={memoizedMedia.map((media) => media.vote_average)}
            movieDescription={memoizedMedia.map((media) => media.overview)}
            movieDate={memoizedMedia.map((media) =>
              media.release_date || media.first_air_date
            ).filter((date): date is string => date !== undefined)} // Filter out undefined values
            movieId={memoizedMedia.map((media) => media.id)}
            category={selectedCategory}
          />
        </Suspense>
      </div>
    </div>
  );
}
