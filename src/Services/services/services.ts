import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// API key constant
const API_KEY =  "ae525d27a8fab4d0a9a4155dc3e4d7ec";
export const baseUrl = "https://image.tmdb.org/t/p/original";


// getUpcomingMovies function
export async function getMovies() {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
}

// getPersonDetails function
interface getPersonDetailsProps {
  peopleId: string | undefined;
}
export async function getPersonDetails({ peopleId }: getPersonDetailsProps) {
  
  const response = await axios.get(
    `https://api.themoviedb.org/3/person/${peopleId}?api_key=${API_KEY}`
  );
  return response.data;
}

// getCredits function
interface getCreditsProps {
  peopleId: string | undefined;
}
export async function getCredits({ peopleId }: getCreditsProps) {
  const response = await axios.get(
    `https://api.themoviedb.org/3/person/${peopleId}/combined_credits?api_key=${API_KEY}`
  );
  return response.data.cast;
}

// getPeople function
export async function getPeople(page: number) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/person/popular?page=${page}&api_key=${API_KEY}`
    );

    return response.data.results;
  } catch (error) {
    console.log(error);
    return []; // Return an empty array to handle errors gracefully
  }
}

interface detailsProps {
  cleanCategory: string;
  cleanId: string;
}

// function to fetch media details
export const fetchDetails = async ({
  cleanCategory,
  cleanId,
}: detailsProps) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/${cleanCategory}/${cleanId}?api_key=${API_KEY}`
  );
  return response.data;
};

// function to fetch recommendation media
export const fetchRecommendations = async ({
  cleanCategory,
  cleanId,
}: detailsProps) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/${cleanCategory}/${cleanId}/recommendations?api_key=${API_KEY}`
  );
  return response.data.results;
};

export const fetchClips = async ({ cleanCategory, cleanId }: detailsProps) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/${cleanCategory}/${cleanId}/videos?api_key=${API_KEY}`
  );
  return response.data.results;
};

// Function to fetch movies by genre and page
export async function getGenerCategory(
  cleanId: string | undefined,
  categoryType: string | undefined,
  page: number
) {
  if (!cleanId || !categoryType) return [];
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/${categoryType}?with_genres=${cleanId}&language=en-US&page=${page}&api_key=${API_KEY}`
    );
    return response.data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
}

//
export async function getMedia(url: string, params?: object) {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/${url}`, {
      params: {
        api_key: `${API_KEY}`,
        ...params, // Spread the optional params if provided
      },
    });
    return response.data.results;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    throw error;
  }
}

// Fetch genres based on the type (movie/tv)
export async function getGenres(type: string) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${API_KEY}`
    );
    return response.data.genres;
  } catch (error) {
    console.error(error);
  }
}

// trending search function
export async function getTrending() {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}`);
    return response.data.results;
  } catch (error) {
    console.log(error);
  }

}

// Example: Search TMDB for movies, TV shows, or people
export const searchTMDB = async (query: string): Promise<any[]> => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${query}`
  );
  return response.data.results;
};

// Function to handle search result click
export const handleSearchResultClick = (result: any, navigate: (path: string) => void) => {
  const { id, media_type } = result;
  if (media_type === "person") {
    navigate(`peopleDetails/${id}`);
  } else {
    navigate(`/details/${media_type}/${id}`); // Redirect to details page
  }
};

// function to add ratings
export async function addRating(
  media: string,
  mediaId: string | null,
  rating: number,
  sessionId: string | null
) {
  try {
    const response = await axios.post(
      `https://api.themoviedb.org/3/${media}/${mediaId}/rating?api_key=${API_KEY}&session_id=${sessionId}`,
      { value: rating },
      {
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
      }
    );

    // Toast success notification
    toast.success("Rating submitted successfully!", {
      position: "top-right", // Use string values for positions
      autoClose: 3000, // Duration of the toast in milliseconds
    });

    return response.data;
  } catch (error: any) {
    console.error(
      "Error submitting rating:",
      error.response?.data || error.message
    );

    // Toast error notification
    toast.error("Failed to submit rating. Please try again.", {
      position: "top-right", // Use string values for positions
      autoClose: 5000, // Duration of the toast in milliseconds
    });
  }
}

// get my rated media function
export async function getRatedMedia(
  media: string,
  sessionId: string | null,
  page: number = 1,
  language: string = "en-US",
  sortBy: string = "created_at.asc"
) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/account/21472279/rated/${media}`,
      {
        params: {
          api_key: `${API_KEY}`,
          session_id: sessionId,
          page: page,
          language: language,
          sort_by: sortBy,
        },
      }
    );
    return response.data.results;
  } catch (error: any) {
    console.error(
      "Error fetching rated media:",
      error.response ? error.response.data : error.message
    );
  }
}

// function to delete rating
export async function deleteRating(
  media: string,
  seriesId: number,
  sessionId: string | null
) {
  try {
    const response = await axios.delete(
      `https://api.themoviedb.org/3/${media}/${seriesId}/rating`,
      {
        params: {
          api_key: `${API_KEY}`,
          session_id: sessionId,
        },
      }
    );

    // Check if the deletion was successful
    if (response.status === 200 || response.status === 204) {
      toast.success("Rating deleted successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      return true;
    } else {
      throw new Error("Failed to delete rating");
    }
  } catch (error) {
    console.error("Delete rating error:", error);
    toast.error("Failed to delete rating. Please try again.", {
      position: "top-right",
      autoClose: 5000,
    });
    return false;
  }
}

export async function Adding(sessionId: string, media: string, mediaId: number, type: string, condition: boolean) {
  
  try {
    // Correct URL construction
    const url = `https://api.themoviedb.org/3/account/21472279/${type}?session_id=${sessionId}&api_key=${API_KEY}`;

    // Send the POST request
    const response = await axios.post(
      url,
      {
        media_type: media,
        media_id: mediaId,
        [type]: condition, // Dynamically set favorite/watchlist based on type
      }
    );

    // Provide feedback based on the condition
    if (condition) {
      toast.success(`${media} added to your ${type} successfully!`, {
        position: "top-right",
        autoClose: 3000,
      });
    } else {
      toast.success(`${media} removed from your ${type} successfully!`, {
        position: "top-right",
        autoClose: 3000,
      });
    }

    return response.data; // Ensure the returned data matches the API response
  } catch (error) {
    console.error(error);
    toast.error(`Failed to update your ${type}.`, {
      position: "top-right",
      autoClose: 3000,
    });
  }
}


// function to get data from both watchlist and favorites
export async function getData(sessionId: string, media: string, type: string) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/account/21472279/${type}/${media}?api_key=${API_KEY}`,
      {
        params: {
          language: "en-US",
          page: 1,
          session_id: sessionId,
        },
      }
    );
    return response.data.results;
  } catch (error) {
    console.error(error);
    toast.error("Failed to fetch data.", {
      position: "top-right",
      autoClose: 3000,
    });
    throw new Error('Failed to fetch data');
  }
}


// function to get the movie/tv cast 
export async function getCast(media: string, mediaId: string) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/${media}/${mediaId}/credits?api_key=${API_KEY}`
    );
    return response.data.cast;
  } catch (error) {
    console.error(`Failed to fetch cast for ${media} with ID ${mediaId}`, error);
    return []; // Return empty array on error to prevent breaking the component
  }
}

// Combined function to handle adding/removing items from favorites or watchlist using context
export const handleItemToggle = (
  id: number, 
  sessionId: string, 
  category: string, 
  navigate: any, 
  items: number[], 
  userToken: string, 
  setItems: (items: number[]) => void, 
  actionType: string,
) => {

  
  const updatedItems = items.includes(id)
    ? items.filter((item) => item !== id)
    : [...items, id];

  setItems(updatedItems); // Update the context state

  // Sync with API
  if (userToken) {
    Adding(sessionId, category, id, actionType, !items.includes(id));
  } else {
    navigate("/login");
  }
};
