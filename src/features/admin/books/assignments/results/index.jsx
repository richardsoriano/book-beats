import { useState } from "react"
import Table from "ui/table"
import { search, filter } from "./helpers"
import { XIcon } from "@heroicons/react/solid"

export default function BookAssignmentResults({
  bookAssignments,
  query,
  filteredStatus,
  filteredCategories,
  statuses,
}) {
  console.log("book assignments", bookAssignments)
  return (
    <Table
      columns={[
        { heading: "Title", sortable: "title" },
        { heading: "Round", sortable: "round" },
        { heading: "Categories", sortable: "categories" },
        { heading: "Assigned", sortable: "assignedCount" },
        { heading: "Completed", sortable: "reviewedCount" },
        { heading: "Status", sortable: "status" },
      ]}
      rows={filter(
        search(bookAssignments, query),
        filteredStatus,
        filteredCategories,
        statuses
      )}
      renderRow={(bookAssignment, i) => {
        const tdProps = {
          className: `${i % 2 !== 0 ? "bg-blue-100" : ""} px-2 py-4 p-2`,
          onClick: () => setSelectedBook(book),
        }
        const tdDel = {
          className: `${i % 2 !== 0 ? "bg-blue-100" : ""} px-2 py-4 p-2`,
          onClick: () => deleteBook(book),
        }
        return (
          <tr key={i}>
            <td {...tdProps}>{bookAssignment.title}</td>
            <td {...tdProps}>{bookAssignment.round}</td>
            <td {...tdProps}>{bookAssignment.categories}</td>
            <td {...tdProps}>{bookAssignment.assignedCount}</td>
            <td {...tdProps}>{bookAssignment.reviewedCount}</td>
            <td {...tdProps}>{bookAssignment.status}</td>
            <td {...tdDel}>{<XIcon className="w-5 h-5 text-red-500" />}</td>
          </tr>
        )
      }}
    />
  )
}
