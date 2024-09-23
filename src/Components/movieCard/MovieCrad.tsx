import { useEffect, useState } from "react";
import { FaHeart, FaStar } from "react-icons/fa";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { CiStar } from "react-icons/ci";
import RatingCard from "../RatingCard/RatingCard";
import { handleItemToggle, getData } from "../../Services/services/services";
import { useFavorite } from "../Context/FavoriteContext";
import { useWatchlist } from "../Context/WatchlistContext";

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

interface MovieCardProps {
  movie: Movie;
  category: string | null;
}

export default function MovieCard({ movie, category }: MovieCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { userToken } = useAuth();
  const sessionId = localStorage.getItem("session_id") ?? "";

  const { favoriteItems, setFavoriteItems } = useFavorite();
  const { watchlistItems, setWatchlistItems } = useWatchlist();

  // Refetch the data on login if a session exists
  useEffect(() => {
    const refetchUserData = async () => {
      if (sessionId) {
        try {
          const favoriteMovies = await getData(sessionId, "movies", "favorite");
          const favoriteTVShows = await getData(sessionId, "tv", "favorite");

          const watchlistMovies = await getData(sessionId, "movies", "watchlist");
          const watchlistTVShows = await getData(sessionId, "tv", "watchlist");

          // Update context with favorite and watchlist items
          setFavoriteItems([...favoriteMovies, ...favoriteTVShows].map(item => item.id));
          setWatchlistItems([...watchlistMovies, ...watchlistTVShows].map(item => item.id));
        } catch (error: any) {
          console.error("Error fetching user data:", error.response?.data || error.message);
        }
      }
    };

    // Fetch data on page load
    refetchUserData();
  }, [sessionId, setFavoriteItems, setWatchlistItems]);

  return (
    <>
      {isOpen && (
        <RatingCard media={category ?? "unknown"} movie={movie} setIsOpen={setIsOpen} />
      )}

      <div key={movie.id} className="p-2 w-full mx-auto">
        <div className="p-4 bg-gray-700 rounded-md relative">
          <MdOutlineBookmarkAdd
            className={`absolute top-5 left-5 p-1 rounded-lg text-3xl cursor-pointer ${
              watchlistItems.includes(movie.id) && userToken
                ? "bg-white text-black"
                : "bg-[#6028ff]"
            }`}
            title={
              watchlistItems.includes(movie.id) && userToken
                ? "Added to Watchlist"
                : "Add to Watchlist"
            }
            onClick={() => {
              handleItemToggle(
                movie.id,
                sessionId,
                category ?? "unknown",
                navigate,
                watchlistItems,
                userToken || "",
                setWatchlistItems,
                "watchlist"
              );
            }}
          />
          <FaHeart
            className={`absolute top-16 left-5 bg-[#6028ff] p-1 rounded-lg text-3xl cursor-pointer transition-transform duration-200 ${
              favoriteItems.includes(movie.id) && userToken
                ? "text-red-500 scale-110"
                : "text-white"
            }`}
            title={
              favoriteItems.includes(movie.id) && userToken
                ? "Added to Favorites"
                : "Add to Favorites"
            }
            onClick={() =>
              handleItemToggle(
                movie.id,
                sessionId,
                category ?? "unknown",
                navigate,
                favoriteItems,
                userToken || "",
                setFavoriteItems,
                "favorite"
              )
            }
          />
          <Link to={`/details/:${category}/:${movie.id}`}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              className="rounded-md w-full h-[20rem]"
              alt={movie.title}
            />
          </Link>
          <h3
            title={movie.title ? movie.title : movie.name}
            className="line-clamp-1"
          >
            {movie.title ? movie.title : movie.name}
          </h3>
          <p className="line-clamp-1 text-sm" title={movie.overview}>
            {movie.overview ? movie.overview : "No caption found"}
          </p>
          <div className="flex items-center justify-between mt-2">
            <span className="bg-[#6028ff] text-white text-sm rounded-md px-2 py-1 flex items-center">
              <FaStar className="text-yellow-400 me-1" />{" "}
              {movie.vote_average.toFixed(1)}
            </span>
            <CiStar
              className="-ms-24 text-xl cursor-pointer"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            />
            <p className="text-gray-400 line-clamp-2">
              {movie.release_date
                ? movie.release_date.split("-")[0]
                : movie.first_air_date?.split("-")[0]}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
