'use client';

interface RecentSearchesProps {
  searches: string[];
  onSelectCity: (city: string) => void;
}

const RecentSearchComponent = ({ searches, onSelectCity }: RecentSearchesProps) => (
  <div className="bg-white rounded-[50px] text-black p-6">

    
    {searches.length == 0 ? (
      <p className="text-black text-center">No recent searches.</p>
    ) : (
      <ul className="space-y-2">
        {searches.map((city, index) => (
          <li 
            key={index} 
            className="p-2 cursor-pointer"
            onClick={() => onSelectCity(city)}
          >
            {city}
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default RecentSearchComponent;