import { useState } from 'react'
import { uniq } from '@/modules/array'
import Filters from './filters'
import BookAssignmentResults from './results'

const statuses = ['Any', 'Completed', 'In progress']

export default function AdminBookAssignments({ bookAssignments = [] }) {
  const categories = uniq(
    bookAssignments.reduce((acc, assignment) => {
      return [...acc, ...assignment.categories]
    }, [])
  )
  const [query, setQuery] = useState('')
  const [filteredStatus, setFilteredStatus] = useState(statuses[0])
  const [filteredCategories, setFilteredCategories] = useState([])

  return (
    <div className='container mx-auto'>
      <h1 className='text-2xl font-bold'>Book Assignments</h1>

      <Filters
        setFilteredStatus={setFilteredStatus}
        filteredStatus={filteredStatus}
        setFilteredCategories={setFilteredCategories}
        filteredCategories={filteredCategories}
        categories={categories}
        setQuery={setQuery}
        query={query}
        statuses={statuses}
      />

      <BookAssignmentResults
        bookAssignments={bookAssignments}
        query={query}
        statuses={statuses}
        filteredStatus={filteredStatus}
        filteredCategories={filteredCategories}
      />
    </div>
  )
}
