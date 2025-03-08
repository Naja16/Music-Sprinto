import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import LikedSongs from './pages/LikedSongs'
import MusicPlayer from './components/MusicPlayer'
import { MusicProvider } from "./context/MusicContext";

function App() {
  return (
    <MusicProvider>
      <MusicPlayer />
    </MusicProvider>
  );
}

export default App
