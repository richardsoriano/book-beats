export default function CreateBag({ bagName, setBagName }) {
  return (
    <div>
      <TextField
        placeholder='Name the bag'
        value={bagName}
        onChange={(bagName) => setBagName(bagName)}
      />
    </div>
  )
}
