import SelectField from '@/ui/select-field'

export default function AttachCategory({ categories, bag, setBag }) {
  return (
    <SelectField
      options={categories}
      label='Select a category'
      value={bag.category}
      onChange={(category) => {
        setBag((prev) => ({
          ...prev,
          category,
        }))
      }}
    />
  )
}
