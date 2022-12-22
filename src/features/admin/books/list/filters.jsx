import SelectField from "@/ui/select-field"
import MultiSelectField from "@/ui/multi-select-field"
import TextField from "@/ui/text-field"

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
    <div className="w-full p-8 my-4 border">
      <div className="flex items-center w-full space-x-4">
        <div>
          <button
            className="px-6 py-1 my-3 text-xs bg-blue-100 border border-blue-400 rounded"
            onClick={() => {
              setFilteredStatus(statuses[0])
              setFilteredCategories([])
              setQuery("")
            }}
          >
            Reset
          </button>
        </div>
        <div className="w-full">
          <TextField
            placeholder="Type to filter on name"
            value={query}
            onChange={(val) => setQuery(val)}
          />
        </div>
      </div>

      <div className="flex items-center w-full space-x-10">
        <div className="w-64">
          <MultiSelectField
            label="Filter by any matching category"
            onChange={(categories) => setFilteredCategories(categories)}
            value={filteredCategories}
            options={categories}
          />
        </div>
      </div>
    </div>
  )
}
