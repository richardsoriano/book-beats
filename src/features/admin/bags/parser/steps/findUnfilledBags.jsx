export default function FindUnfilledBags({ bagsToBeProcessed }) {
  return (
    <>
      {bagsToBeProcessed.length ? (
        bagsToBeProcessed.map((b) => <div>{b.name}</div>)
      ) : (
        <div>No Bags to be processed</div>
      )}
    </>
  )
}
