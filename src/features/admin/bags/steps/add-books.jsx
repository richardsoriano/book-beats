export default function AddBooks({ books, bag, setBag }) {
  console.log('books', books)
  console.log('bag.books', bag.books)
  return (
    <ul>
      {books.map((book) => (
        <li
          className={`p-2 hover:bg-blue-500 hover:text-white border border-white ${
            bag.books.find((baggedBook) => baggedBook._id === book._id)
              ? 'bg-blue-500 text-white'
              : ''
          }`}
          onClick={() =>
            setBag((prev) => ({
              ...prev,
              books: prev.books.includes(book)
                ? prev.books.filter((_book) => _book._id !== book._id)
                : [...prev.books, book],
            }))
          }
        >
          {book.title} - {book.author}
        </li>
      ))}
    </ul>
  )
}
