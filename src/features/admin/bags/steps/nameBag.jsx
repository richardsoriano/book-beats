import TextField from "ui/text-field"

export default function nameBag({ bag, setBag = () => {} }) {
  return (
    <>
      <h2>Name </h2>
      <TextField
        value={bag.name}
        onChange={(name) => setBag((prev) => ({ ...prev, name }))}
      />
    </>
  )
}
