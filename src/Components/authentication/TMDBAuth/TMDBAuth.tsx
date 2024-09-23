import { useEffect, useState } from "react";
import axios from "axios";
import { ImSpinner9 } from "react-icons/im";
import { useNavigate, Link } from "react-router-dom";
import LoadingScreen from "../../LoadingScreen/LoadingScreen";
import { getData } from "../../../Services/services/services";
import { useFavorite } from "../../Context/FavoriteContext";
import { useWatchlist } from "../../Context/WatchlistContext";
import PageTitle from "../../PageTitle/PageTitle";

const TMDB_API_KEY = "ae525d27a8fab4d0a9a4155dc3e4d7ec";

function TMDBAuth() {
  const [requestToken, setRequestToken] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setFavoriteItems } = useFavorite();
  const { setWatchlistItems } = useWatchlist();

  // Step 1: Create a request token
  useEffect(() => {
    const fetchRequestToken = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/authentication/token/new?api_key=${TMDB_API_KEY}`
        );
        setRequestToken(response.data.request_token);
      } catch (error: any) {
        console.error("Error creating request token:", error.response?.data || error.message);
      }
    };

    fetchRequestToken();
  }, []);

  // Step 2: Validate the request token with user login
  const validateWithLogin = async () => {
    if (!requestToken) {
      console.error("Request token is not available.");
      return;
    }

    if (!username || !password) {
      console.error("Username and password must be provided.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${TMDB_API_KEY}`,
        {
          username,
          password,
          request_token: requestToken,
        }
      );

      if (response.status === 200) {
        console.log("Login successful");
        await createSession(response.data.request_token);
        navigate("/");
      } else {
        console.error("Validation failed:", response.data);
      }
    } catch (error: any) {
      console.error(
        "Error validating token with login:",
        error.response?.data || error.message
      );
    } finally {
      setIsLoading(false);
    }
  };

// Step 3: Create a session ID and fetch data
const createSession = async (validatedRequestToken: string) => {
  try {
    const response = await axios.post(
      `https://api.themoviedb.org/3/authentication/session/new?api_key=${TMDB_API_KEY}`,
      {
        request_token: validatedRequestToken,
      }
    );

    const sessionId = response.data.session_id;

    // Store the session ID in local storage
    localStorage.setItem("session_id", sessionId);

    // Call a new function to refetch data immediately after setting session
    await refetchUserData(sessionId);
  } catch (error: any) {
    console.error(
      "Error creating session ID or fetching data:",
      error.response?.data || error.message
    );
  }
};

// Refetch user data after login
const refetchUserData = async (sessionId: string) => {
  try {
    // Fetch both movie and TV favorites
    const favoriteMovies = await getData(sessionId, "movies", "favorite");
    const favoriteTVShows = await getData(sessionId, "tv", "favorite");

    // Fetch both movie and TV watchlist items
    const watchlistMovies = await getData(sessionId, "movies", "watchlist");
    const watchlistTVShows = await getData(sessionId, "tv", "watchlist");

    // Combine movie and TV data into one list
    const allFavoriteItems = [...favoriteMovies, ...favoriteTVShows];
    const allWatchlistItems = [...watchlistMovies, ...watchlistTVShows];

    // Update context state with the combined lists
    setFavoriteItems(allFavoriteItems);
    setWatchlistItems(allWatchlistItems);

  } catch (error: any) {
    console.error("Error fetching user data:", error.response?.data || error.message);
  }
};


  return (
    <div>
      <PageTitle title={'TMDB Login'}/>
      {!requestToken && <LoadingScreen />}
      {requestToken && (
        <section className="py-10 bg-[#111827]">
          <div className="container mx-auto">
            <h1 className="text-2xl font-semibold text-center text-white">
              Welcome to TMDB authentication
            </h1>
            <p className="mt-2 text-xl text-center text-gray-200">
              We are <span className="text-[#6028ff]">Happy</span> to see you
              back
            </p>
            <form className="w-full md:w-1/2 mx-auto text-center py-5">
              <label
                htmlFor="username"
                className="block text-start mb-2 text-sm text-gray-200"
              >
                Username
              </label>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full mb-5 px-4 py-2 rounded-lg bg-gray-900 text-gray-300 border-gray-600 border focus:border-primary focus:border-primary focus:outline-none focus:ring focus:ring-primary placeholder-gray-400 focus:ring-opacity-20"
              />

              <label
                htmlFor="password"
                className="block text-start mb-2 text-sm text-gray-200"
              >
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mb-5 px-4 py-2 rounded-lg bg-gray-900 text-gray-300 border-gray-600 border focus:border-primary focus:border-primary focus:outline-none focus:ring focus:ring-primary placeholder-gray-400 focus:ring-opacity-20"
              />

              <button
                type="button"
                className="w-full text-white bg-[#6028ff] p-2 rounded-md disabled:bg-gray-500"
                disabled={isLoading}
                onClick={validateWithLogin}
              >
                Sign in{" "}
                {isLoading && (
                  <ImSpinner9 className="inline-block animate-spin ml-2" />
                )}
              </button>
              <div className="mt-5 flex items-center gap-x-2 justify-center">
                <span className="block bg-gray-600 h-[2px] w-[5rem]"></span>
                <Link to={"https://www.themoviedb.org/signup"}>
                  <span className="text-xs uppercase text-gray-400 hover:underline">
                    Don't have an account on tmdb?
                    <br /> Sign up now
                  </span>
                </Link>
                <span className="block bg-gray-600 h-[2px] w-[5rem]"></span>
              </div>
            </form>
          </div>
        </section>
      )}
    </div>
  );
}

export default TMDBAuth;
