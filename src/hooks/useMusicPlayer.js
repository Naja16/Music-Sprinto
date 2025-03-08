import { useCallback } from "react";
import { useMusic } from "../context/MusicContext";

export function useMusicPlayer() {
  const { songs, currentSongIndex, isPlaying, audioRef, dispatch } = useMusic();

  const playSong = useCallback(
    (index) => {
      const song = songs[index];
      if (!song) return;

      if (currentSongIndex === index) {
        if (isPlaying) {
          audioRef.current.pause();
          dispatch({ type: "SET_IS_PLAYING", payload: false });
        } else {
          audioRef.current.play();
          dispatch({ type: "SET_IS_PLAYING", payload: true });
        }
      } else {
        audioRef.current.src = song.previewUrl;
        audioRef.current.play();
        dispatch({ type: "SET_CURRENT_SONG", payload: index });
        dispatch({ type: "SET_IS_PLAYING", payload: true });
      }
    },
    [songs, currentSongIndex, isPlaying, audioRef, dispatch]
  );

  const skipSong = useCallback(
    (direction) => {
      if (songs.length === 0) return;
      let newIndex =
        direction === "next" ? currentSongIndex + 1 : currentSongIndex - 1;

      if (newIndex < 0) newIndex = songs.length - 1;
      if (newIndex >= songs.length) newIndex = 0;

      playSong(newIndex);
    },
    [songs, currentSongIndex, playSong]
  );

  return {
    playSong,
    skipSong,
  };
}
