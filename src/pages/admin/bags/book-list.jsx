import { useState } from 'react'
import SelectField from '@/ui/select-field'
import TextField from '@/ui/text-field'
import { uniq } from '@/modules/array'

export default function BookList({ books, bag, setBag }) {
  const [query, setQuery] = useState('')
  const categories = uniq(books.flatMap((book) => book.categories))

  function search(books) {
    return books.filter((book) =>
      book.title.toLowerCase().includes(query.toLowerCase())
    )
  }

  return (
    <div>
      <div>
        <SelectField
          options={categories}
          label='Select a category'
          value={bag.category}
          onChange={(category) =>
            setBag((prev) => ({
              ...prev,
              category,
            }))
          }
        />
        <TextField
          placeholder='Type to filter on name'
          value={query}
          onChange={(query) => setQuery(query)}
        />
      </div>
      <ul>
        {search(books).map((book) => (
          <li
            className={`p-2 hover:bg-blue-500 hover:text-white border border-white ${
              bag.books.includes(book) ? 'bg-blue-500 text-white' : ''
            }`}
            onClick={() =>
              setBag((prev) => ({
                ...prev,
                books: prev.books.includes(book)
                  ? prev.books.filter((_book) => _book !== book)
                  : [...prev.books, book],
              }))
            }
          >
            {book.title} - {book.author}
          </li>
        ))}
      </ul>

      {JSON.stringify(bag)}
    </div>
  )
}
