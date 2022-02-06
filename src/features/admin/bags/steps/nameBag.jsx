import TextField from 'ui/text-field'
import Button from 'ui/button'

export default function nameBag({ bag, setBag = () => {} }) {
  return (
    <>
      <h2>Name Bag</h2>
      <TextField
        value={bag.name}
        onChange={(name) => setBag((prev) => ({ ...prev, name }))}
      />
    </>
  )
}
