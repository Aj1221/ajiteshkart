import React, { useState } from 'react';
import './SearchBar.css'; 

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const SearchBar = ({ onSearchResults }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (query) => {
    onSearchResults(query); 
  };

  const debouncedSearch = debounce(handleSearch, 300); 

  const handleChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    debouncedSearch(newQuery); 
  };

  return (
    <input
      type="text"
      placeholder="Search products..."
      value={query}
      onChange={handleChange}
      className="border rounded p-2 w-full"
    />
  );
};

export default SearchBar;
