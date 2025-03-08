import { useEffect } from "react";
import { useMusic } from "../context/MusicContext";

const ITUNES_API_URL = "/api/itunes";

export function useFetchSongs() {
  const { dispatch } = useMusic();

  useEffect(() => {
    const fetchSongs = async () => {
      dispatch({ type: "SET_LOADING" });
      try {
        const response = await fetch(ITUNES_API_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch songs");
        }
        const data = await response.json();
        dispatch({ type: "SET_SONGS", payload: data.results.slice(0, 14) });
      } catch (err) {
        console.error("Error fetching songs:", err);
        dispatch({ type: "SET_ERROR", payload: err.message });
      }
    };

    fetchSongs();
  }, [dispatch]);
}
