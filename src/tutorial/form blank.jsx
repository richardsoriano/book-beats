export default function bagForm({
  books = [],
  bag,
  setBag,
  onCreate = () => {},
}) {
  const steps = [
    { label: 'name bag' },
    { label: 'attach category' },
    { label: 'bag books' },
  ]

  return (
    <div>
      <ul>
        {steps.map((step, i) => (
          <li>{steps[i].label}</li>
        ))}
      </ul>
    </div>
  )
}
