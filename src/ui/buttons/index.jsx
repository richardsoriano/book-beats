export default function Button({ children, onClick = () => {} }) {
  return (
    <button
      type="button"
      className="px-4 py-2 text-white bg-blue-500 border rounded-lg hover:bg-blue-700 "
      onClick={onClick}
    >
      {children}
    </button>
  )
}
