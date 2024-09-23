import React, { useState } from "react";
import {
  getTrending,
  handleSearchResultClick,
  searchTMDB,
} from "../../Services/services/services";
import DesktopNavbar from "../DesktopNavbar/DesktopNavbar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import SideBar from "../SideBarLinks/Sidebar";
import MobileNavbar from "../mobileNavbar/MobileNavbar";
import { useQuery } from "@tanstack/react-query";
import { useFavorite } from "../Context/FavoriteContext";
import { useWatchlist } from "../Context/WatchlistContext";

interface SearchResult {
  id: number;
  title: string;
}

export default function Navbar() {
  // State for the mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const {setFavoriteItems} = useFavorite();
  const {setWatchlistItems} = useWatchlist();

  // Function to handle search input change
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (e.target.value.length > 2) {
      fetchSearchResults(e.target.value);
    }
  };

  // Fetch search results from TMDB API
  const fetchSearchResults = async (query: string) => {
    try {
      const results = await searchTMDB(query);
      setSearchResults(results.slice(0, 10)); // Limit the results to 10
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  // Separate states for dropdown menus
  const [isMoviesDropdownOpen, setIsMoviesDropdownOpen] = useState(false);
  const [isTvShowsDropdownOpen, setIsTvShowsDropdownOpen] = useState(false);
  const { setUserToken, userToken } = useAuth();
  const navigate = useNavigate();

  // Toggle functions for each dropdown and mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleMoviesDropdown = () => {
    setIsMoviesDropdownOpen(!isMoviesDropdownOpen);
    if (isTvShowsDropdownOpen) {
      setIsTvShowsDropdownOpen(false);
    }
    // Close user menu if open
    if (isUserMenuOpen) {
      setIsUserMenuOpen(false);
    }
  };

  const toggleTvshowsDropdown = () => {
    setIsTvShowsDropdownOpen(!isTvShowsDropdownOpen);
    if (isMoviesDropdownOpen) {
      setIsMoviesDropdownOpen(false);
    }
    // Close user menu if open
    if (isUserMenuOpen) {
      setIsUserMenuOpen(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("session_id");
    setUserToken(null);
    setFavoriteItems([]);
    setWatchlistItems([]);
    navigate("/login");
  };

  const { data: trendings } = useQuery({
    queryKey: ["trendings"],
    queryFn: getTrending,
  });


  return (
    <>
      <header className="bg-[#111827] text-white py-4 border-b border-b-gray-600">
        {/* Desktop navbar */}
        <DesktopNavbar
          trendings={trendings}
          toggleMoviesDropdown={toggleMoviesDropdown}
          toggleTvshowsDropdown={toggleTvshowsDropdown}
          isMoviesDropdownOpen={isMoviesDropdownOpen}
          isTvShowsDropdownOpen={isTvShowsDropdownOpen}
          setIsUserMenuOpen={setIsUserMenuOpen}
          isUserMenuOpen={isUserMenuOpen}
          setIsSearchBarOpen={setIsSearchBarOpen}
          handleLogout={handleLogout}
          isSearchBarOpen={isSearchBarOpen}
          searchQuery={searchQuery}
          handleSearchInputChange={handleSearchInputChange}
          searchResults={searchResults}
          handleSearchResultClick={handleSearchResultClick}
          setSearchQuery={setSearchQuery}
          navigate={navigate}
          setSearchResults={setSearchResults}
          userToken={userToken || ""}
          setIsSideBarOpen={setIsSidebarOpen}
          isSidebarOpen={isSidebarOpen}
          setIsTvShowsDropdownOpen={setIsTvShowsDropdownOpen}
          setIsMoviesDropdownOpen={setIsMoviesDropdownOpen}
        />
        {/* mobile navbar */}
        <MobileNavbar
          toggleMoviesDropdown={toggleMoviesDropdown}
          toggleTvshowsDropdown={toggleTvshowsDropdown}
          isMoviesDropdownOpen={isMoviesDropdownOpen}
          isTvShowsDropdownOpen={isTvShowsDropdownOpen}
          setIsUserMenuOpen={setIsUserMenuOpen}
          isUserMenuOpen={isUserMenuOpen}
          setIsSearchBarOpen={setIsSearchBarOpen}
          handleLogout={handleLogout}
          isSearchBarOpen={isSearchBarOpen}
          searchQuery={searchQuery}
          handleSearchInputChange={handleSearchInputChange}
          searchResults={searchResults}
          handleSearchResultClick={handleSearchResultClick}
          navigate={navigate}
          userToken={userToken || ""}
          isMobileMenuOpen={isMobileMenuOpen}
          toggleMobileMenu={toggleMobileMenu}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          setIsTvShowsDropdownOpen={setIsTvShowsDropdownOpen}
          setIsMoviesDropdownOpen={setIsMoviesDropdownOpen}
          trendings={trendings}
        />
      </header>
      <SideBar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
    </>
  );
}
