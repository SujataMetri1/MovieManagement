import React, { useEffect, useState, useMemo } from "react";
import "./App.css";
import Filters from "./Movie/Filters";
import MovieTable from "./Movie/MovieTable";
import Pagination from "./Movie/Pagination";

const API = "https://raw.githubusercontent.com/prust/wikipedia-movie-data/master/movies.json";

function App() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  const [search, setSearch] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);

  const perPage = 10;

  useEffect(() => {
    fetch(API)
      .then(res => res.json())
      .then(data => {
        setMovies(data);
        const genreSet = new Set();
        data.forEach(movie => movie.genres.forEach(g => genreSet.add(g)));
        setGenres([...genreSet].sort());
      })
      .catch(console.error);
  }, []);

  const filteredMovies = useMemo(() => {
    let data = movies;

    if (search.trim() !== "") {
      const lowerSearch = search.toLowerCase();
      data = data.filter(movie => movie.title.toLowerCase().includes(lowerSearch));
    }

    if (selectedGenres.length > 0) {
      data = data.filter(movie =>
        movie.genres.some(g => selectedGenres.includes(g))
      );
    }

    if (sort === "title") {
      data = [...data].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sort === "year") {
      data = [...data].sort((a, b) => a.year - b.year);
    }

    return data;
  }, [movies, search, selectedGenres, sort]);

  useEffect(() => {
   // setPage(1);
  }, [search, selectedGenres, sort]);

  const totalPages = Math.ceil(filteredMovies.length / perPage);

  const pageData = useMemo(() => {
    const startIndex = (page - 1) * perPage;
    return filteredMovies.slice(startIndex, startIndex + perPage);
  }, [filteredMovies, page]);

  return (
    <div className="container">
      <h1>🎬 Movie Explorer</h1>

      <Filters
        search={search}
        setSearch={setSearch}
        genres={genres}
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        sort={sort}
        setSort={setSort}
      />

      <MovieTable movies={pageData} />

      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
}

export default App;