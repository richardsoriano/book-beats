export default function TextField({
  type = 'text',
  value,
  label,
  placeholder,
  onChange = () => {},
}) {
  return (
    <>
      {label && <label>{label}</label>}
      <input
        className='block w-1/4 border p-2'
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </>
  )
}
