export default function DropdownCategories({ categories, book, setBook }) {
  return (
    <ul>
      {categories.map((category, i) => (
        <li
          key={i}
          className={`hover:bg-blue-500 hover:text-white 
            ${
              book.categories.find((_category) => _category === category)
                ? "bg-blue-500 text-white"
                : ""
            }
          `}
          onClick={() =>
            setBook((prev) => ({
              ...prev,
              categories: prev.categories.some(
                (_category) => _category === category
              )
                ? prev.categories.filter((_category) => _category !== category)
                : [...prev.categories, category],
            }))
          }
        >
          {category}
        </li>
      ))}
    </ul>
  )

  // return (
  //   <ul>
  //     {books.map((book) => (
  //       <li
  //         className={`hover:bg-blue-500 hover:text-white
  //           ${
  //             bag.books.find((_book) => _book === book._id)
  //               ? "bg-blue-500 text-white"
  //               : ""
  //           }
  //         `}
  //         onClick={() =>
  //           setBag((prev) => ({
  //             ...prev,
  //             books: prev.books.some((_book) => _book === book._id)
  //               ? prev.books.filter((_book) => _book !== book._id)
  //               : [...prev.books, book._id],
  //           }))
  //         }
  //       >
  //         {book.title} {book._id}{" "}
  //         {bag.books.find((_book) => _book === book._id) ? "eq" : ""}
  //       </li>
  //     ))}
  //   </ul>
  // )
}
