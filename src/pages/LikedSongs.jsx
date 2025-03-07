const LikedSongs = () => {
  const songs = [
    {
      title: "Believer",
      artist: "IMAGINE DRAGON",
      coverUrl: "src/assets/image1.png"
    },
    {
      title: "Shortwave",
      artist: "RYAN GRIGDRY",
      coverUrl: "src/assets/image2.png"
    },
    {
      title: "Dream On",
      artist: "ROGER TERRY",
      coverUrl: "src/assets/image3.png"
    },
    {
      title: "Origins",
      artist: "IMAGINE DRAGON",
      coverUrl: "src/assets/image4.png"
    },
    {
      title: "Tie Me Down",
      artist: "GRYFFIN",
      coverUrl: "src/assets/image5.png"
    },
    {
      title: "Chaff & Dust",
      artist: "HYONNA",
      coverUrl: "src/assets/image6.png"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0B0F18] px-6 py-8 text-white">
      {/* Header */}
      <header className="mb-8">
        <button className="mb-6 rounded-full p-2 hover:bg-white/10">
          <svg 
            className="h-6 w-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15 19l-7-7 7-7" 
            />
          </svg>
        </button>
        <h1 className="text-3xl font-semibold">Liked Songs</h1>
      </header>

      {/* Songs Grid */}
      <main className="pb-24">
        <div className="grid grid-cols-2 gap-x-4 gap-y-8">
          {songs.map((song, index) => (
            <div 
              key={index} 
              className="grid grid-rows-[1fr,auto] gap-y-3 text-center"
            >
              <div className="aspect-square w-full overflow-hidden rounded-xl">
                <img 
                  src={song.coverUrl} 
                  alt={`${song.title} by ${song.artist}`} 
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="grid gap-y-1">
                <h3 className="text-base font-medium text-white">{song.title}</h3>
                <p className="text-sm text-gray-400">{song.artist}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Player Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#1B1B1B]">
        <div className="grid grid-cols-[auto,1fr,auto] items-center gap-x-4 px-4 pb-6 pt-3">
          <img 
            src={songs[5].coverUrl}
            alt="Now playing" 
            className="h-12 w-12"
          />
          <div className="grid gap-y-0.5">
            <div className="text-sm font-medium">Chaff & Dust</div>
            <div className="text-xs text-gray-400">HYONNA</div>
          </div>
          <div className="grid grid-cols-3 gap-x-8">
            <button className="text-white/80 hover:text-white">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 6c.55 0 1 .45 1 1v10c0 .55-.45 1-1 1s-1-.45-1-1V7c0-.55.45-1 1-1zm3.66 6.82l5.77 4.07c.66.47 1.58-.01 1.58-.82V7.93c0-.81-.91-1.28-1.58-.82l-5.77 4.07c-.57.4-.57 1.24 0 1.64z"/>
              </svg>
            </button>
            <button className="text-white/80 hover:text-white">
              <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </button>
            <button className="text-white/80 hover:text-white">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7.58 16.89l5.77-4.07c.56-.4.56-1.24 0-1.63L7.58 7.11C6.91 6.65 6 7.12 6 7.93v8.14c0 .81.91 1.28 1.58.82zM16 7v10c0 .55.45 1 1 1s1-.45 1-1V7c0-.55-.45-1-1-1s-1 .45-1 1z"/>
              </svg>
            </button>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="h-1 w-full bg-gray-800">
          <div className="h-full w-1/3 bg-white"></div>
        </div>
      </div>
    </div>
  );
};

export default LikedSongs; 