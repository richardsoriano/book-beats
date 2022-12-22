import TextField from "ui/text-field"
export default function AttachCopyIds({ copyIds, book, setBook }) {
  console.log("copyIds", copyIds.join(""))
  return (
    <TextField
      label="CopyIds"
      value={book.copyIds}
      onChange={(copyIds) => setBook((prev) => ({ ...prev, copyIds }))}
    />
  )
}
