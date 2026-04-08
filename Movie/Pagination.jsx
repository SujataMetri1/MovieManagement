import React from "react";
import "./Pagination.css";

function Pagination({ page, totalPages, setPage }) {
  if (totalPages <= 1) return null;

  const createPages = () => {
    const pages = [];

    let start = Math.max(1, page - 2);
    let end = Math.min(totalPages, page + 2);

    if (page <= 3) {
      end = Math.min(5, totalPages);
    } else if (page > totalPages - 3) {
      start = Math.max(1, totalPages - 4);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <nav className="pagination" aria-label="Page navigation">
      <button
        onClick={() => setPage(1)}
        disabled={page === 1}
        aria-label="Go to first page"
        className="page-btn"
      >
        {"<<"}
      </button>

      <button
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
        aria-label="Go to previous page"
        className="page-btn"
      >
        {"<"}
      </button>

      {createPages().map(p => (
        <button
          key={p}
          onClick={() => setPage(p)}
          className={`page-btn ${page === p ? "active" : ""}`}
          aria-current={page === p ? "page" : undefined}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}
        aria-label="Go to next page"
        className="page-btn"
      >
        {">"}
      </button>

      <button
        onClick={() => setPage(totalPages)}
        disabled={page === totalPages}
        aria-label="Go to last page"
        className="page-btn"
      >
        {">>"}
      </button>
    </nav>
  );
}

export default Pagination;