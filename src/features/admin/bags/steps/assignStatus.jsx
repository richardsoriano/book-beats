import SelectField from 'ui/select-field'

export default function assignStatus({ pickupStatus, bag, setBag = () => {} }) {
  return (
    <SelectField
      options={pickupStatus}
      value={bag.pickupStatus}
      onChange={(pickupStatus) => setBag((prev) => ({ ...prev, pickupStatus }))}
    />
  )
}
