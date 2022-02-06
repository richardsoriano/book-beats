import SelectField from '@/ui/select-field'

export default function Filters({
  setFilteredCategories,
  filteredCategories,
  categories,
}) {
  return (
    <div className='w-full border my-4 p-8'>
      <div className='flex items-center w-full space-x-4'>
        <div>
          <button
            className='border py-1 px-6 rounded text-xs bg-blue-100 border-blue-400 my-3'
            onClick={() => {
              setFilteredCategories([])
            }}
          >
            Reset
          </button>
        </div>
      </div>

      <div className='w-full flex items-center space-x-10'>
        <div className='w-64'>
          <SelectField
            label='Filter by category'
            options={categories}
            value={filteredCategories}
            onChange={(categories) => setFilteredCategories(categories)}
          />
        </div>
      </div>
    </div>
  )
}
