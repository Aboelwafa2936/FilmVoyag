import React, { useState } from "react";
import HeadingSection from "../Components/HeadingSection";
import MediaSwitcher from "../Components/MediaSwitcher/MediaSwitcher";
import { Adding, getData } from "../Services/services/services";
import MediaItemCard from "../Components/MediaItemCard/MediaItemCard";
import LoadingScreen from "../Components/LoadingScreen/LoadingScreen";
import PageTitle from "../Components/PageTitle/PageTitle";

export default function Watchlist() {
  const [selectedCategory, setSelectedCategory] = useState("movie");
  const [isLoading, setIsLoading] = useState(false);
  const [watchlistMedia, setWatchlistMedia] = useState([]);
  const media = selectedCategory === "movie" ? "movies" : "tv";
  const sessionId = localStorage.getItem("session_id") ?? "";

  interface Item{
    id: number
  }

  // Function to handle deleting an item
  const handleDelete = async (id: number) => {
    try {
      // Call the API to delete the item from the watchlist
      await Adding(sessionId, selectedCategory, id, "watchlist", false);

      // Update the local state to remove the item
      setWatchlistMedia((prevMedia) =>
        prevMedia.filter((item: Item) => item.id !== id)
      );
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // Fetch watchlist media
  React.useEffect(() => {
    const fetchWatchlistMedia = async () => {
      setIsLoading(true);
      try {
        const data = await getData(sessionId, media, "watchlist");
        setWatchlistMedia(data);
      } catch (error) {
        console.error("Error fetching watchlist media:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWatchlistMedia();
  }, [sessionId, media]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <PageTitle title={"My Watchlist"} />
      <section className="py-10 bg-[#111827] text-white">
        <div className="container mx-auto">
          <HeadingSection heading={"My Watchlist"} />
          <MediaSwitcher
            setSelectedCategory={setSelectedCategory}
            selectedCategory={selectedCategory}
          />
          <MediaItemCard
            selectedCategory={selectedCategory}
            WatchlistMedia={watchlistMedia}
            handleDelete={handleDelete} // Pass handleDelete function
          />
        </div>
      </section>
    </>
  );
}
