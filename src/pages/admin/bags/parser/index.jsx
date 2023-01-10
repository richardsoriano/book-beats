import BagParser from "@/features/admin/bags/parser/"
import categories from "@/data/categories"
import bags from "@/data/bags"
import books from "@/data/books"

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
        // console.log("is in Not bag", copyId)
        return copyId
      }
    }),
  }))
}

function isCopyIdBagged(BookCopyIdHashMap, copyId) {
  return BookCopyIdHashMap.get(copyId.toString())
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
export async function getServerSideProps() {
  return {
    props: {
      categories: categories,
      booksNoBags: aggregateBooksNeedBags(books, bags),
      books: books,
      bags: bags,
    },
  }
}
