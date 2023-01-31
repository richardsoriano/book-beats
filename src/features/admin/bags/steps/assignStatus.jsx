import SelectField from "ui/select-field"

export default function assignStatus({ pickupstatus, bag, setBag = () => {} }) {
  return (
    <SelectField
      options={pickupstatus}
      value={bag.pickupstatus}
      onChange={(pickupstatus) => setBag((prev) => ({ ...prev, pickupstatus }))}
    />
  )
}
