import { useState } from 'react'
import { uniq } from '@/modules/array'
import Filters from './filters'
import ReaderAssignmentResults from './results'

export default function AdminReadersAssignments({ readerAssignments = [] }) {
  const [query, setQuery] = useState('')
  const [filteredCategories, setFilteredCategories] = useState([])

  const categories = uniq(
    readerAssignments.reduce((acc, assignment) => {
      return [...acc, ...assignment.categories]
    }, [])
  )

  return (
    <div className='container mx-auto'>
      <h1 className='text-2xl font-bold'>Reader Assignments</h1>

      <Filters
        setFilteredCategories={setFilteredCategories}
        filteredCategories={filteredCategories}
        categories={categories}
        setQuery={setQuery}
        query={query}
      />

      <ReaderAssignmentResults
        readerAssignments={readerAssignments}
        query={query}
        filteredCategories={filteredCategories}
      />
    </div>
  )
}
