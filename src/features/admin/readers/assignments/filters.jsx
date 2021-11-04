import SelectField from '@/ui/select-field'
import MultiSelectField from '@/ui/multi-select-field'

export default function Filters({
  setFilteredCategories,
  filteredCategories,
  categories,
  setQuery,
  query,
}) {
  return (
    <div className='w-full border my-4 p-8'>
      <div className='flex items-center w-full space-x-4'>
        <div>
          <button
            className='border py-1 px-6 rounded text-xs bg-blue-100 border-blue-400 my-3'
            onClick={() => {
              setFilteredCategories([])
              setQuery('')
            }}
          >
            Reset
          </button>
        </div>
        <div className='w-full'>
          <input
            className='w-full border p-2'
            placeholder='Type to filter on name'
            type='text'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className='w-full flex items-center space-x-10'>
        <div className='w-64'>
          <MultiSelectField
            label='Filter by any matching category'
            onChange={(categories) => setFilteredCategories(categories)}
            value={filteredCategories}
            options={categories}
          />
        </div>
      </div>
    </div>
  )
}
