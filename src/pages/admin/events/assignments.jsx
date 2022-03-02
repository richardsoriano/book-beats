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
              label: 'Reader',
              control: 'reader-select',
            },
            book: {
              label: 'Book',
              control: 'book-select',
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
