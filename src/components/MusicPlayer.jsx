import { useEffect, useState } from "react";
import { Pause, Play, SkipBack, SkipForward } from "lucide-react";

const ITUNES_API_URL = "https://itunes.apple.com/search?term=top&media=music&limit=10";

export default function MusicPlayer() {
  const [songs, setSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useState(new Audio())[0];

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch(ITUNES_API_URL);
        if (!response.ok) {
          throw new Error("Failed to fetch songs");
        }
        const data = await response.json();
        setSongs(data.results.slice(0, 8));
      } catch (err) {
        console.error("Error fetching songs:", err);
      }
    };

    fetchSongs();
  }, []);

  const playSong = (index) => {
    const song = songs[index];
    if (!song) return;
    if (currentSongIndex === index) {
      if (isPlaying) {
        audioRef.pause();
      } else {
        audioRef.play();
      }
      setIsPlaying(!isPlaying);
    } else {
      audioRef.src = song.previewUrl;
      audioRef.play();
      setCurrentSongIndex(index);
      setIsPlaying(true);
    }
  };

  const skipSong = (direction) => {
    if (songs.length === 0) return;
    let newIndex =
      direction === "next" ? currentSongIndex + 1 : currentSongIndex - 1;
    if (newIndex < 0) newIndex = songs.length - 1;
    if (newIndex >= songs.length) newIndex = 0;
    playSong(newIndex);
  };
  return (
    <div className="p-4 max-w-md mx-auto bg-[#0D1117] text-white rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Liked Songs</h1>
      <div className="grid grid-cols-2 gap-4">
        {songs.map((song, index) => (
          <div
            key={index}
            className="p-2 rounded-lg shadow-md flex flex-col items-center"
            onClick={() => playSong(index)}
          >
            <img
              src={song.artworkUrl100 || "https://via.placeholder.com/100"}
              alt={song.trackName}
              className="w-32 h-32 object-cover rounded-md"
            />
            <div className="text-center mt-2 w-32">
              <span className="block font-medium text-sm truncate w-full group-hover:overflow-visible group-hover:whitespace-normal relative">
                {song.trackName}
                <span className="absolute left-0 right-0 bottom-full bg-black text-white text-xs rounded-md p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {song.trackName}
                </span>
              </span>
              <span className="block text-xs text-gray-400 truncate">
                {song.artistName}
              </span>
            </div>
          </div>
        ))}
      </div>
      {currentSongIndex !== null && (
        <div className="fixed bottom-0 left-0 w-full bg-[#161B22] p-4 flex items-center justify-between shadow-lg z-10 left-0">
          <div className="flex items-center space-x-4">
            <img
              src={songs[currentSongIndex].artworkUrl100}
              alt={songs[currentSongIndex].trackName}
              className="w-16 h-16 object-cover rounded-md"
            />
            <div>
              <span className="block font-medium text-lg truncate w-40">
                {songs[currentSongIndex].trackName}
              </span>
              <span className="block text-sm text-gray-400">
                {songs[currentSongIndex].artistName}
              </span>
            </div>
          </div>
          <div className="flex space-x-4">
            <button onClick={() => skipSong("prev")} className="text-white p-1">
              <SkipBack size={20} />
            </button>
            <button
              onClick={() => playSong(currentSongIndex)}
              className="text-white"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
            <button onClick={() => skipSong("next")} className="text-white">
              <SkipForward size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
