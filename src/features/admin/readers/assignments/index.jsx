import { useState } from "react";

export default function AdminReaderAssignments({ readerAssignments }) {
  const [query, setQuery] = useState("");

  function search(assignments) {
    if (query.length < 3) return assignments;
    return assignments.filter((assignment) =>
      assignment.name.toLowerCase().includes(query.toLowerCase())
    );
  }

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
            <th>Name</th>
            <th>Max Books</th>
            <th>Prefered Genres</th>
            <th>Assigned</th>
            <th>Completed</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {search(readerAssignments).map((readerAssignment) => (
            <tr>
              <td>{readerAssignment.name}</td>
              <td>{readerAssignment.preferences.maxNumberOfBooks}</td>
              <td>{readerAssignment.preferences.genres.join(",")}</td>
              <td>{readerAssignment.assignedCount}</td>
              <td>{readerAssignment.reviewedCount}</td>
              <td>
                {parseInt(readerAssignment.assignedCount) ===
                  parseInt(readerAssignment.reviewedCount) &&
                parseInt(readerAssignment.reviewedCount) > 0
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
