import { useState, useEffect } from "react";
import HeadingSection from "../Components/HeadingSection";
import MediaSwitcher from "../Components/MediaSwitcher/MediaSwitcher";
import MediaItemCard from "../Components/MediaItemCard/MediaItemCard";
import { Adding, getData } from "../Services/services/services";
import LoadingScreen from "../Components/LoadingScreen/LoadingScreen";
import PageTitle from "../Components/PageTitle/PageTitle";

export default function Favorites() {
  const [selectedCategory, setSelectedCategory] = useState("movie");
  const [favoriteMedia, setFavoriteMedia] = useState([]); // Adjust the type if you have a specific type
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const sessionId = localStorage.getItem("session_id") ?? "";
  const category = selectedCategory === "movie" ? "movies" : "tv";

  // Fetch favorite media
  useEffect(() => {
    const fetchFavoriteMedia = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getData(sessionId, category, "favorite"); // Adjust 'watchlist' to 'favorites' if needed
        setFavoriteMedia(data);
      } catch (error: any) {
        console.error("Error fetching favorite media:", error);
        setError(error.message || "Error fetching favorite media");
      } finally {
        setIsLoading(false);
      }
    };

    if (sessionId) {
      fetchFavoriteMedia();
    } else {
      setError("No session ID found");
      setIsLoading(false);
    }
  }, [sessionId, category]);

  interface Item{
    id: number
  }

  // Handle deleting an item
  const handleDelete = async (id: number) => {
    try {
      await Adding(sessionId, selectedCategory, id, "favorite", false); // Remove from API

      // Update state
      setFavoriteMedia((prevMedia) =>
        prevMedia.filter((item: Item) => item.id !== id)
      );

      // Remove from local storage (assuming favorites are just IDs)
      const storedFavorites = JSON.parse(
        localStorage.getItem("favoriteItems") || "[]"
      );

      const updatedFavorites = storedFavorites.filter(
        (item: number) => item !== id
      );


      localStorage.setItem("favoriteItems", JSON.stringify(updatedFavorites));
    } catch (error: any) {
      console.error("Error deleting item:", error);
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <PageTitle title={"My Favorites"} />
      <section className="py-10 text-white bg-[#111827]">
        <div className="container mx-auto">
          <HeadingSection heading="My Favorites" />
          <MediaSwitcher
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <MediaItemCard
            WatchlistMedia={favoriteMedia}
            selectedCategory={selectedCategory}
            handleDelete={handleDelete}
          />
        </div>
      </section>
    </>
  );
}
