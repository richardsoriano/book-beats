import { getSession } from 'next-auth/react'
import Page from '@/ui/page'

import CrudList from '@/features/crud/list'

import categories from '@/data/categories'

import dbPromise, { jsonify } from '@/modules/mongodb'

export default function AdminEventPage({ events }) {
  return (
    <div className='container mx-auto mt-16 ml-6 '>
      <Page
        title='Welcome to Book Beats'
        description='This is to assist the administrator in the Montana Book Clubs'
      >
        <CrudList
          collectionName='events'
          resourceName='Event'
          rows={events}
          columns={{
            name: {
              label: 'Name',
              control: 'text',
            },
            city: {
              label: 'City',
              control: 'text',
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
  const collection = await dbConnection.db().collection('events')
  const events = await collection.find({}).toArray()
  return {
    props: { events: jsonify(events) },
  }
}
