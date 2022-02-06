import { useState } from 'react'
import { uniq } from '@/modules/array'
import Filters from './filters'
import BookAssignmentResults from 'features/admin/books/assignments/results'
import TextField from 'ui/text-field'

const statuses = ['Any', 'Completed', 'In progress']

export default function AdminBooksAssignments({ bookAssignments = [] }) {
  const categories = uniq(
    bookAssignments.reduce((acc, assignment) => {
      return [...acc, ...assignment.categories]
    }, [])
  )

  const [query, setQuery] = useState('')
  const [filteredStatus, setFilteredStatus] = useState(statuses[0])
  const [filteredCategories, setFilteredCategories] = useState([])
  const [book, setBook] = useState({
    title: '',
    author: '',
    year: '',
    dateOfPublishing: '',
    categories: [],
  })

  return (
    <div>
      <h1 className='text-2xl font-bold'>Books</h1>
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
      <div className='py-6'>
        <h2 className='text-blue-400 text-4xl'>
          Add a Book - <small>(TBD)</small>
        </h2>
        <TextField
          label='Title'
          value={book.title}
          onChange={(title) => setBook((prev) => ({ ...prev, title }))}
        />
        <TextField
          label='Author'
          value={book.author}
          onChange={(author) => setBook((prev) => ({ ...prev, author }))}
        />
        <TextField
          label='Year'
          value={book.year}
          onChange={(year) => setBook((prev) => ({ ...prev, year }))}
        />
        <TextField
          label='Date Of Publishing'
          value={book.dateOfPublishing}
          onChange={(dateOfPublishing) =>
            setBook((prev) => ({ ...prev, dateOfPublishing }))
          }
        />
      </div>
    </div>
  )
}
