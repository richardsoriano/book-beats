import AdminBooksAssignments from "@/features/admin/books/assignments"
import readers from "@/data/readers"
import books from "@/data/books"
export default function AdminBooksAssignmentsPage({ bookAssignments }) {
  return <AdminBooksAssignments bookAssignments={bookAssignments} />
}

function aggregateBookAssignments(readers, books) {
  // const books = readers
  //   .flatMap((reader) => reader.assignments)
  //   .flatMap((assignment) => assignment.book)
  //   .reduce((acc, book) => {
  //     return acc.map((book) => book._id).includes(book._id)
  //       ? acc
  //       : [...acc, { ...book, round: 1 }]
  //   }, [])
  // const bookIds = ["101", "102", "103", "2001", "2002"]
  // bookIds.map((bookId) => {
  //   books.filter((book) => book._id === bookId)
  // })
  // console.log("books:", books)
  return books.reduce((acc, book) => {
    const assigned = readers.flatMap((reader) =>
      reader.assignments.filter((assignment) => assignment.book === book._id)
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
export function getServerSideProps() {
  return {
    props: {
      bookAssignments: aggregateBookAssignments(readers, books),
    },
  }
}
