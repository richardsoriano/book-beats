import { useState, useEffect } from 'react'
import { filter } from './helpers'
import SortableColumn from '../../../books/assignments/results/sortable-column'

export default function BookScoreResults({ books, filteredCategories }) {
  const [sortableColumn, setSortableColumn] = useState(undefined)
  const [sortableDirection, setSortableDirection] = useState(undefined)

  const thClassNames = 'text-left font-bold border-b-2'
  const columns = [
    { heading: 'Title', sortColumn: 'title' },
    { heading: 'Categories', sortColumn: 'categories' },
    { heading: 'Score', sortColumn: 'score' },
  ]
  useEffect((sortableColumn) => {
    if (!sortableColumn) return
  }, [])

  function sort(books) {
    if (!sortableColumn) return books

    return books.sort((a, b) => {
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
        {sort(filter(books, filteredCategories)).map((book) => (
          <tr>
            <td>{book.title}</td>
            <td>{book.categories.join(', ')}</td>
            <td>{book.score}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
