import dbPromise, { jsonify } from "@/modules/mongodb"
import AdminBags from "@/features/admin/bags"
import books from "@/data/books"
import readers from "@/data/readers"
import mybags from "@/data/bags"
export default function AdminBagsPage({ bags, books, readerAssignments }) {
  return (
    <AdminBags
      bags={bags}
      books={books}
      readerAssignments={readerAssignments}
    />
  )
}

function aggregateBags(bags, mybags) {
  // console.log("jsonify", bags)
  // console.log("mybags", mybags)

  return mybags.reduce((acc, bag) => {
    // bag.books.map(
    //   (book, i) =>
    //     book ===
    //     books.filter((_book) => {
    //       _book._id === book ? book.title : null
    //     })
    // )
    // console.log("bag books array", bag.books)
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
export async function getServerSideProps() {
  const dbConnection = await dbPromise
  const collection = await dbConnection.db().collection("bags")
  const bags = await collection.find({}).toArray()

  return {
    props: {
      bags: aggregateBags(jsonify(bags), mybags),
      books,
      readerAssignments: aggregateReaderAssignments(readers),
    },
  }
}
