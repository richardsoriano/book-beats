import TextField from '@/ui/text-field'

export default function NameBag({ bag, setBag }) {
  return (
    <TextField
      placeholder='Name the bag'
      value={bag.name}
      onChange={(name) =>
        setBag((prev) => ({
          ...prev,
          name,
        }))
      }
    />
  )
}
