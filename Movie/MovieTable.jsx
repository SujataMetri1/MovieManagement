import React from "react";
import "./MovieTable.css";

function MovieTable({ movies }) {
  if (movies.length === 0) {
    return <p className="no-results">No movies found.</p>;
  }

  return (
    <div className="table-wrapper">
      <table className="movie-table">
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Year</th>
            <th>Cast</th>
            <th>Genres</th>
          </tr>
        </thead>
        <tbody>
          {movies.map(({ title, year, cast, genres, thumbnail }) => {
            const imageUrl =
              thumbnail ||
              `https://via.placeholder.com/60x90/004aad/ffffff?text=${encodeURIComponent(
                title.length > 10 ? title.slice(0, 10) + "…" : title
              )}`;

            return (
              <tr key={`${title}-${year}`}>
                <td className="thumb-cell">
                  <img
                    src={imageUrl}
                    alt={`${title} thumbnail`}
                    className="thumbnail"
                  />
                </td>
                <td className="title-cell">{title}</td>
                <td className="year-cell">{year}</td>
                <td className="cast-cell" title={cast.join(", ")}>
                  {cast.length > 3 ? cast.slice(0, 3).join(", ") + ", ..." : cast.join(", ")}
                </td>
                <td className="genres-cell">{genres.join(", ")}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default MovieTable;