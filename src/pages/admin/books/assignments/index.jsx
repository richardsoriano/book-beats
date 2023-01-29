import AdminBooksAssignments from "@/features/admin/books/assignments"

import dbPromise, { jsonify } from "@/modules/mongodb"

export default function AdminBooksAssignmentsPage({ bookAssignments }) {
  return <AdminBooksAssignments bookAssignments={bookAssignments} />
}

function aggregateBookAssignments(readers, books) {
  return books.reduce((acc, book) => {
    const assigned = readers.flatMap((reader) =>
      reader.assignments.filter(
        (assignment) => assignment.book._id === book._id
      )
    )

    const reviewed = readers.flatMap((reader) =>
      reader.assignments.filter(
        (assignment) => assignment.book === book._id && assignment.reviewedOn
      )
    )

    return [
      ...acc,
      {
        ...book,
        assignedCount: assigned.length,
        reviewedCount: reviewed.length,
        status:
          assigned.length === reviewed.length ? "Completed" : "In progress",
      },
    ]
  }, [])
}
export async function getServerSideProps() {
  const dbConnection = await dbPromise
  const collectionBooks = await dbConnection.db().collection("books")
  const books = await collectionBooks.find({}).toArray()
  const collectionReaders = await dbConnection.db().collection("readers")
  const readers = await collectionReaders.find({}).toArray()
  return {
    props: {
      bookAssignments: aggregateBookAssignments(
        jsonify(readers),
        jsonify(books)
      ),
    },
  }
}
