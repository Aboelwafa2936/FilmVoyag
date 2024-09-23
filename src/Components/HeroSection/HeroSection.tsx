import { useQuery } from "@tanstack/react-query";
import React, { useCallback, useMemo, useState } from "react";
import { getMovies } from "../../Services/services/services";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Trailer from "../Trailer/Trailer";
import { debounce } from "lodash";
import { Link } from "react-router-dom";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import "./HeroSection.module.css";
import { motion } from "framer-motion";

// Movie type definition
interface Movie {
  id: number;
  original_title: string;
  release_date: string;
  vote_average: number;
  overview: string;
  backdrop_path: string;
  poster_path: string;
}

// Debounce function for movie selection
const debouncedSelectMovie = debounce(
  (movie: Movie | null, setSelectedMovie: React.Dispatch<React.SetStateAction<Movie | null>>) => setSelectedMovie(movie),
  200
);

export default function HeroSection() {
  const baseUrl = "https://image.tmdb.org/t/p/w500";

  // Fetch movies with react-query and set staleTime
  const {
    data: movies = [],
    error,
    isLoading,
  } = useQuery<Movie[]>({
    queryKey: ["movies"],
    queryFn: getMovies,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isTrailerOpen, setIsTrailerOpen] = useState<boolean>(false);
  const [autoplay, setAutoplay] = useState<boolean>(true); // Autoplay state

  // Initial movie setup
  const initialMovie = movies.length > 0 ? movies[0] : null;
  const movieToDisplay = selectedMovie || initialMovie;

  // Memoize slider settings to avoid unnecessary re-renders
  const sliderSettings = useMemo(
    () => ({
      dots: false,
      arrows: true,
      autoplay: autoplay,
      autoplaySpeed: 2500,
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
      afterChange: (currentSlide: number) => {
        if (movies.length > 0) {
          const movie = movies[currentSlide];
          setSelectedMovie(movie);
        }
      },
    }),
    [movies, autoplay]
  );

  // Use useCallback for the click handler
  const handleSelectMovie = useCallback((movie: Movie) => {
    debouncedSelectMovie(movie, setSelectedMovie);
  }, []);

  if (isLoading) return <LoadingScreen />;
  if (error) return <div>Error! {error.message}</div>;

  return (
    <section className="flex relative" id="hero">
      <div className="relative w-full h-[80vh] m-10">
        {movieToDisplay && (
          <motion.div
            className="absolute top-0 left-0 w-full h-full bg-cover bg-center rounded-md parallax"
            style={{
              backgroundImage: `url(${baseUrl}${movieToDisplay.backdrop_path})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}

        <div className="gradient-overlay absolute top-0 left-0 w-full h-full"></div>

        {movieToDisplay && (
          <motion.div
            className="absolute top-10 left-10 z-5 text-white movie-details"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Link to={`details/movie/${movieToDisplay.id}`}>
              <h1 className="sm:text-2xl md:text-4xl font-bold">
                {movieToDisplay.original_title}
              </h1>
            </Link>
            <p className="mt-2 text-sm">
              {movieToDisplay.release_date.split("-")[0]}{" "}
              <span className="bg-[#6028ff] rounded-md py-[2px] px-1">
                {movieToDisplay.vote_average.toFixed(1)}
              </span>
            </p>
            <p className="mt-4 line-clamp-2 w-1/2">
              {movieToDisplay.overview}
            </p>

            <button
              className="mt-4 bg-red-600 text-white px-1 sm:px-4 py-2 rounded"
              onClick={() => {
                setIsTrailerOpen(!isTrailerOpen);
                setAutoplay(!autoplay);
              }}
            >
              Watch Now
            </button>
            {isTrailerOpen && (
              <Trailer
                setIsTrailerOpen={setIsTrailerOpen}
                cleanCategory={"movie"}
                cleanId={movieToDisplay.id}
                setAutoplay={setAutoplay}
              />
            )}
          </motion.div>
        )}

        <div id="hero" className="absolute bottom-2 left-0 right-0 px-2 md:px-10">
          <Slider {...sliderSettings}>
            {movies.map((movie) => (
              <motion.div
                key={movie.id}
                onClick={() => handleSelectMovie(movie)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0.8 }}
                animate={{
                  opacity: selectedMovie?.id === movie.id ? 1 : 0.8,
                }}
                transition={{ duration: 0.3 }}
                className={`cursor-pointer movie-poster ${
                  selectedMovie?.id === movie.id ? "selected-movie" : ""
                }`}
              >
                <motion.img
                  loading="lazy"
                  src={`${baseUrl}${movie.poster_path}`}
                  alt={movie.original_title}
                  className="w-full h-[15rem] object-contain rounded-lg shadow-md"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>
            ))}
          </Slider>

          <div className="progress-bar absolute bottom-0 left-0 right-0"></div>
        </div>
      </div>
    </section>
  );
}
