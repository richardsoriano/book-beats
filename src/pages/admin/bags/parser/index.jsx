import BagParser from "@/features/admin/bags/parser/"
import categories from "@/data/categories"
import bags from "@/data/bags"
import books from "@/data/books"

export default function AdminBagsParserPage({ categories, books, bags }) {
  return <BagParser categories={categories} books={books} bags={bags} />
}

export async function getServerSideProps() {
  return {
    props: {
      categories: categories,
      books: books,
      bags: bags,
    },
  }
}
