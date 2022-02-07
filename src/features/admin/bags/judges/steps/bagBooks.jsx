import { sort, filter } from './../bookScoreResults/helpers'

export default function bagBooks({ books, bag, setBag, filteredCategories }) {
  const filteredBooks = sort(filter(books, filteredCategories)).splice(0, 4)

  return (
    <div>
      {filteredBooks.length === 0 ? (
        <div>No books</div>
      ) : (
        <ul>
          {filteredBooks.map((book) => (
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
              {book.title} <i>{book.score}</i>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
