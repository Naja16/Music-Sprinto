import { useEffect, useState } from 'react';
import { Pause, Play } from 'lucide-react';

const DEEZER_API_URL = '/api/deezer';


export default function MusicPlayer() {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useState(new Audio())[0];

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch(`${DEEZER_API_URL}}`, {
          headers: {
            'Content-Type': 'application/json',
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("data", data.results[0])
        setSongs(data.results.slice(0, 10)); // Limit to 10 songs
      } catch (error) {
        console.error('Error fetching from Deezer:', error);
      }
    };

    fetchSongs();
  }, []);

  const playSong = (song) => {
    if (currentSong?.trackNumber === song.trackNumber) {
      if (isPlaying) {
        audioRef.pause();
      } else {
        audioRef.play();
      }
      setIsPlaying(!isPlaying);
      console.log("currentSong", currentSong)
    } else {
      audioRef.src = song.previewUrl; // 30s preview from Deezer
      audioRef.play();
      setCurrentSong(song);
      setIsPlaying(true);
    }
  };
  return (
    <div className="p-4 max-w-4xl mx-auto bg-black text-white">
      <h1 className="text-3xl font-bold mb-4 text-center">Music Player</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {songs.map((song, index) => (
          <div key={index} className="p-4 bg-gray-900 rounded-lg shadow-lg flex items-center space-x-4">
            <img
              src={song.artworkUrl30}
              alt={song.trackName}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div className="flex-1">
              <span className="block font-medium text-lg truncate">{song.trackName}</span>
              <span className="block text-sm text-gray-400 truncate">{song.artistName}</span>
            </div>
            <button
              onClick={() => playSong(song)}
              className="p-2 bg-green-500 rounded-full hover:bg-green-600 transition"
            >
              {currentSong?.trackNumber === song.trackNumber && isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
