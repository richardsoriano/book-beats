import AdminBooksParser from "@/features/admin/books/parser"
import dbPromise, { jsonify } from "@/modules/mongodb"

export default function ParseData({ lastBook }) {
  return <AdminBooksParser lastBook={lastBook} />
}

function aggregateBookCopyIDs(books) {
  // if no last book, create one and send it.

  const defaultBookCategories = ["fiction"]
  const defaultCopyIds = ["1000"]

  if (books.length === 0) {
    const lastBook = {
      title: "Empty Book List",
      categories: defaultBookCategories,
      copyIds: defaultCopyIds,
    }
    books.push(lastBook)
  }

  return books[0]
}

export async function getServerSideProps() {
  const dbConnection = await dbPromise
  const collectionBooks = await dbConnection.db().collection("books")

  const books = await collectionBooks
    .find({})
    .sort({ _id: -1 })
    .limit(1)
    .toArray()

  return {
    props: {
      lastBook: aggregateBookCopyIDs(jsonify(books)),
    },
  }
}
