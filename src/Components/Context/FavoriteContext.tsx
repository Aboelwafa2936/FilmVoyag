import { createContext, Dispatch, SetStateAction, useContext, useState, ReactNode, useEffect } from "react";
import { getData } from "../../Services/services/services";
import { useAuth } from "./AuthContext";

interface FavoriteContextType {
  favoriteItems: number[];
  setFavoriteItems: Dispatch<SetStateAction<number[]>>;
  loading: boolean;
  error: string | null;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  currentPage: number;
}

export const FavoriteContext = createContext<FavoriteContextType | undefined>(
  undefined
);

export function useFavorite() {
  const context = useContext(FavoriteContext);
  if (!context) {
    throw new Error("useFavorite must be used within a FavoriteContextProvider");
  }
  return context;
}

interface FavoriteProviderProps {
  children: ReactNode;
}

export default function FavoriteContextProvider({ children }: FavoriteProviderProps) {
  const sessionId = localStorage.getItem('session_id'); 
  const { userToken } = useAuth();
  const [favoriteItems, setFavoriteItems] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage , setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (sessionId && userToken) {
        try {
          setLoading(true);
          const favoriteMovies = await getData(sessionId, "movies", "favorite");
          const favoriteTVShows = await getData(sessionId, "tv", "favorite");

          const allFavoriteItems = [...favoriteMovies, ...favoriteTVShows];
          setFavoriteItems(allFavoriteItems);
        } catch (err) {
          setError("Failed to fetch favorites");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchFavorites();
  }, [sessionId, userToken]);

  return (
    <FavoriteContext.Provider value={{ favoriteItems, setFavoriteItems, loading, error , setCurrentPage , currentPage}}>
      {children}
    </FavoriteContext.Provider>
  );
}
