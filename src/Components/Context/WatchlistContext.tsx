import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { getData } from "../../Services/services/services";
import { useAuth } from "./AuthContext";

interface WatchlistContextType {
  watchlistItems: number[];
  setWatchlistItems: Dispatch<SetStateAction<number[]>>;
}

export const WatchlistContext = createContext<WatchlistContextType | undefined>(
  undefined
);

export function useWatchlist() {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error("useWatchlist must be used within a WatchlistContextProvider");
  }
  return context;
}

interface WatchlistProviderProps {
  children: ReactNode;
}

export default function WatchlistContextProvider({
  children,
}: WatchlistProviderProps) {
  const sessionId = localStorage.getItem('session_id');
  const { userToken } = useAuth();
  const [watchlistItems, setWatchlistItems] = useState<number[]>([]);
  useEffect(() => {
    const fetchWatchlist = async () => {
      if (sessionId && userToken) {
        try {
          const watchlistMovies = await getData(sessionId, "movies", "watchlist");
          const watchlistTVShows = await getData(sessionId, "tv", "watchlist");
          const allWatchlistItems = [...watchlistMovies, ...watchlistTVShows];
          setWatchlistItems(allWatchlistItems);
        } catch (err) {
          console.log(err);
        }
      }
    };

    fetchWatchlist();
  }, [sessionId, userToken]);

  return (
    <WatchlistContext.Provider
      value={{ watchlistItems, setWatchlistItems }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}

