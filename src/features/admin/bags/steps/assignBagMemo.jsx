import TextField from "ui/text-field"

export default function assignBagMemo({ bag, setBag = () => {} }) {
  return (
    <>
      <h2>Memo</h2>
      <TextField
        value={bag.bagMemo}
        onChange={(bagMemo) => setBag((prev) => ({ ...prev, bagMemo }))}
      />
    </>
  )
}
