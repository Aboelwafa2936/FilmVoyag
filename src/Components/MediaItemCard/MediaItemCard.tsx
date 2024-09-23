import { baseUrl } from "../../Services/services/services";
import { Link } from "react-router-dom";

interface Item {
  id: number;
  poster_path: string;
  title?: string;
  name?: string;
  overview: string;
  rating?: number;
  vote_average?: number;
}

interface MediaItemCardProps {
  WatchlistMedia: Item[]; // Array of media items
  selectedCategory: string; // Either "movie" or "tv"
  handleDelete: (id: number) => void; // Function to handle delete with media ID
}

export default function MediaItemCard({
  WatchlistMedia,
  selectedCategory,
  handleDelete,
}: MediaItemCardProps) {


  return (
    <>
      {WatchlistMedia && WatchlistMedia.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 mt-8">
          {WatchlistMedia.map((item: Item) => (
            <div
              key={item.id}
              className="bg-gray-800 rounded-lg shadow-lg overflow-hidden"
            >
              <Link to={`/details/${selectedCategory}/${item.id}`}>
                <img
                  src={baseUrl + item.poster_path}
                  className="w-full md:h-70 object-cover transition-transform duration-300 hover:scale-105"
                  alt={item.title || item.name}
                />
              </Link>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 truncate">
                  {item.name || item.title}
                </h3>
                <p className="text-sm text-gray-400 line-clamp-2 mb-4">
                  {item.overview || "No description available"}
                </p>

                {/* User Rating Section */}
                <div className="flex items-center justify-between mt-4">
                  <p className="text-gray-200 font-medium">
                    {item.rating ? "Your Rating:" : "Rating"}
                  </p>
                  <span className="text-yellow-400 text-lg font-bold">
                    {item.rating ? `${item.rating}/10` : `${item.vote_average}`}
                  </span>
                </div>

                {/* Delete button */}
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-rose-500 text-white w-full mt-5 p-1 rounded-lg hover:bg-white hover:text-rose-500 transition-all duration-500"
                >
                  Delete {selectedCategory === "tv" ? "TV show" : "movie"}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center mt-12">
          <p className="text-gray-400">No items available</p>
        </div>
      )}
    </>
  );
}
