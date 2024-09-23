import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { deleteRating, getRatedMedia } from "../Services/services/services";
import HeadingSection from "../Components/HeadingSection";
import MediaSwitcher from "../Components/MediaSwitcher/MediaSwitcher";
import MediaItemCard from "../Components/MediaItemCard/MediaItemCard";
import LoadingScreen from "../Components/LoadingScreen/LoadingScreen";
import PageTitle from "../Components/PageTitle/PageTitle";

export default function Ratings() {

  interface MediaItem {
    id: number;
    poster_path: string;
    title?: string;
    name?: string;
    overview: string;
    rating: number;
  }
  const [selectedCategory, setSelectedCategory] = useState("movie");
  const [Media, setMedia] = useState<MediaItem[]>([]);
  const sessionId = localStorage.getItem("session_id");
  const category = selectedCategory === "movie" ? "movies" : "tv";

  const { data: media , isLoading} = useQuery({
    queryKey: ["media", category, sessionId],
    queryFn: () => getRatedMedia(category, sessionId),
  });

  // Use useEffect to set the Media state when the media data is fetched
  useEffect(() => {
    if (media) {
      setMedia(media);
    }
  }, [media]);

  const handleDelete = async (itemId: number) => {
    const success = await deleteRating(selectedCategory, itemId, sessionId);
    if (success) {
      // Update the Media state by filtering out the deleted item
      setMedia((prevMedia) => prevMedia.filter((item) => item.id !== itemId));
    }
  };

  if(isLoading){
    return <LoadingScreen />
  }

  return (
    <>
    <PageTitle title={'My Ratings'}/>
    <section className="bg-[#111827] py-10 text-white">
      <div className="container mx-auto">
        <HeadingSection heading={"My Ratings"} />
        <MediaSwitcher
          setSelectedCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
        />
        <MediaItemCard selectedCategory={selectedCategory} WatchlistMedia={Media} handleDelete={handleDelete}/>
      </div>
    </section>
    </>
  );
}


