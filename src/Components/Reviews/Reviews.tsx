import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import HeadingSection from "../HeadingSection";

interface getReviewsProps {
  category: string | undefined;
  id: string | undefined;
}

export default function Reviews({ category, id }: getReviewsProps) {
  
  async function getReviews() {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/${category}/${id}/reviews?api_key=ae525d27a8fab4d0a9a4155dc3e4d7ec`
      );
      return response.data.results;
    } catch (error) {
      throw new Error("Failed to fetch reviews.");
    }
  }

  const { data: reviews, isError } = useQuery({
    queryKey: ["reviews", category, id],
    queryFn: getReviews,
  });
  

  interface author_details{
    avatar_path: string
  }

  interface review{
    author: string,
    content: string,
    created_at: string,
    author_details: author_details,
    id: number
  }

  if (isError) {
    return <p className="text-white">Failed to load reviews. Please try again later.</p>;
  }

  return (
    <>
      <HeadingSection heading={"Reviews"} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {reviews?.length ? (
          reviews.map((review: review) => {
            const profilePic = review.author_details.avatar_path
              ? `https://image.tmdb.org/t/p/w200${review.author_details.avatar_path}`
              : "https://via.placeholder.com/58";

            const formattedDate = new Intl.DateTimeFormat("en-GB", {
              year: "numeric",
              month: "short",
            }).format(new Date(review.created_at));

            return (
              <div key={review.id} className="bg-[#111827] text-white rounded-lg p-6 shadow-lg flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={profilePic}
                    alt={review.author}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <h5 className="text-lg font-semibold">{review.author}</h5>
                    <p className="text-sm text-gray-400">{formattedDate}</p>
                  </div>
                </div>
                <p className="text-gray-300 line-clamp-3">{review.content}</p>
              </div>
            );
          })
        ) : (
          <p className="text-white">No reviews available.</p>
        )}
      </div>
    </>
  );
}

