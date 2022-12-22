import { useState } from "react"
import Filters from "./filters"
import BookListResults from "features/admin/books/list/results"

const statuses = ["Any", "Completed", "In progress"]

export default function AdminBookList({ bookList = [], categories }) {
  const [query, setQuery] = useState("")
  const [filteredStatus, setFilteredStatus] = useState(statuses[0])
  const [filteredCategories, setFilteredCategories] = useState([])

  return (
    <div>
      <h1 className="text-2xl font-bold">Books</h1>
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
      <BookListResults
        bookList={bookList}
        categories={categories}
        query={query}
        filteredStatus={filteredStatus}
        filteredCategories={filteredCategories}
        statuses={statuses}
      />
    </div>
  )
}
