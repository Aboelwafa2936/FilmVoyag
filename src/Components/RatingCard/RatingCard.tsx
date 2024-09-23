import React, { useState } from "react";
import { CiStar } from "react-icons/ci";
import { FaStar, FaStarHalfAlt } from "react-icons/fa"; // Use the half-star icon
import { IoClose } from "react-icons/io5";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { addRating } from "../../Services/services/services.ts";

interface Movie {
  id: number;
  title: string;
}

interface RatingCardProps {
  movie: Movie;
  setIsOpen: (isOpen: boolean) => void;
  media: string;
}

export default function RatingCard({ movie, setIsOpen, media }: RatingCardProps) {
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);
  const { userToken } = useAuth();
  const sessionId = localStorage.getItem("session_id") ?? "";
  const navigate = useNavigate();

  const handleMouseMove = (e: React.MouseEvent, star: number) => {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const x = e.pageX - left;
    if (x < width / 2) {
      setHoverRating(star - 0.5); // Left side (half star)
    } else {
      setHoverRating(star); // Right side (full star)
    }
  };

  const handleClick = (rating: number) => {
    setSelectedRating(rating);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const stars = Array.from({ length: 10 }, (_, i) => i + 1);

  const handleRatingSubmit = () => {
    if (userToken && sessionId) {
      addRating(media, String(movie.id), selectedRating, sessionId);
      setIsOpen(false);
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
        <IoClose
          className="text-3xl absolute top-1/4 left-3/4 cursor-pointer text-white"
          onClick={() => setIsOpen(false)}
        />
        <div className="bg-[#111827] p-5 text-white text-center rounded-md z-50 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full md:w-1/2 h-[15rem]">
          <div className="flex flex-col justify-center items-center">
            <span className="text-[#6028ff] my-4">Rate this</span>
            <h2 className="text-xl my-4">{movie.title}</h2>
            <div className="flex items-center gap-x-2 justify-center">
              {stars.map((star) => (
                <div
                  key={star}
                  onMouseMove={(e) => handleMouseMove(e, star)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleClick(star)}
                  className="cursor-pointer relative"
                >
                  {selectedRating >= star || hoverRating >= star ? (
                    <FaStar className="text-yellow-400 me-1" />
                  ) : hoverRating >= star - 0.5 ? (
                    <FaStarHalfAlt className="text-yellow-400 me-1" />
                  ) : (
                    <CiStar className="text-gray-500 me-1" />
                  )}
                </div>
              ))}
            </div>
            <button
              className="rounded-md bg-gray-700 px-4 py-1 text-xl my-10"
              onClick={handleRatingSubmit}
            >
              Rate
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

