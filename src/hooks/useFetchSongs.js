import { useEffect } from "react";
import { useMusic } from "../context/MusicContext";
import { SONGS_LIST } from "../constants/songsList";

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
    const fetchMockSongs = () => {
      setTimeout(() => {
        try {
          dispatch({ type: "SET_SONGS", payload: SONGS_LIST });
        } catch (err) {
          console.error("Error loading mock songs:", err);
          dispatch({ type: "SET_ERROR", payload: "Failed to load songs" });
        }
      }, 100);
    };
    fetchMockSongs();
  }, [dispatch]);
}
