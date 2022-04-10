import { getSession } from 'next-auth/react'
import Page from '@/ui/page'

import CrudList from '@/features/crud/list'

import categories from '@/data/categories'

import dbPromise, { jsonify } from '@/modules/mongodb'

export default function AdminEventAssignmentsPage({ assignments }) {
  return (
    <div className='container mx-auto mt-16 ml-6 '>
      <Page
        title='Welcome to Book Beats'
        description='This is to assist the administrator in the Montana Book Clubs'
      >
        <CrudList
          collectionName='event-assignments'
          resourceName='Event assignment'
          rows={assignments}
          columns={{
            reader: {
              label: 'Search for a reader',
              control: 'reader-select',
              renderSearchItem: (reader) => (
                <div className='flex items-center justify-between p-2 border hover:cursor-pointer hover:bg-blue-50'>
                  <div>{reader.name}</div>
                  <div>{reader.email}</div>
                </div>
              ),
              renderSelectedItem: (reader) => (
                <div className='flex items-center justify-between p-2 border hover:cursor-pointer hover:bg-blue-50'>
                  <div>{reader.name}</div>
                </div>
              ),
            },
            book: {
              label: 'Search for a book',
              control: 'book-select',
              renderSearchItem: (book) => (
                <div className='flex items-center justify-between p-2 border hover:cursor-pointer hover:bg-blue-50'>
                  <div>{book.title}</div>
                  <div>{book.author}</div>
                </div>
              ),
              renderSelectedItem: (book) => (
                <div className='flex items-center justify-between p-2 border hover:cursor-pointer hover:bg-blue-50'>
                  <div>{book.title}</div>
                </div>
              ),
            },
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
  const collection = await dbConnection.db().collection('event-assignments')
  const assignments = await collection.find({}).toArray()
  return {
    props: { assignments: jsonify(assignments) },
  }
}
