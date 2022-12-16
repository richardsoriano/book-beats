export default function Button({ children, onClick = () => {} }) {
  return (
    <button
      className="px-6 py-4 text-white bg-blue-500 border rounded-sm"
      onClick={onClick}
    >
      {children}
    </button>
  )
}
