import { useState, useEffect } from 'react'
import { search, filter } from './helpers'
import SortableColumn from './sortable-column'

export default function BookAssignmentResults({
  bookAssignments,
  query,
  filteredStatus,
  filteredCategories,
  statuses,
}) {
  const [sortableColumn, setSortableColumn] = useState(undefined)
  const [sortableDirection, setSortableDirection] = useState(undefined)

  const thClassNames = 'text-left font-bold border-b-2'
  const columns = [
    { heading: 'Title', sortColumn: 'title' },
    { heading: 'Round', sortColumn: 'round' },
    { heading: 'Categories', sortColumn: 'categories' },
    { heading: 'Assigned', sortColumn: 'assignedCount' },
    { heading: 'Completed', sortColumn: 'reviewedCount' },
    { heading: 'Status', sortColumn: 'status' },
  ]
  useEffect((sortableColumn) => {
    if (!sortableColumn) return
  }, [])

  function sort(assignments) {
    if (!sortableColumn) return assignments

    return assignments.sort((a, b) => {
      if (a[sortableColumn] > b[sortableColumn])
        return sortableDirection === 'asc' ? 1 : -1
      if (a[sortableColumn] < b[sortableColumn])
        return sortableDirection === 'desc' ? 1 : -1
      return 0
    })
  }
  return (
    <table cellSpacing={0} cellPadding={0} className='w-full table-auto'>
      <thead>
        <tr>
          {columns.map((col) => (
            <SortableColumn
              className={thClassNames}
              sort={sortableColumn === col.sortColumn}
              setSort={() => {
                setSortableColumn(col.sortColumn)
                setSortableDirection((prev) =>
                  prev === 'asc' ? 'desc' : 'asc'
                )
              }}
              sortableDirection={sortableDirection}
            >
              {col.heading}
            </SortableColumn>
          ))}
        </tr>
      </thead>
      <tbody>
        {sort(
          filter(
            search(bookAssignments, query),
            filteredStatus,
            filteredCategories,
            statuses
          )
        ).map((bookAssignment) => (
          <tr>
            <td>{bookAssignment.title}</td>
            <td>{bookAssignment.round}</td>
            <td>{bookAssignment.categories.join(',')}</td>
            <td>{bookAssignment.assignedCount}</td>
            <td>{bookAssignment.reviewedCount}</td>
            <td>{bookAssignment.status} </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
