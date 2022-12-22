import AdminBookList from "@/features/admin/books/list"

import books from "@/data/books"
import categories from "@/data/categories"

export default function AdminBookListPage({ bookList, categories }) {
  return <AdminBookList bookList={bookList} categories={categories} />
}

function aggregateBookList(books) {
  return books
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
  // return books.reduce((acc, book) => {
  //   const assigned = readers.flatMap((reader) =>
  //     reader.assignments.filter((assignment) => assignment.book === book._id)
  //   )
  //   const reviewed = readers.flatMap((reader) =>
  //     reader.assignments.filter(
  //       (assignment) => assignment.book === book._id && assignment.reviewedOn
  //     )
  //   )

  //   return [
  //     ...acc,
  //     {
  //       ...book,
  //       assignedCount: assigned.length,
  //       reviewedCount: reviewed.length,
  //       status:
  //         assigned.length === reviewed.length ? "Completed" : "In progress",
  //     },
  //   ]
  // }, [])
}
export function getServerSideProps() {
  return {
    props: {
      bookList: aggregateBookList(books),
      categories: categories,
    },
  }
}
