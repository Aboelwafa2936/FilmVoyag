
import { useParams } from "react-router-dom";
import HeadingSection from "../HeadingSection";
import { useQuery } from "@tanstack/react-query";
import MovieCrad from "../movieCard/MovieCrad";
import Pagination from "../Pagination/Pagination";
import { getGenerCategory } from "../../Services/services/services";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { useFavorite } from "../Context/FavoriteContext";
import PageTitle from "../PageTitle/PageTitle";

export default function GenerCategory() {
  const { category, id } = useParams(); // Extract both category and id from URL params
  const cleanId = id ? id.replace(/^:/, "") : "";
  const cleanCategory = category ? category.replace(/^:/, "") : "";

  // State for managing the current page
  const { currentPage, setCurrentPage } = useFavorite();

  interface Movie {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
    vote_average: number;
    release_date?: string;
    first_air_date?: string;
  }

  const { data: movies = [], isLoading } = useQuery({
    queryKey: ["movies", cleanId, cleanCategory, currentPage],
    queryFn: () => getGenerCategory(cleanId, cleanCategory, currentPage),
    enabled: !!cleanId && !!cleanCategory, // only fetch if both id and category are defined
  });


  if (isLoading) {
    return <LoadingScreen />;
  }
  return (
    <>
      <PageTitle title={"FilmVoyag"} />
      <section className="py-10 bg-[#111827] text-white">
        <div className="container mx-auto">
          <HeadingSection
            heading={
              category === "movie"
                ? `Movies In This Category`
                : `TV Shows In This Category`
            }
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {movies.map((movie: Movie) => (
              <MovieCrad movie={movie} category={cleanCategory} />
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </section>
    </>
  );
}
