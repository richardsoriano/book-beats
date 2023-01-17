import SelectField from "ui/select-field"

export default function attachNomStatus({
  nomstatuses,
  book,
  setBook = () => {},
}) {
  return (
    <SelectField
      label="Nomination Status"
      options={nomstatuses}
      value={book.nomstatus}
      onChange={(nomstatus) => setBook((prev) => ({ ...prev, nomstatus }))}
    />
  )
}
