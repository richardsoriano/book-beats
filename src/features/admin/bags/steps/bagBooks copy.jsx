export default function bagBooks({ books, bag, setBag }) {
  // console.log("books", books)
  console.log("bag", bag)
  // bag.books.map((b) => console.log(b))
  // const [count, setBookCount] = useState(0)
  return (
    <>
      <div className="py-4">
        <span className="text-lg font-semibold text-red-500">
          Number of books: {bag.books.length}
        </span>
      </div>
      <ul>
        {books.map((book) => (
          <li
            className={`hover:bg-blue-500 hover:text-white 
            ${
              bag.books.find((_book) => _book === book._id)
                ? "bg-blue-500 text-white"
                : ""
            }
          `}
            onClick={() => {
              setBag((prev) => ({
                ...prev,
                books: prev.books.some((_book) => _book === book._id)
                  ? prev.books.filter((_book) => _book !== book._id)
                  : [...prev.books, book._id],
              }))
            }}
          >
            {book.title.substring(0, 40)}
          </li>
        ))}
      </ul>
    </>
  )
}
