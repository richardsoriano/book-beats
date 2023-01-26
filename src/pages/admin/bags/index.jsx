import dbPromise, { jsonify } from "@/modules/mongodb"
import AdminBags from "@/features/admin/bags"
import readers from "@/data/readers"

export default function AdminBagsPage({
  bags,
  books,
  readerAssignments,
  readers,
}) {
  return (
    <AdminBags
      bags={bags}
      books={books}
      readerAssignments={readerAssignments}
      readers={readers}
    />
  )
}
function aggregateBooks(books) {
  return books
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
        pickupstatus: bag.pickupstatus,
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
function aggregateReaders(readers) {
  return readers
}
export async function getServerSideProps() {
  const dbConnection = await dbPromise
  const collectionBags = await dbConnection.db().collection("bags")
  const bags = await collectionBags.find({}).sort({ name: 1 }).toArray()

  const collectionBooks = await dbConnection.db().collection("books")
  const books = await collectionBooks.find({}).sort({ title: 1 }).toArray()
  // const collectionReaders = await dbConnection.db().collection("readers")
  // const readers = await collectionReaders.find({}).sort({ name: 1 }).toArray()
  console.log("readers", readers)
  return {
    props: {
      bags: aggregateBags(jsonify(bags)),
      books: aggregateBooks(jsonify(books)),
      readerAssignments: aggregateReaderAssignments(readers),
      readers: aggregateReaders(jsonify(readers)),
    },
  }
}
