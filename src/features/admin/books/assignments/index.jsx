import { useState } from "react";
import { uniq } from "@/modules/array";
import SelectField from "@/ui/select-field";

function searchTitle(assignment, query) {
  return assignment.title.toLowerCase().includes(query.toLowerCase());
}

function searchGenre(assignment, query) {
  return (
    assignment.genres.filter((genre) =>
      genre.toLowerCase().includes(query.toLowerCase())
    ).length > 0
  );
}

function search(assignments, query) {
  if (query.length < 3) return assignments;
  return assignments.filter(
    (assignment) =>
      searchTitle(assignment, query) || searchGenre(assignment, query)
  );
}

function filter(assignments, filteredStatus) {
  return assignments.filter((assignment) => {
    if (compareCaseInsensitive(filteredStatus, statuses[0])) return true;
    return compareCaseInsensitive(assignment.status, filteredStatus);
  });
}

function compareCaseInsensitive(a, b) {
  return a.toLowerCase() === b.toLowerCase();
}

const statuses = ["Any", "Completed", "In progress"];

export default function AdminBookAssignments({ bookAssignments = [] }) {
  const genres = uniq(
    bookAssignments.reduce((acc, assignment) => {
      return [...acc, ...assignment.genres];
    }, [])
  );
  const [query, setQuery] = useState("");
  const [filteredStatus, setFilteredStatus] = useState(statuses[0]);
  const [filteredGenres, setFilteredGenres] = useState([]);

  const thClassNames = "text-left font-bold border-b-2";

  return (
    <div>
      {[genres].join(", ")}
      <h1>Book Assignments</h1>
      <input
        className='w-full border p-2'
        placeholder='Type to filter on name'
        type='text'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className='w-full border my-4 p-8'>
        <h2>
          Filters{" "}
          <button
            className='border py-1 px-6 rounded text-xs bg-blue-100 border-blue-400'
            onClick={() => {
              setFilteredStatus(statuses[0]);
              setFilteredGenres([]);
            }}
          >
            Reset
          </button>
          <div className='w-full flex items-center space-x-10'>
            <div className='w-64'>
              <SelectField
                onChange={(status) => setFilteredStatus(status)}
                value={filteredStatus}
                options={statuses}
              />
            </div>

            <div>
              <select
                onChange={(e) => setFilteredGenres(e.target.value)}
                value={filteredGenres}
              >
                {genres.map((genre) => (
                  <option value={genre}>{genre}</option>
                ))}
              </select>
            </div>
          </div>
        </h2>
      </div>
      <table cellSpacing={0} cellPadding={0} className='w-full table-auto'>
        <thead>
          <tr>
            <th className={thClassNames}>Title</th>
            <th className={thClassNames}>Round</th>
            <th className={thClassNames}>Genres</th>
            <th className={thClassNames}>Assigned</th>
            <th className={thClassNames}>Completed</th>
            <th className={thClassNames}>Status</th>
          </tr>
        </thead>
        <tbody>
          {filter(search(bookAssignments, query), filteredStatus).map(
            (bookAssignment) => (
              <tr>
                <td>{bookAssignment.title}</td>
                <td>{bookAssignment.round}</td>
                <td>{bookAssignment.genres.join(", ")}</td>
                <td>{bookAssignment.assignedCount}</td>
                <td>{bookAssignment.reviewedCount}</td>

                <td>{bookAssignment.status}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
