'use client';

interface SavedLocationsProps {
  favorites: string[];
  onSelectCity: (city: string) => void;
  onRemoveCity: (city: string) => void;
}

const SavedLocationsComponent = ({ 
  favorites, 
  onSelectCity, 
  onRemoveCity 
}: SavedLocationsProps) => (
  <div className="bg-white rounded-lg text-black shadow-md p-6">
    <h2 className="text-xl font-semibold text-center mb-4">Saved Locations</h2>
    <hr className="mb-4" />
    
    {favorites.length == 0 ? (
      <p className="text-black text-center">No saved locations yet.</p>
    ) : (
      <ul className="space-y-2">
        {favorites.map((city, index) => (
          <li 
            key={index} 
            className="flex justify-between items-center p-2 text-black hover:bg-gray-50 rounded cursor-pointer"
          > 
            <button
              onClick={() => onRemoveCity(city)}
            >
              <img src="/goldStar.png" alt="filled Star" />
            </button>
            <span 
              onClick={() => onSelectCity(city)}
              className="pl-[50px]"
            >
              {city}
            </span>
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default SavedLocationsComponent;