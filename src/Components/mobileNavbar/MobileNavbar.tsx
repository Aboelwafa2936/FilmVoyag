import React from "react";
import { BiCaretDown, BiCaretUp } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { IoIosLogOut, IoMdClose } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface MobileNavbarProps {
  toggleMoviesDropdown: () => void;
  isMoviesDropdownOpen: boolean;
  toggleTvshowsDropdown: () => void;
  isTvShowsDropdownOpen: boolean;
  setIsUserMenuOpen: (open: boolean) => void;
  isUserMenuOpen: boolean;
  setIsSearchBarOpen: (open: boolean) => void;
  handleLogout: () => void;
  setIsMobileMenuOpen: (open: boolean) => void;
  isSearchBarOpen: boolean;
  searchQuery: string;
  handleSearchInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchResults: any[];
  handleSearchResultClick: (
    result: any,
    navigate: (path: string) => void
  ) => void;
  navigate: (path: string) => void;
  userToken: string;
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  setIsSidebarOpen: (open: boolean) => void;
  isSidebarOpen: boolean;
  setIsMoviesDropdownOpen: (open: boolean) => void;
  setIsTvShowsDropdownOpen: (open: boolean) => void;
  trendings: any[];
}

export default function MobileNavbar({
  toggleMoviesDropdown,
  isMoviesDropdownOpen,
  toggleTvshowsDropdown,
  isTvShowsDropdownOpen,
  setIsUserMenuOpen,
  isUserMenuOpen,
  setIsSearchBarOpen,
  handleLogout,
  setIsMobileMenuOpen,
  isSearchBarOpen,
  searchQuery,
  handleSearchInputChange,
  searchResults,
  handleSearchResultClick,
  navigate,
  userToken,
  isMobileMenuOpen,
  toggleMobileMenu,
  setIsSidebarOpen,
  isSidebarOpen,
  trendings,
}: MobileNavbarProps) {
  // Animation variants
  const mobileMenuVariants = {
    hidden: { x: "-100%" }, // Off-screen
    visible: { x: 0 }, // On-screen
  };

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

  interface Result {
    id: number;
    name?: string;
    title?: string;
  }

  return (
    <nav className="block sm:hidden px-2">
      <div className="container mx-auto flex items-center justify-between">
        <NavLink to={""}>FilmVoyag</NavLink>
        <div className="flex items-center">
          {userToken && (
            <div className="flex items-center gap-x-2">
              <FaRegUserCircle
                className="text-2xl cursor-pointer"
                onClick={() => {
                  setIsUserMenuOpen(!isUserMenuOpen);
                  setIsSearchBarOpen(false);
                  setIsMobileMenuOpen(false);
                }}
              />
              {isUserMenuOpen && (
                <motion.ul
                  className="dark:bg-[#1F2937] absolute px-3 z-50 top-12 right-14 border rounded-lg shadow-xl shadow-gray-800 border-gray-700 bg-gray-800 py-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
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
            </div>
          )}
          <div className="flex items-center ms-auto gap-x-3">
            {isSearchBarOpen ? (
              <IoMdClose
                onClick={() => setIsSearchBarOpen(!isSearchBarOpen)}
                className="cursor-pointer"
              />
            ) : (
              <CiSearch
                className="text-xl cursor-pointer"
                onClick={() => {
                  setIsSearchBarOpen(!isSearchBarOpen);
                  setIsUserMenuOpen(false);
                  setIsMobileMenuOpen(false);
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
                      {searchResults.map((result: Result) => (
                        <p
                          key={result.id}
                          onClick={() =>
                            handleSearchResultClick(result, navigate)
                          }
                          className="bg-white p-1 flex items-center text-black hover:bg-gray-300 transition-all duration-300 border-b"
                        >
                          {result.title || result.name}
                        </p>
                      ))}
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </div>
          <RxHamburgerMenu
            onClick={() => {
              toggleMobileMenu();
              setIsSearchBarOpen(false);
              setIsUserMenuOpen(false);
            }}
            className="text-2xl ms-1 cursor-pointer"
          />
        </div>
      </div>

      {isMobileMenuOpen && (
        <motion.ul
          className="list-none bg-[#111827]"
          initial="hidden"
          animate="visible"
          variants={mobileMenuVariants}
          transition={{ duration: 0.3 }}
        >
          <NavLink to={"/"} onClick={() => setIsMobileMenuOpen(false)}>
            <li className="my-2">Home</li>
          </NavLink>
          <li
            className="my-2"
            onClick={() => {
              setIsSidebarOpen(!isSidebarOpen);
              setIsMobileMenuOpen(false);
            }}
          >
            Categories
          </li>
          <li
            className="flex items-center gap-1 cursor-pointer my-2"
            onClick={toggleMoviesDropdown} // Movie dropdown toggle
          >
            Movies {isMoviesDropdownOpen ? <BiCaretUp /> : <BiCaretDown />}
            <motion.ul
              className="absolute px-3 top-20 left-20 z-40 mt-2 border rounded-lg shadow-xl shadow-gray-800 border-gray-700 bg-gray-800 py-2"
              initial="hidden"
              animate={isMoviesDropdownOpen ? "visible" : "hidden"} // Use isMoviesDropdownOpen
              variants={movieDropdownVariants}
              transition={{ duration: 0.3 }}
            >
              <Link to={"/topMovies"}>
                <li
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-2 mb-3 py-1 hover:bg-gray-700 rounded-md transition-all duration-300"
                >
                  Top
                </li>
              </Link>
              <Link to={"/upcomingMovies"}>
                <li
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-2 mb-3 py-1 hover:bg-gray-700 rounded-md transition-all duration-300"
                >
                  Upcoming
                </li>
              </Link>
              <Link to={"/popularMovies"}>
                <li
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-2 mb-3 py-1 hover:bg-gray-700 rounded-md transition-all duration-300"
                >
                  Popular
                </li>
              </Link>
            </motion.ul>
          </li>

          <li
            className="flex items-center gap-1 cursor-pointer my-2"
            onClick={toggleTvshowsDropdown} // TV shows dropdown toggle
          >
            TV Shows {isTvShowsDropdownOpen ? <BiCaretUp /> : <BiCaretDown />}
            <motion.ul
              className="dark:bg-[#1F2937] absolute px-3 z-50 top-28 left-24 border rounded-lg shadow-xl shadow-gray-800 border-gray-700 bg-gray-800 py-2"
              initial="hidden"
              animate={isTvShowsDropdownOpen ? "visible" : "hidden"} // Use isTvShowsDropdownOpen
              variants={tvDropdownVariants}
              transition={{ duration: 0.3 }}
            >
              <Link to={"/topTvshows"}>
                <li
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-2 mb-3 py-1 hover:bg-gray-700 rounded-md transition-all duration-300"
                >
                  Top
                </li>
              </Link>
              <Link to={"/upcomingTvshows"}>
                <li
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-2 mb-3 py-1 hover:bg-gray-700 rounded-md transition-all duration-300"
                >
                  Upcoming
                </li>
              </Link>
              <Link to={"/popularTvshows"}>
                <li
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-2 mb-3 py-1 hover:bg-gray-700 rounded-md transition-all duration-300"
                >
                  Popular
                </li>
              </Link>
            </motion.ul>
          </li>

          <NavLink to={"/people"} onClick={() => setIsMobileMenuOpen(false)}>
            <li className="my-2">People</li>
          </NavLink>
          {
            !userToken && (
              <div className="flex flex-col gap-y-2">
              <Link to={"login"}>Login</Link>
              <Link to={"register"}>Register</Link>
              </div>
            )
          }
        </motion.ul>
      )}
    </nav>
  );
}
