import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaHeart, FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import RatingCard from "../RatingCard/RatingCard";
import { useAuth } from "../Context/AuthContext";
import { handleItemToggle, getData } from "../../Services/services/services";
import { Link } from "react-router-dom";
import { useFavorite } from "../Context/FavoriteContext"; 
import { useWatchlist } from "../Context/WatchlistContext";

interface ImgSliderProps {
  baseUrl: string;
  posterPaths: string[];
  movieRating: number[];
  movieTitle: string[];
  movieDescription: string[];
  movieDate: string[];
  tvDate?: string[];
  movieId: number[];
  category: string;
}

export default function ImgSlider({
  baseUrl,
  posterPaths,
  movieTitle,
  movieRating,
  movieDescription,
  movieDate,
  tvDate = [],
  movieId,
  category,
}: ImgSliderProps) {
  const settings = {
    dots: false,
    arrows: true,
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
  };

  const [selectedMovie, setSelectedMovie] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { userToken } = useAuth() || '';
  const navigate = useNavigate();
  const sessionId = localStorage.getItem("session_id") ?? "";

  const { favoriteItems, setFavoriteItems } = useFavorite(); 
  const { watchlistItems, setWatchlistItems } = useWatchlist();

  // Refetch favorite and watchlist data when the sessionId changes (i.e., on login)
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
  
  const handleRatingClick = (movie: any) => {
    setSelectedMovie(movie);
    setIsOpen(true);
  };

  const movies = posterPaths.map((posterPath, index) => ({
    posterPath,
    title: movieTitle[index],
    id: movieId[index],
    rating: movieRating[index],
    description: movieDescription[index],
    date: movieDate[index] || tvDate[index] || "",
    category: movieDate[index] ? "movie" : tvDate[index] ? "tv" : "",
  }));

  return (
    <>
      {isOpen && selectedMovie && (
        <RatingCard
          movie={selectedMovie}
          setIsOpen={setIsOpen}
          media={category}
        />
      )}
<Slider {...settings} className="gap-x-4">
  {movies.map((movie) => (
    <div key={movie.id} className="p-2">
      <div className="p-4 bg-slate-950 rounded-md relative">
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
              movie.category,
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
          onClick={() => {
            handleItemToggle(
              movie.id,
              sessionId,
              movie.category, 
              navigate,
              favoriteItems,
              userToken || "",
              setFavoriteItems,
              "favorite"
            );
          }}
        />
        <Link to={`/details/${movie.category}/${movie.id}`}>
          <img
            className="w-full h-[20rem] object-cover rounded-md cursor-pointer"
            src={`${baseUrl}${movie.posterPath}`}
            alt={`Slide ${movie.id}`}
          />
        </Link>
        <h3 className="text-white text-sm line-clamp-1 my-2">
          {movie.title}
        </h3>
        <div className="flex items-center justify-between mt-2 relative">
          <span className="bg-[#6028ff] text-white text-sm rounded-md px-2 py-1 flex items-center">
            <FaStar className="text-yellow-400 me-1" />
            {movie.rating.toFixed(1)}
          </span>
          <CiStar
            className="absolute right-10 text-xl cursor-pointer text-white"
            onClick={() => handleRatingClick(movie)}
          />
          <p className="text-gray-400 line-clamp-2">
            {movie.date ? movie.date.split("-")[0] : "not found"}
          </p>
        </div>
      </div>
    </div>
  ))}
</Slider>

    </>
  );
}