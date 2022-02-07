import SelectField from 'ui/select-field'

export default function attachCategory({ categories, bag, setBag = () => {} }) {
  return (
    <SelectField
      options={categories}
      value={bag.category}
      onChange={(category) => setBag((prev) => ({ ...prev, category }))}
    />
  )
}
