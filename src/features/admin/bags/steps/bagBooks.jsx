export default function bagBooks({ books, bag, setBag }) {
  const filteredBooks = books.filter(
    (book) => book.categories.indexOf(bag.category) > -1
  )
  // // TODO list only those books that are elligble: qualifiedstatus==="Yes"
  // const filteredBooks = books.filter(
  //   (book) => (book.categories.indexOf(bag.category) > -1 && book.qualifiedstatus==="Yes")
  // )
  return (
    <>
      <div className="py-4">
        <span className="font-extrabold text-red-400">
          Number of Books: {bag.books.length}
        </span>
      </div>
      <ul>
        {filteredBooks.map((book) => (
          <li
            className={`hover:bg-blue-500 hover:text-white 
            ${
              bag.books.find((_book) => _book === book._id)
                ? "bg-blue-500 text-white"
                : ""
            }
          `}
            onClick={() =>
              setBag((prev) => ({
                ...prev,
                books: prev.books.some((_book) => _book === book._id)
                  ? prev.books.filter((_book) => _book !== book._id)
                  : prev.books.length < 4
                  ? [...prev.books, book._id]
                  : [...prev.books],
              }))
            }
          >
            {book.title.substring(0, 49)}
          </li>
        ))}
      </ul>
    </>
  )
}
