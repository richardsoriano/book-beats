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
  // console.log("BookCopyIdHashMap", BookCopyIdHashMap)
  // remove books where all the copyIds are in bags.
  // return books where at least 1 copyId is in a bag.
  let myBooks = books.map((book) => ({
    ...book,
    copyIds: book.copyIds.filter((copyId) => {
      if (isCopyIdBagged(BookCopyIdHashMap, copyId) === undefined) {
        return copyId
      }
    }),
  }))
  return myBooks.filter((book) => book.copyIds.length)
}

function isCopyIdBagged(BookCopyIdHashMap, copyId) {
  return BookCopyIdHashMap.get(copyId)
}
function createBaggedCopyIdHashMap(bags) {
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
