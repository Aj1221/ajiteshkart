import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import './Filter.css';

const Filter = ({ setFilteredCategory, onSearchResults }) => {
  const categories = ['All', "men's clothing", "women's clothing", 'jewelery', 'electronics'];

  const handleFilterChange = (event) => {
    setFilteredCategory(event.target.value);
  };

  const handleSearchResults = (query) => {
    onSearchResults(query);
  };

  return (
    <div className="filter-container">
      <label htmlFor="categoryFilter" className="filter-label">
        Filter by Category:
      </label>
      <select
        id="categoryFilter"
        onChange={handleFilterChange}
        className="filter-select"
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <SearchBar onSearchResults={handleSearchResults} />
    </div>
  );
};

export default Filter;
