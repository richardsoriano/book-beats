export default function bagBooks({ books, bag, setBag }) {
  return (
    <ul>
      {books.map((book) => (
        <li
          className={`hover:bg-blue-500 hover:text-white 
            ${
              bag.books.find((_book) => _book._id === book._id)
                ? 'bg-blue-500 text-white'
                : ''
            }
          `}
          onClick={() =>
            setBag((prev) => ({
              ...prev,
              books: prev.books.some((_book) => _book._id === book._id)
                ? prev.books.filter((_book) => _book._id !== book._id)
                : [...prev.books, book],
            }))
          }
        >
          {book.title}
        </li>
      ))}
    </ul>
  )
}
