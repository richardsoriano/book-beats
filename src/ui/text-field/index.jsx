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
        className='block w-full p-2 text-gray-900 placeholder-gray-900 border border-gray-900 focus:outline-none focus:text-blue-500 focus:border-blue-500 focus:placeholder-blue-500'
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </>
  )
}
