import React from "react";

// Define the props type
interface MediaSwitcherProps {
  setSelectedCategory: (category: "movie" | "tv") => void;
  selectedCategory: string; 
}

const MediaSwitcher: React.FC<MediaSwitcherProps> = ({
  setSelectedCategory,
  selectedCategory,
}) => {
  return (
    <div className="flex gap-4 w-[13.5rem] px-2 items-center border border-gray-700 rounded-full mx-4 my-4 py-2">
      <span
        onClick={() => setSelectedCategory("movie")}
        className={`no-wrap text-white cursor-pointer px-4 py-2 rounded-full transition-all duration-300 ${
          selectedCategory === "movie" ? "clicked" : "hover:bg-gray-700"
        }`}
      >
        Movies
      </span>
      <span
        onClick={() => setSelectedCategory("tv")}
        className={`no-wrap text-white cursor-pointer px-4 py-2 rounded-full transition-all duration-300 ${
          selectedCategory === "tv" ? "clicked" : "hover:bg-gray-700"
        }`}
      >
        TV Shows
      </span>
    </div>
  );
};

export default MediaSwitcher;
