import dbPromise, { jsonify } from '@/modules/mongodb'

import AdminBags from '@/features/admin/bags'

import books from '@/data/books'

export default function AdminBagsPage({ bags, books }) {
  return <AdminBags bags={bags} books={books} />
}

export async function getServerSideProps(ctx) {
  const dbConnection = await dbPromise
  const collection = await dbConnection.db().collection('bags')

  const bags = await collection.find({}).toArray()

  return {
    props: {
      bags: jsonify(bags),
      books,
    },
  }
}
