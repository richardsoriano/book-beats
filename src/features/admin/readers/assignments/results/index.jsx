import { useState, useEffect } from 'react'
import { filter, search } from './helpers'
import SortableColumn from './sortable-column'

export default function ReaderAssignmentResults({
  readerAssignments,
  query,
  filteredcategories,
}) {
  const [sortableColumn, setSortableColumn] = useState(undefined)
  const [sortableDirection, setSortableDirection] = useState(undefined)
  const thClassNames = 'text-left font-bold border-b-2'

  const columns = [
    { heading: 'Reader', sortable: 'reader' },
    { heading: 'Max', sortable: 'max' },
    { heading: 'Assigned', sortable: 'assignedCount' },
    { heading: 'Completed', sortable: 'completedCount' },
    { heading: 'Available', sortable: 'availableCount' },
    { heading: 'categories', sortable: 'categories' },
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
          {columns.map((column) => (
            <SortableColumn
              setSort={() => {
                setSortableColumn(column.sortable)
                setSortableDirection((prev) =>
                  prev === 'asc' ? 'desc' : 'asc'
                )
              }}
              sort={sortableColumn === column.sortable}
              className={thClassNames}
              sortableDirection={sortableDirection}
            >
              {column.heading}
            </SortableColumn>
          ))}
        </tr>
      </thead>
      <tbody>
        {sort(filter(search(readerAssignments, query), filteredcategories)).map(
          (readerAssignment) => (
            <tr>
              <td>{readerAssignment.reader}</td>
              <td>{readerAssignment.max}</td>
              <td>{readerAssignment.assignedCount}</td>
              <td>{readerAssignment.completedCount}</td>
              <td>{readerAssignment.availableCount}</td>
              <td>{readerAssignment.categories.join(', ')}</td>

              <td>{readerAssignment.status}</td>
            </tr>
          )
        )}
      </tbody>
    </table>
  )
}
