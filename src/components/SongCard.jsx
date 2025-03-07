const SongCard = ({ title, artist, coverUrl }) => {
  return (
    <div className="group cursor-pointer transition-transform duration-200 hover:scale-105">
      <div className="relative aspect-square overflow-hidden rounded-lg">
        <img 
          src={coverUrl} 
          alt={`${title} by ${artist}`} 
          className="h-full w-full object-cover"
        />
      </div>
      <div className="mt-2">
        <h3 className="text-sm font-semibold text-white">{title}</h3>
        <p className="text-xs text-gray-400">{artist}</p>
      </div>
    </div>
  );
};

export default SongCard; 