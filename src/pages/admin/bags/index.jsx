import dbPromise, { jsonify } from "@/modules/mongodb"
import AdminBags from "@/features/admin/bags"
import books from "@/data/books"
import bags from "@/data/bags"
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
        reader: bag.reader,
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
  const dbConnectionBags = await dbPromise
  const collectionBags = await dbConnectionBags.db().collection("bags")
  const bags = await collectionBags.find({}).sort({ name: 1 }).toArray()

  const dbConnectionBooks = await dbPromise
  const collectionBooks = await dbConnectionBooks.db().collection("books")
  const books = await collectionBooks.find({}).sort({ title: 1 }).toArray()

  const dbConnectionReaders = await dbPromise
  const collectionReaders = await dbConnectionReaders.db().collection("readers")
  const readers = await collectionReaders.find({}).sort({ name: 1 }).toArray()

  return {
    props: {
      bags: bags,
      books: books,
      readers: readers,
      // bags: aggregateBags(jsonify(bags)),
      // books: aggregateBooks(jsonify(books)),
      // readerAssignments: aggregateReaderAssignments(readers),
      // readers: aggregateReaders(jsonify(readers)),
    },
  }
}
