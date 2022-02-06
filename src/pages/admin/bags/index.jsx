import dbPromise, { jsonify } from '@/modules/mongodb'
import AdminBags from '@/features/admin/bags'
import books from '@/data/books'
import readers from '@/data/readers'

export default function AdminBagsPage({ bags, books, readerAssignments }) {
  return (
    <AdminBags
      bags={bags}
      books={books}
      readerAssignments={readerAssignments}
    />
  )
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
        assigned: bag.assigned,
        pickupStatus: bag.pickupStatus,
      },
    ]
  }, [])
}
function aggregateReaderAssignments(assignments) {
  return assignments.map((assignment) => ({
    reader: assignment.name,
    max: assignment.preferences.maxNumberOfBooks,
    assignedCount: assignment.assignments.length,
    completedCount: assignment.assignments.filter(
      (assignment) => assignment.reviewedOn !== null
    ).length,
    availableCount:
      assignment.preferences.maxNumberOfBooks - assignment.assignments.length,
    categories: assignment.preferences.categories,
  }))
}
export async function getServerSideProps(ctx) {
  const dbConnection = await dbPromise
  const collection = await dbConnection.db().collection('bags')
  const bags = await collection.find({}).toArray()

  return {
    props: {
      bags: aggregateBags(jsonify(bags)),
      books,
      readerAssignments: aggregateReaderAssignments(readers),
    },
  }
}
