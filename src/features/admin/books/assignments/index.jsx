import { useState } from "react";

function searchTitle(assignment, query) {
  return assignment.title.toLowerCase().includes(query.toLowerCase());
}

function searchGenre(assignment, query) {
  return assignment.genres.filter((genre) =>
    genre.toLowerCase().includes(query.toLowerCase())
  );
}

function search(assignments, query) {
  if (query.length < 3) return assignments;
  return assignments.filter(
    (assignment) =>
      searchTitle(assignment, query) || searchGenre(assignment, query)
  );
}

export default function AdminBookAssignments({ bookAssignments = [] }) {
  const [query, setQuery] = useState("");

  return (
    <div>
      <input
        placeholder='Type to filter on name'
        type='text'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Round</th>
            <th>Genres</th>
            <th>Assigned</th>
            <th>Completed</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {search(bookAssignments, query).map((bookAssignment) => (
            <tr>
              <td>{bookAssignment.title}</td>
              <td>{bookAssignment.round}</td>
              <td>{bookAssignment.genres.join(", ")}</td>
              <td>{bookAssignment.assignedCount}</td>
              <td>{bookAssignment.reviewedCount}</td>
              <td>
                {parseInt(bookAssignment.assignedCount) ===
                  parseInt(bookAssignment.reviewedCount) &&
                parseInt(bookAssignment.completed) > 0
                  ? "Completed"
                  : "In progress"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
