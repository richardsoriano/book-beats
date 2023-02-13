// import dbPromise, { jsonify } from "@/modules/mongodb"

import AdminBookList from "@/features/admin/books/list"

import categories from "@/data/categories"
// import books from "@/data/books"
import books from "@/data/daniel-books"
export default function AdminBookListPage({ bookList, categories }) {
  return <AdminBookList bookList={bookList} categories={categories} />
}

function aggregateBookList(books) {
  return books.map((book) => ({ ...book, copyIds: book.copyIds.join() }))
}
export async function getServerSideProps() {
  // const dbConnection = await dbPromise
  // const collection = await dbConnection.db().collection("books")
  // const books = await collection.find({}).toArray()

  return {
    props: {
      // bookList: aggregateBookList(jsonify(books)),
      bookList: aggregateBookList(books),
      categories: categories,
    },
  }
}
