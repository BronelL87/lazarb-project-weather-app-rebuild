'use client';

import { useState, useRef } from 'react';
import RecentSearchComponent from './RecentSearchComponent';

interface SearchBarProps {
  onSearch: (city: string) => void;
  recentSearches: string[];
  onSelectRecentSearch: (city: string) => void;
}

const SearchBarComponent = ({ onSearch, recentSearches, onSelectRecentSearch }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const searchBarRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
      setFocused(false); // Hide recent searches after searching
    }
  };

  return (
    <div className="relative w-[480px]" ref={searchBarRef}>
      <form
        className="flex items-center h-[65px] relative"
        onSubmit={handleSubmit}
      >
        <button type="submit" className="absolute">
          <img className="pl-3" src="/magGlass.png" alt="Search Icon" />
        </button>

        <input
          type="text"
          className="w-full p-5 pl-[80px] pr-12 text-black bg-white rounded-[50px]"
          placeholder="Search location"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 200)} // Delay to allow clicking recent searches
        />
      </form>

      {focused && recentSearches.length > 0 && (
        <div className="absolute w-full mt-2 bg-white shadow-lg rounded-lg z-10">
          <RecentSearchComponent searches={recentSearches} onSelectCity={onSelectRecentSearch} />
        </div>
      )}
    </div>
  );
};

export default SearchBarComponent;