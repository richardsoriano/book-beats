import { useState } from 'react'
import { XIcon } from '@heroicons/react/solid'
import { getSession } from 'next-auth/react'

import AdminCreateBook from '@/features/admin/books'

import Page from '@/ui/page'
import Modal from '@/ui/modal'
import Table from '@/ui/table'

import dbPromise, { jsonify } from '@/modules/mongodb'

export default function AdminBooksPage({ books }) {
  const [_books, setBooks] = useState(books)
  const [selectedBook, setSelectedBook] = useState(undefined)

  return (
    <div className='mt-16 ml-6 container mx-auto '>
      <Page
        title='Welcome to Book Beats'
        description='This is to assist the administrator in the Montana Book Clubs'
      >
        <div className='w-1/2 mx-auto'>
          <Modal open={selectedBook} close={() => setSelectedBook(undefined)}>
            <AdminCreateBook
              selectedBook={selectedBook}
              onChange={(json) =>
                setBooks((prev) =>
                  prev.map((_book) => (json._id === _book._id ? json : _book))
                )
              }
              close={() => setSelectedBook(undefined)}
            />
          </Modal>
        </div>

        <Table
          columns={[
            { heading: 'Title', sortable: 'title' },
            { heading: 'Author', sortable: 'author' },
          ]}
          rows={_books}
          renderRow={(book, i) => {
            const tdProps = {
              className: `${i % 2 !== 0 ? 'bg-blue-100' : ''} p-2`,
              onClick: () => setSelectedBook(book),
            }
            const tdDel = {
              className: `${i % 2 !== 0 ? 'bg-blue-100' : ''} p-2`,
              onClick: () => deleteBag(book),
            }
            return (
              <tr>
                <td {...tdProps}>{book.title}</td>
                <td {...tdProps}>{book.author}</td>

                <td {...tdDel}>{<XIcon className='w-5 h-5 text-red-500' />}</td>
              </tr>
            )
          }}
        />
      </Page>
    </div>
  )
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx)
  if (!session?.user || session.user.type !== 'admin')
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    }

  const dbConnection = await dbPromise
  const collection = await dbConnection.db().collection('books')
  const books = await collection.find({}).toArray()
  return {
    props: { books: jsonify(books) },
  }
}
