const books = [
  { _id: '100', title: 'On a Good Horse', author: 'Richard' },
  { _id: '100', title: 'On a Good Horse', author: 'Richard' },
]

const bag = {
  name: '',
  category: undefined,
  books: [],
}

export default function bagBooks({ bag, setBag = () => {}, books }) {
  return (
    <ul>
      {books.map((book) => (
        <li>{book.title}</li>
      ))}
    </ul>
  )
}
