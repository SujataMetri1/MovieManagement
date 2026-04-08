import React from "react";
import "./Filters.css";

function Filters({ search, setSearch, genres, selectedGenres, setSelectedGenres, sort, setSort }) {
  const handleGenreChange = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter(g => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  return (
    <div className="filters">
      <input
        type="text"
        placeholder="Search by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <div className="genres-filter">
        <span>Filter by Genre:</span>
        <div className="genres-list">
          {genres.map(genre => (
            <label key={genre} className="genre-item">
              <input
                type="checkbox"
                checked={selectedGenres.includes(genre)}
                onChange={() => handleGenreChange(genre)}
              />
              {genre}
            </label>
          ))}
        </div>
      </div>

      <select
        className="sort-select"
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        aria-label="Sort movies"
      >
        <option value="">Sort By</option>
        <option value="title">Title (A-Z)</option>
        <option value="year">Year (Ascending)</option>
      </select>
    </div>
  );
}

export default Filters;