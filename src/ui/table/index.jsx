import { useState, useEffect } from "react"
import SortableColumn from "./sortable-column"

export default function Table({ columns = [], rows = [], renderRow }) {
  const [sortableColumn, setSortableColumn] = useState(
    columns.find((column) => column.sortable).sortable
  )
  const [sortableDirection, setSortableDirection] = useState("asc")
  const thClassNames = "text-left font-bold border-b-2 px-2 py-4"

  useEffect((sortableColumn) => {
    if (!sortableColumn) return
  }, [])

  function sort(rows) {
    if (!sortableColumn) return rows

    return rows.sort((a, b) =>
      typeof a[sortableColumn] === "string"
        ? sortString(a, b)
        : sortNumber(a, b)
    )
  }
  function sortString(a, b) {
    if (a[sortableColumn].toLowerCase() > b[sortableColumn].toLowerCase())
      return sortableDirection === "asc" ? 1 : -1
    if (a[sortableColumn].toLowerCase() < b[sortableColumn].toLowerCase())
      return sortableDirection === "desc" ? 1 : -1
    return 0
  }

  function sortNumber(a, b) {
    if (a[sortableColumn] > b[sortableColumn])
      return sortableDirection === "asc" ? 1 : -1
    if (a[sortableColumn] < b[sortableColumn])
      return sortableDirection === "desc" ? 1 : -1
    return 0
  }

  return (
    <table
      cellSpacing={0}
      cellPadding={0}
      className="w-full p-10 table-auto whitespace-nowrap"
    >
      <thead>
        <tr>
          {columns.map((column) =>
            column.sortable ? (
              <SortableColumn
                key={column.uniqueId}
                setSort={() => {
                  setSortableColumn(column.sortable)
                  setSortableDirection((prev) =>
                    prev === "asc" ? "desc" : "asc"
                  )
                }}
                sort={sortableColumn === column.sortable}
                className={thClassNames}
                sortableDirection={sortableDirection}
              >
                {column.heading}
              </SortableColumn>
            ) : (
              <th className="px-2 py-4">{column.heading}</th>
            )
          )}
          <th className={thClassNames}></th>
        </tr>
      </thead>
      <tbody>{sort(rows).map((row, i) => renderRow(row, i))}</tbody>
    </table>
  )
}
