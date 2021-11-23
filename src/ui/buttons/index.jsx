export default function Button({ children, onClick = () => {} }) {
  return (
    <button
      class='bg-blue-500 text-white border rounded-sm shadow py-2 px-6'
      onClick={onClick}
    >
      {children}
    </button>
  )
}
