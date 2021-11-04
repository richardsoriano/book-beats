import { useState } from 'react'
import readers from '@/data/readers'
import books from '@/data/books'

import BookList from './book-list'
import CreateBag from './create-bag'
import ReaderList from './reader-list'

function renderStep(props) {
  const { bag } = props
  if (bag.books.length < 4) return <BookList {...props} />
  if (bag.number.length === 0) return <CreateBag {...props} />
  if (bag.number.length > 0 && bag.readers.length < 4)
    return <ReaderList {...props} />
}

export default function BagPage({ readers, books }) {
  const [bag, setBag] = useState({
    number: '',
    category: undefined,
    books: [],
    readers: [],
  })

  const props = {
    bag,
    setBag,
    readers,
    books,
  }

  return renderStep(props)
}

export function getServerSideProps(req) {
  return {
    props: {
      readers,
      books,
    },
  }
}
