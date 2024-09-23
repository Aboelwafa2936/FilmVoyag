import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import axios from "axios";

const TMDB_API_KEY = "147fb75aaef345976c3c8c48676e7038";

function TMDBAuthCallback() {
  const [searchParams] = useSearchParams();
  const { setTmdbSessionId } = useAuth(); 
  const navigate = useNavigate();

  useEffect(() => {
    const createSession = async () => {
      const requestToken = searchParams.get("request_token");
      if (requestToken) {
        try {
          const response = await axios.post(
            `https://api.themoviedb.org/3/authentication/session/new?api_key=${TMDB_API_KEY}`,
            { request_token: requestToken }
          );
          setTmdbSessionId(response.data.session_id);
          navigate("/"); // Redirect after successful session creation
        } catch (error) {
          console.error("Error creating TMDB session:", error);
        }
      }
    };

    createSession();
  }, [searchParams, setTmdbSessionId, navigate]);

  return <div>Creating your session...</div>;
}

export default TMDBAuthCallback;
