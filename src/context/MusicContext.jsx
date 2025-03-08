import { createContext, useContext, useReducer, useRef } from "react";

const MusicContext = createContext();

const initialState = {
  songs: [],
  currentSongIndex: null,
  isPlaying: false,
  isLoading: false,
  error: null,
};

function musicReducer(state, action) {
  switch (action.type) {
    case "SET_SONGS":
      return { ...state, songs: action.payload, isLoading: false };
    case "SET_CURRENT_SONG":
      return { ...state, currentSongIndex: action.payload };
    case "SET_IS_PLAYING":
      return { ...state, isPlaying: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: true };
    case "SET_ERROR":
      return { ...state, error: action.payload, isLoading: false };
    default:
      return state;
  }
}

export function MusicProvider({ children }) {
  const [state, dispatch] = useReducer(musicReducer, initialState);
  const audioRef = useRef(new Audio());

  const value = {
    ...state,
    dispatch,
    audioRef,
  };

  return (
    <MusicContext.Provider value={value}>{children}</MusicContext.Provider>
  );
}

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useMusic must be used within a MusicProvider");
  }
  return context;
};
