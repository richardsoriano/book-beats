import dbPromise, { jsonify } from "@/modules/mongodb"

import BagParser from "@/features/admin/bags/parser/"
import categories from "@/data/categories"
// import bags from "@/data/bags"
// import books from "@/data/books"

export default function AdminBagsParserPage({
  categories,
  books,
  booksNoBags,
  bags,
}) {
  return (
    <BagParser
      categories={categories}
      books={books}
      booksNoBags={booksNoBags}
      bags={bags}
    />
  )
}

function aggregateBooksNeedBags(books, bags) {
  let BookCopyIdHashMap = createBaggedCopyIdHashMap(bags)

  // console.log("book need bags", books.map((book) => ({
  //   ...book,
  //   copyIds: book.copyIds.filter((copyId) => {
  //     if (isCopyIdBagged(BookCopyIdHashMap, copyId) === undefined) {
  //       console.log("is in Not bag", copyId)
  //       return copyId
  //     }
  //   }),
  // }))
  //)

  return books.map((book) => ({
    ...book,
    copyIds: book.copyIds.filter((copyId) => {
      if (isCopyIdBagged(BookCopyIdHashMap, copyId) === undefined) {
        console.log("is in Not bag", copyId)
        return copyId
      }
    }),
  }))
}

function isCopyIdBagged(BookCopyIdHashMap, copyId) {
  return BookCopyIdHashMap.get(copyId.toString())
}
function createBaggedCopyIdHashMap(bags) {
  console.log("created Bags HM", bags)
  let BookCopyIdHashMap = new Map()

  for (let i = 0; i < bags.length; i++) {
    for (let j = 0; j < bags[i].copyIds.length; j++) {
      BookCopyIdHashMap.set(bags[i].copyIds[j], true)
    }
  }
  return BookCopyIdHashMap
}
function aggregateBooks(books) {
  return books
}
function aggregateBags(bags) {
  return bags
}

export async function getServerSideProps() {
  const dbConnection = await dbPromise
  const collectionBags = await dbConnection.db().collection("bags")
  const bags = await collectionBags.find({}).sort({ name: 1 }).toArray()

  const collectionBooks = await dbConnection.db().collection("books")
  const books = await collectionBooks.find({}).sort({ title: 1 }).toArray()
  // const collectionReaders = await dbConnection.db().collection("readers")
  // const readers = await collectionReaders.find({}).sort({ name: 1 }).toArray()
  console.log("bags", bags.length)
  return {
    props: {
      categories: categories,
      booksNoBags: aggregateBooksNeedBags(jsonify(books), jsonify(bags)),
      // booksNoBags: aggregateBooks(jsonify(books)),
      books: aggregateBooks(jsonify(books)),
      bags: aggregateBags(jsonify(bags)),
    },
  }
}
