import "./index.css";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Pages/Home";
import People from "./Pages/People";
import Register from "./Components/authentication/Register/Register";
import Login from "./Components/authentication/Login/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TopMovies from "./Pages/TopMovies";
import Details from "./Pages/Details";
import GenerCategory from "./Components/GenerCategory/GenerCategory";
import AuthContextProvider from "./Components/Context/AuthContext";
import SeasonDetails from "./Components/SeasonDetails/SeasonDetails";
import PersonDetails from "./Components/PersonDetails/PersonDetails";
import UpcomingMovies from "./Pages/UpcomingMovies";
import PopularMovies from "./Pages/PopularMovies";
import TopTvshows from "./Pages/TopTvshows";
import UpcomingTvShows from "./Pages/UpcomingTvShows";
import PopularTvshows from "./Pages/PopularTvshows";
import TMDBAuth from "./Components/authentication/TMDBAuth/TMDBAuth";
import TMDBAuthCallback from "./Components/authentication/TMDBAuthCallback/TMDBAuthCallback";
import { ToastContainer } from "react-toastify";
import Ratings from "./Pages/Ratings";
import Favorites from "./Pages/Favorites";
import Watchlist from "./Pages/Watchlist";
import ForgetPassword from "./Components/authentication/ForgetPassword/ForgetPassword";
import VerifyPassword from "./Components/authentication/verifyCode/VerifyCode";
import FavoriteContextProvider from "./Components/Context/FavoriteContext";
import WatchlistContextProvider from "./Components/Context/WatchlistContext";

function App() {
  const queryClient = new QueryClient();

  const router = createHashRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "people",
          element: <People />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "topMovies",
          element: <TopMovies />,
        },
        {
          path: "upcomingMovies",
          element: <UpcomingMovies />,
        },
        {
          path: "popularMovies",
          element: <PopularMovies />,
        },
        {
          path: "topTvshows",
          element: <TopTvshows />,
        },
        {
          path: "upcomingTvshows",
          element: <UpcomingTvShows />,
        },
        {
          path: "popularTvshows",
          element: <PopularTvshows />,
        },
        {
          path: "details/:category/:id",
          element: <Details />,
        },
        {
          path: "forgetPassword",
          element: <ForgetPassword />,
        },
        {
          path: "verifyPassword",
          element: <VerifyPassword />,
        },
        {
          path: "generCategory/:category/:id",
          element: <GenerCategory />,
        },
        {
          path: "/seasonDetails/:seriesId/:seasonId",
          element: <SeasonDetails />,
        },
        {
          path: "peopleDetails/:peopleId",
          element: <PersonDetails />,
        },
        {
          path: "/tmdb-auth",
          element: <TMDBAuth />,
        },
        {
          path: "/approved",
          element: <TMDBAuthCallback />,
        },
        {
          path: "/ratings",
          element: <Ratings />,
        },
        {
          path: "/watchlist",
          element: <Watchlist />,
        },
        {
          path: "/favorites",
          element: <Favorites />,
        },
      ],
    },
  ]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <FavoriteContextProvider>
            <WatchlistContextProvider>
              <RouterProvider router={router} />
              <ToastContainer />
            </WatchlistContextProvider>
          </FavoriteContextProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
