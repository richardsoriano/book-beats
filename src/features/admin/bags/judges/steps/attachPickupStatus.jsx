import { filterReadersByCategories } from './../bookScoreResults/helpers'

import SelectField from 'ui/select-field'

export default function attachPickupStatus({
  bag,
  setBag = () => {},
  pickupStatuses,
}) {
  return (
    <SelectField
      options={pickupStatuses}
      value={bag.pickupStatus}
      onChange={(pickupStatus) => setBag((prev) => ({ ...prev, pickupStatus }))}
    />
  )
}
