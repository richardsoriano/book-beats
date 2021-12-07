import dbPromise, { jsonify } from '@/modules/mongodb'

import AdminBags from '@/features/admin/bags'

import books from '@/data/books'

export default function AdminBagsPage({ bags, books }) {
  return <AdminBags bags={bags} books={books} />
}

function aggregateBags(bags) {
  return bags.reduce((acc, bag) => {
    return [
      ...acc,
      {
        _id: bag._id,
        name: bag.name,
        category: bag.category,
        books: bag.books,
        numBooks: bag.books.length,
      },
    ]
  }, [])
}

export async function getServerSideProps(ctx) {
  const dbConnection = await dbPromise
  const collection = await dbConnection.db().collection('bags')

  const bags = await collection.find({}).toArray()

  return {
    props: {
      bags: aggregateBags(jsonify(bags)),
      books,
    },
  }
}
