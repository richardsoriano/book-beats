import SelectField from '@/ui/select-field'
import MultiSelectField from '@/ui/multi-select-field'
import TextField from '@/ui/text-field'

export default function Filters({
  setFilteredStatus,
  filteredStatus,
  setFilteredCategories,
  filteredCategories,
  categories,
  setQuery,
  query,
  statuses,
}) {
  return (
    <div className='w-full border my-4 p-8'>
      <div className='flex items-center w-full space-x-4'>
        <div>
          <button
            className='border py-1 px-6 rounded text-xs bg-blue-100 border-blue-400 my-3'
            onClick={() => {
              setFilteredStatus(statuses[0])
              setFilteredCategories([])
              setQuery('')
            }}
          >
            Reset
          </button>
        </div>
        <div className='w-full'>
          <TextField
            placeholder='Type to filter on name'
            value={query}
            onChange={(val) => setQuery(val)}
          />
        </div>
      </div>

      <div className='w-full flex items-center space-x-10'>
        <div className='w-64'>
          <SelectField
            label='Filter by status'
            onChange={(status) => setFilteredStatus(status)}
            value={filteredStatus}
            options={statuses}
          />
        </div>

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
