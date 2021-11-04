import { useState, useEffect } from 'react'
import SortableColumn from './sortable-column'

export default function Table({ columns = [], rows = [], renderRow }) {
  const [sortableColumn, setSortableColumn] = useState(undefined)
  const [sortableDirection, setSortableDirection] = useState(undefined)
  const thClassNames = 'text-left font-bold border-b-2'

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
      <tbody>{rows.map((row) => renderRow(row))}</tbody>
    </table>
  )
}
