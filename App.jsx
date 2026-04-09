import React, { useEffect, useState, useMemo } from "react";
import "./App.css";
import Filters from "./Movie/Filters";
import Pagination from "./Movie/Pagination";
import DataTable from "./Movie/DataTable";

const API = "https://raw.githubusercontent.com/prust/wikipedia-movie-data/master/movies.json";

function App() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);

  const [activeMovie, setActiveMovie] = useState(null);
  const [mode, setMode] = useState(null); 

  const perPage = 10;

  useEffect(() => {
    fetch(API)
      .then(res => res.json())
      .then(data => {
        const withId = data.map((m, i) => ({ ...m, id: i + 1 }));
        setMovies(withId);

        const genreSet = new Set();
        withId.forEach(m => m.genres.forEach(g => genreSet.add(g)));
        setGenres([...genreSet].sort());
      });
  }, []);

  useEffect(() => {
//setPage(1);
  }, [search, selectedGenres, sort]);

  const filteredMovies = useMemo(() => {
    let data = movies;

    if (search) {
      data = data.filter(m =>
        m.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedGenres.length) {
      data = data.filter(m =>
        m.genres.some(g => selectedGenres.includes(g))
      );
    }

    if (sort === "title") {
      data = [...data].sort((a, b) => a.title.localeCompare(b.title));
    }

    if (sort === "year") {
      data = [...data].sort((a, b) => a.year - b.year);
    }

    return data;
  }, [movies, search, selectedGenres, sort]);

  const totalPages = Math.ceil(filteredMovies.length / perPage);

  const pageData = useMemo(() => {
    const start = (page - 1) * perPage;
    return filteredMovies.slice(start, start + perPage);
  }, [filteredMovies, page]);

  
  const rowActions = [
    {
      label: "View",
      onClick: (row) => {
        setActiveMovie({ ...row });
        setMode("view");
      }
    },
    {
      label: "Edit",
      onClick: (row) => {
        setActiveMovie({ ...row });
        setMode("edit");
      }
    },
    {
      label: "Delete",
      onClick: (row) => {
        setActiveMovie(row);
        setMode("delete");
      }
    }
  ];

  const handleSave = () => {
    setMovies(movies.map(m => m.id === activeMovie.id ? activeMovie : m));
    setMode("view");
  };

  const handleDelete = () => {
    setMovies(movies.filter(m => m.id !== activeMovie.id));
    setActiveMovie(null);
    setMode(null);
  };

  return (
    <div className="container">
      <h1 style={{textAlign:"center"}}>🎬 Movie Explorer</h1>

      <Filters
        search={search}
        setSearch={setSearch}
        genres={genres}
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        sort={sort}
        setSort={setSort}
      />

      <div className="layout">
        <DataTable data={pageData} rowActions={rowActions} />

        
        {activeMovie && (
          <div className="side-panel">

            {mode === "view" && (
              <>
                <h2>{activeMovie.title}</h2>
                <p><b>Year:</b> {activeMovie.year}</p>
                <p><b>Cast:</b> {activeMovie.cast.join(", ")}</p>
                <p><b>Genres:</b> {activeMovie.genres.join(", ")}</p>

                <button onClick={() => setMode("edit")}>Edit</button>
                <button onClick={() => setMode("delete")}>Delete</button>
                <button onClick={() => setActiveMovie(null)}>Close</button>
              </>
            )}

            {mode === "edit" && (
              <>
                <h2>Edit Movie</h2>

                <input
                  value={activeMovie.title}
                  onChange={(e) =>
                    setActiveMovie({ ...activeMovie, title: e.target.value })
                  }
                />

                <input
                  type="number"
                  value={activeMovie.year}
                  onChange={(e) =>
                    setActiveMovie({ ...activeMovie, year: +e.target.value })
                  }
                />

                <input
                  value={activeMovie.cast.join(", ")}
                  onChange={(e) =>
                    setActiveMovie({
                      ...activeMovie,
                      cast: e.target.value.split(",").map(s => s.trim())
                    })
                  }
                />

                <input
                  value={activeMovie.genres.join(", ")}
                  onChange={(e) =>
                    setActiveMovie({
                      ...activeMovie,
                      genres: e.target.value.split(",").map(s => s.trim())
                    })
                  }
                />

                <button onClick={handleSave}>Save</button>
                <button onClick={() => setMode("view")}>Cancel</button>
              </>
            )}
            {mode === "delete" && (
              <>
                <p>Delete <b>{activeMovie.title}</b>?</p>
                <button onClick={handleDelete}>Yes Delete</button>
                <button onClick={() => setMode("view")}>Cancel</button>
              </>
            )}

          </div>
        )}
      </div>

      <Pagination page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
}

export default App;