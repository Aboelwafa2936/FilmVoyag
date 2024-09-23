import React from "react";
import { motion } from "framer-motion";
import logo from "../../assets/movie-logo.png";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { getGenres } from "../../Services/services/services";
import { IoMdClose } from "react-icons/io";
import { useFavorite } from "../Context/FavoriteContext";

interface SideBarProps{
  isSidebarOpen: boolean;
  setIsSidebarOpen: (IsSidebarOpen: boolean) => void;
}

export default function SideBar({ isSidebarOpen , setIsSidebarOpen}: SideBarProps) {
  const [selectedCategory, setSelectedCategory] = React.useState("movie");
  const navigate = useNavigate();
  const location = useLocation();
  const { setCurrentPage } = useFavorite();

  const { data: movieGenres } = useQuery({
    queryKey: ["movieGenres"],
    queryFn: () => getGenres("movie"),
  });

  const { data: tvGenres } = useQuery({
    queryKey: ["tvGenres"],
    queryFn: () => getGenres("tv"),
  });

  const genres = React.useMemo(
    () => (selectedCategory === "movie" ? movieGenres : tvGenres),
    [selectedCategory, movieGenres, tvGenres]
  );

  const changeCategory = React.useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  const handleNavigation = React.useCallback(
    (event: React.MouseEvent) => {
      const newId = event.currentTarget.getAttribute("data-id");
      if (newId) {
        const categoryPath = `/generCategory/${selectedCategory}/${newId}`;
        const generCategoryPattern = /\/generCategory\/(movie|tv)\/\d+$/;
        const currentPath = location.pathname;

        if (generCategoryPattern.test(currentPath)) {
          const updatedPath = currentPath.replace(
            /\/(movie|tv)\/\d+$/,
            `/${selectedCategory}/${newId}`
          );
          navigate(updatedPath);
        } else {
          navigate(categoryPath);
        }
      }
    },
    [selectedCategory, location.pathname, navigate]
  );

  const sidebarVariants = {
    hidden: { x: "-100%" },
    visible: { x: 0 },
  };

  interface Genre{
    id: number;
    name: string;
  }

  return (
    <motion.aside
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-lg border-r border-gray-700"
      initial="hidden"
      animate={isSidebarOpen ? "visible" : "hidden"}
      variants={sidebarVariants}
      transition={{ duration: 0.3 }}
    >
      <IoMdClose onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-3xl absolute top-5 right-5"/>
      <div className="h-16 flex w-full items-center justify-center border-b border-gray-700">
        <a className="flex items-center space-x-2" href="/">
          <img
            className="h-8 w-8"
            src={logo}
            alt="FilmVoyage Logo"
            loading="lazy"
          />
          <span className="text-xl font-semibold">FilmVoyage</span>
        </a>
      </div>

      <div className="flex gap-4 px-2 items-center border border-gray-700 rounded-lg mx-4 my-4 py-2">
        <span
          onClick={() => changeCategory("movie")}
          className={`no-wrap cursor-pointer px-4 py-2 rounded-lg transition-all duration-300 ${
            selectedCategory === "movie" ? "clicked" : "hover:bg-gray-700"
          }`}
        >
          Movies
        </span>
        <span
          onClick={() => changeCategory("tv")}
          className={`no-wrap cursor-pointer px-4 py-2 rounded-lg transition-all duration-300 ${
            selectedCategory === "tv" ? "clicked" : "hover:bg-gray-700"
          }`}
        >
          TV Shows
        </span>
      </div>

      <ul className="px-4 space-y-2">
        {genres?.map((genre: Genre) => (
          <li
            className="p-2 rounded-md hover:bg-gray-700 transition-all duration-300 cursor-pointer"
            key={genre.id}
            data-id={`${genre.id}`}
            onClick={(e) => {handleNavigation(e); setIsSidebarOpen(false); setCurrentPage(1);}}
          >
            {genre.name}
          </li>
        ))}
      </ul>
    </motion.aside>
  );
}
