export default function bagBooks({ books, bag, setBag }) {
  // console.log("books", books)
  console.log("bag", bag)
  bag.books.map((b) => console.log(b))
  return (
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
          onClick={() =>
            setBag((prev) => ({
              ...prev,
              books: prev.books.some((_book) => _book === book._id)
                ? prev.books.filter((_book) => _book !== book._id)
                : [...prev.books, book._id],
            }))
          }
        >
          {book.title} {book._id}{" "}
          {bag.books.find((_book) => _book === book._id) ? "eq" : ""}
        </li>
      ))}
    </ul>
  )
}
