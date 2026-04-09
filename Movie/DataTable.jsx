import React from "react";
import "./DataTable.css";

function DataTable({ data, rowActions = [] }) {
  if (!data.length) return <p>No records found</p>;

  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Year</th>
          <th>Cast</th>
          <th>Genres</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {data.map(row => (
          <tr key={row.id}>
            <td>{row.title}</td>
            <td>{row.year}</td>
            <td>{row.cast.slice(0, 3).join(", ")}</td>
            <td>{row.genres.join(", ")}</td>

            <td>
              {rowActions.map(action => (
                <button
                  key={action.label}
                  onClick={() => action.onClick(row)}
                >
                  {action.label}
                </button>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;