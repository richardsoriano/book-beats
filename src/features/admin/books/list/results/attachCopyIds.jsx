import TextField from "ui/text-field"
export default function AttachCopyIds({ book, setBook }) {
  return (
    <TextField
      label="CopyIds"
      value={book.copyIds}
      onChange={(copyIds) => setBook((prev) => ({ ...prev, copyIds }))}
    />
  )
}
