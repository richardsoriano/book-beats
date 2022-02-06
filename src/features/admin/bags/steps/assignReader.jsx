import SelectField from 'ui/select-field'

export default function assignReader({ readers, bag, setBag = () => {} }) {
  return (
    <SelectField
      options={readers}
      value={bag.reader}
      onChange={(reader) => setBag((prev) => ({ ...prev, reader }))}
    />
  )
}
