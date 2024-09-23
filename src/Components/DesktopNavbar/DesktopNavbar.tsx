import React, { Dispatch, SetStateAction } from "react";
import { BiCaretDown, BiCaretUp } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { IoIosLogOut, IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

interface DesktopNavbarProps {
  toggleMoviesDropdown: () => void;
  trendings: any[];  // Specify the type if possible
  isMoviesDropdownOpen: boolean;
  toggleTvshowsDropdown: () => void;
  isTvShowsDropdownOpen: boolean;
  setIsUserMenuOpen: (open: boolean) => void;
  isUserMenuOpen: boolean;
  setIsSearchBarOpen: (open: boolean) => void;
  handleLogout: () => void;
  isSearchBarOpen: boolean;
  searchQuery: string;
  handleSearchInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchResults: any[];  // Specify the type if possible
  handleSearchResultClick: (
    result: any,
    navigate: (path: string) => void
  ) => void;
  navigate: (path: string) => void;
  userToken: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  setSearchResults: Dispatch<SetStateAction<any[]>>;  // Specify the type if possible
  setIsSideBarOpen: (open: boolean) => void;
  isSidebarOpen: boolean;
  setIsMoviesDropdownOpen: (open: boolean) => void;
  setIsTvShowsDropdownOpen: (open: boolean) => void;
}

export default function DesktopNavbar({
  toggleMoviesDropdown,
  setIsMoviesDropdownOpen,
  isMoviesDropdownOpen,
  toggleTvshowsDropdown,
  isTvShowsDropdownOpen,
  setIsTvShowsDropdownOpen,
  setIsUserMenuOpen,
  isUserMenuOpen,
  setIsSearchBarOpen,
  handleLogout,
  isSearchBarOpen,
  searchQuery,
  handleSearchInputChange,
  searchResults,
  handleSearchResultClick,
  setSearchQuery,
  navigate,
  setSearchResults,
  userToken,
  isSidebarOpen,
  setIsSideBarOpen,
  trendings,
}: DesktopNavbarProps) {
  // Variants for movies dropdown
  const movieDropdownVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto" },
  };

  // Variants for TV shows dropdown
  const tvDropdownVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: "auto" },
  };


  return (
    <>
      <nav className="hidden sm:block">
        <div className="container mx-auto flex items-center gap-x-5">
          <ul className="list-none flex items-center px-2 gap-x-3">
            <NavLink to={"/"}>Home</NavLink>
            <li
              onClick={() => {setIsSideBarOpen(!isSidebarOpen); setIsMoviesDropdownOpen(false); setIsSearchBarOpen(false); setIsTvShowsDropdownOpen(false)}}
              className="cursor-pointer"
            >
              Categories
            </li>
            <li
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => {
                toggleMoviesDropdown();
                setIsSearchBarOpen(false);
              }}
            >
              movies {isMoviesDropdownOpen ? <BiCaretUp /> : <BiCaretDown />}
              {isMoviesDropdownOpen && (
                <motion.ul
                  initial="hidden"
                  animate={isMoviesDropdownOpen ? "visible" : "hidden"} // Use isTvShowsDropdownOpen
                  variants={movieDropdownVariants}
                  transition={{ duration: 0.3 }}
                  className="absolute px-3 top-10 z-40 mt-2  border rounded-lg shadow-xl shadow-gray-800 border-gray-700 bg-gray-800  py-2"
                >
                  <Link to={"/topMovies"}>
                    <li className="px-2 mb-3 py-1 hover:bg-gray-700 rounded-md transition-all duration-300">
                      Top
                    </li>
                  </Link>
                  <Link to={"/upcomingMovies"}>
                    <li className="px-2 mb-3 py-1 hover:bg-gray-700 rounded-md transition-all duration-300">
                      Upcoming
                    </li>
                  </Link>
                  <Link to={"/popularMovies"}>
                    <li className="px-2 mb-3 py-1 hover:bg-gray-700 rounded-md transition-all duration-300">
                      Popular
                    </li>
                  </Link>
                </motion.ul>
              )}
            </li>
            <li
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => {
                toggleTvshowsDropdown();
                setIsSearchBarOpen(false);
              }}
            >
              Tvshows {isTvShowsDropdownOpen ? <BiCaretUp /> : <BiCaretDown />}
              {isTvShowsDropdownOpen && (
                <motion.ul
                  initial="hidden"
                  animate={isTvShowsDropdownOpen ? "visible" : "hidden"} // Use isTvShowsDropdownOpen
                  variants={tvDropdownVariants}
                  transition={{ duration: 0.3 }}
                  className="dark:bg-[#1F2937] absolute px-3 z-50 top-12 border rounded-lg shadow-xl shadow-gray-800 border-gray-700 bg-gray-800 py-2"
                >
                  <Link to={"/topTvshows"}>
                    <li className="px-2 mb-3 py-1 hover:bg-gray-700 rounded-md transition-all duration-300">
                      Top
                    </li>
                  </Link>
                  <Link to={"/upcomingTvshows"}>
                    <li className="px-2 mb-3 py-1 hover:bg-gray-700 rounded-md transition-all duration-300">
                      Upcoming
                    </li>
                  </Link>
                  <Link to={"/popularTvshows"}>
                    <li className="px-2 mb-3 py-1 hover:bg-gray-700 rounded-md transition-all duration-300">
                      Popular
                    </li>
                  </Link>
                </motion.ul>
              )}
            </li>
            <NavLink to={"people"}>People</NavLink>
          </ul>

          {userToken && (
            <div className="flex items-center ms-auto gap-x-3">
              <FaRegUserCircle
                className="text-2xl"
                onClick={() => {
                  setIsUserMenuOpen(!isUserMenuOpen);
                  setIsSearchBarOpen(false);
                }}
              />
              {isUserMenuOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="dark:bg-[#1F2937] absolute px-3 z-50 top-12 right-14 border rounded-lg shadow-xl shadow-gray-800 border-gray-700 bg-gray-800 py-2"
                >
                  <Link
                    to={"/ratings"}
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <li className="px-2 mb-3 py-1 hover:bg-gray-700 rounded-md transition-all duration-300">
                      My Ratings
                    </li>
                  </Link>
                  <Link
                    to={"/favorites"}
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <li className="px-2 mb-3 py-1 hover:bg-gray-700 rounded-md transition-all duration-300">
                      My Favorites
                    </li>
                  </Link>
                  <Link
                    to={"/watchlist"}
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <li className="px-2 mb-3 py-1 hover:bg-gray-700 rounded-md transition-all duration-300">
                      My WishList
                    </li>
                  </Link>
                  <IoIosLogOut
                    onClick={handleLogout}
                    className="text-2xl cursor-pointer"
                  />
                </motion.ul>
              )}
              <div className="flex items-center ms-auto gap-x-3">
                {isSearchBarOpen ? (
                  <IoMdClose className="cursor-pointer"
                    onClick={() => {
                      setIsSearchBarOpen(!isSearchBarOpen);
                      setIsMoviesDropdownOpen(false);
                      setIsTvShowsDropdownOpen(false);
                      setIsUserMenuOpen(false);
                    }}
                  />
                ) : (
                  <CiSearch
                    className="text-xl cursor-pointer"
                    onClick={() => {
                      setIsSearchBarOpen(!isSearchBarOpen);
                      setIsUserMenuOpen(false);
                      setIsMoviesDropdownOpen(false);
                      setIsTvShowsDropdownOpen(false);
                    }}
                  />
                )}

                {isSearchBarOpen && (
                  <motion.div
                    className="absolute top-14 left-0 right-0"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-2 absolute top-0 z-[900] bg-white w-full">
                      <div className="flex items-center">
                        <CiSearch className="text-black" />
                        <input
                          className="w-full text-gray-950"
                          type="text"
                          value={searchQuery}
                          onChange={handleSearchInputChange}
                          placeholder="Search for a Movie, TV Show, Person"
                        />
                      </div>
                      <div
                        className={`bg-gray-100 p-2 text-black border-b border-t ${
                          searchResults.length > 0 && "hidden"
                        }`}
                      >
                        Trendings
                      </div>
                      {searchResults.length > 0 ||
                        trendings?.slice(3, 14).map((trending) => {
                          return (
                            <>
                              <div key={trending.id}>
                                <Link to={`/details/movie/${trending.id}`}>
                                  <p
                                    onClick={() => setIsSearchBarOpen(false)}
                                    className="bg-white p-1 flex items-center cursor-pointer text-black hover:bg-gray-300 transition-all duration-300 border-b"
                                  >
                                    {trending.title
                                      ? trending.title
                                      : trending.name}
                                  </p>
                                </Link>
                              </div>
                            </>
                          );
                        })}
                      {searchResults.length > 0 && (
                        <>
                          <p className="bg-gray-100 p-2 text-black border-b border-t">
                            Search Results
                          </p>
                          {searchResults.map((result) => (
                            <p
                              key={result.id}
                              onClick={() => {
                                handleSearchResultClick(result, navigate);
                                setIsSearchBarOpen(false);
                                setSearchQuery("");
                                setSearchResults([]);
                              }}
                              className="bg-white p-1 flex items-center cursor-pointer text-black hover:bg-gray-300 transition-all duration-300 border-b"
                            >
                              {result.title || result.name}{" "}
                              {/* Movie title or person name */}
                            </p>
                          ))}
                        </>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          )}
          {!userToken && (
            <div className="flex items-center gap-x-2 ms-auto">
              <Link to={"login"}>Login</Link>
              <Link to={"register"}>Register</Link>
              <div className="flex items-center ms-auto gap-x-3">
                {isSearchBarOpen ? (
                  <IoMdClose className="cursor-pointer"
                    onClick={() => {
                      setIsSearchBarOpen(!isSearchBarOpen);
                      setIsMoviesDropdownOpen(false);
                      setIsTvShowsDropdownOpen(false);
                      setIsUserMenuOpen(false);
                    }}
                  />
                ) : (
                  <CiSearch
                    className="text-xl cursor-pointer"
                    onClick={() => {
                      setIsSearchBarOpen(!isSearchBarOpen);
                      setIsMoviesDropdownOpen(false);
                      setIsTvShowsDropdownOpen(false);
                      setIsUserMenuOpen(false);
                    }}
                  />
                )}

                {isSearchBarOpen && (
                  <motion.div
                    className="absolute top-14 left-0 right-0"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-2 absolute top-0 z-[900] bg-white w-full">
                      <div className="flex items-center">
                        <CiSearch className="text-black" />
                        <input
                          className="w-full text-gray-950"
                          type="text"
                          value={searchQuery}
                          onChange={handleSearchInputChange}
                          placeholder="Search for a Movie, TV Show, Person"
                        />
                      </div>
                      <div
                        className={`bg-gray-100 p-2 text-black border-b border-t ${
                          searchResults.length > 0 && "hidden"
                        }`}
                      >
                        Trendings
                      </div>
                      {searchResults.length > 0 ||
                        trendings?.slice(3, 11).map((trending) => {
                          return (
                            <>
                              <div key={trending.id}>
                                <Link to={`/details/movie/${trending.id}`}>
                                  <p
                                    onClick={() => setIsSearchBarOpen(false)}
                                    className="bg-white p-1 flex items-center cursor-pointer text-black hover:bg-gray-300 transition-all duration-300 border-b"
                                  >
                                    {trending.title
                                      ? trending.title
                                      : trending.name}
                                  </p>
                                </Link>
                              </div>
                            </>
                          );
                        })}
                      {searchResults.length > 0 && (
                        <>
                          <p className="bg-gray-100 p-2 text-black border-b border-t">
                            Search Results
                          </p>
                          {searchResults.map((result) => (
                            <p
                              key={result.id}
                              onClick={() => {
                                handleSearchResultClick(result, navigate);
                                setIsSearchBarOpen(false);
                                setSearchQuery("");
                                setSearchResults([]);
                              }}
                              className="bg-white p-1 flex items-center cursor-pointer text-black hover:bg-gray-300 transition-all duration-300 border-b"
                            >
                              {result.title || result.name}{" "}
                              {/* Movie title or person name */}
                            </p>
                          ))}
                        </>
                      )}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}