import SelectField from "ui/select-field"

export default function attachQualifiedStatus({
  qualifiedstatuses,
  book,
  setBook = () => {},
}) {
  return (
    <SelectField
      label="Qualified Status"
      options={qualifiedstatuses}
      value={book.qualifiedstatus}
      onChange={(qualifiedstatus) =>
        setBook((prev) => ({ ...prev, qualifiedstatus }))
      }
    />
  )
}
