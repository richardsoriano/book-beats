// import MultiSelectField from 'ui/multi-select-field'

export default function bagBooks({ bag, setBag = () => {}, books }) {
  return (
    <ul>
      {books.map((book) => (
        <li
          onClick={() =>
            setBag((prev) => ({
              ...prev,
              books: prev.books.some((_book) => _book._id === book._id)
                ? prev.books.filter((_book) => _book._id !== book._id)
                : [...prev.books, book],
            }))
          }
          className={`hover:bg-blue-500 hover:text-white border border-white
            ${
              bag.books.find((_book) => _book._id === book._id)
                ? 'bg-blue-500 text-white'
                : ''
            }`}
        >
          {book.title}
        </li>
      ))}
    </ul>
  )
}
