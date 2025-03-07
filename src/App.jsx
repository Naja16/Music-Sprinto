import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import LikedSongs from './pages/LikedSongs'
import MusicPlayer from './components/MusicPlayer'

function App() {
  return (
    <div className="relative min-h-screen">
      <MusicPlayer />
    </div>
  )
}

export default App
