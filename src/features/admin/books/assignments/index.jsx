import { useState } from "react"

import Filters from "./filters"
import BookAssignmentResults from "features/admin/books/assignments/results"
import categories from "@/data/categories"

const statuses = ["Any", "Completed", "In progress"]

export default function AdminBooksAssignments({ bookAssignments = [] }) {
  const [query, setQuery] = useState("")
  const [filteredStatus, setFilteredStatus] = useState(statuses[0])
  const [filteredCategories, setFilteredCategories] = useState([])

  return (
    <div>
      <h1 className="text-2xl font-bold">Assignments</h1>
      <Filters
        setFilteredStatus={setFilteredStatus}
        filteredStatus={filteredStatus}
        setFilteredCategories={setFilteredCategories}
        filteredCategories={filteredCategories}
        setQuery={setQuery}
        query={query}
        statuses={statuses}
        categories={categories}
      />
      <BookAssignmentResults
        bookAssignments={bookAssignments}
        query={query}
        filteredStatus={filteredStatus}
        filteredCategories={filteredCategories}
        statuses={statuses}
      />
    </div>
  )
}
