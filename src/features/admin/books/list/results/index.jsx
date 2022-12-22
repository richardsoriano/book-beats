import { useState } from "react"
import { search, filter } from "./helpers"

import Button from "@/ui/buttons"
import Table from "@/ui/table"
import Modal from "@/ui/modal"
import BookForm from "./book-form"
import { XIcon } from "@heroicons/react/solid"

const newBook = {
  _id: "",
  title: "",
  auth1: "",
  auth2: "",
  yearpublished: "",
  categories: [],
  bigskyaward: "",
  isbn: "",
  nominatedby: "",
  publisher: "",
  paddress1: "",
  paddress2: "",
  pcity: "",
  pstate: "",
  pzip: "",
  pcountry: "",
  pphone: "",
  pemail: "",
  aaddress1: "",
  aaddress2: "",
  acity: "",
  astate: "",
  azip: "",
  acountry: "",
  copyIds: [],
}

export default function BookListResults({
  bookList,
  categories,
  query,
  filteredStatus,
  filteredCategories,
  statuses,
}) {
  const [_books, setBooks] = useState(bookList)
  const [selectedBook, setSelectedBook] = useState(undefined)
  const [bookToDelete, setBookToDelete] = useState(undefined)

  function deleteBook(book) {
    console.log("book to dele", book)
    setBookToDelete(book)
  }
  async function deleteBookConfirmed() {
    console.log("book to delete", bookToDelete)
    const newBook = {
      _id: bookToDelete._id,
      title: "",
      auth1: "",
      auth2: "",
      yearpublished: "",
      categories: [],
      bigskyaward: "",
      isbn: "",
      nominatedby: "",
      publisher: "",
      paddress1: "",
      paddress2: "",
      pcity: "",
      pstate: "",
      pzip: "",
      pcountry: "",
      pphone: "",
      pemail: "",
      aaddress1: "",
      aaddress2: "",
      acity: "",
      astate: "",
      azip: "",
      acountry: "",
      copyIds: [],
    }
    console.log("new book", newBook)
    const res = await fetch(`/api/books/${bookToDelete._id}`, {
      method: "DELETE",
      body: JSON.stringify(newBook),
    })
    setBooks((prev) => prev.filter((_book) => _book._id !== bookToDelete._id))
  }

  return (
    <div>
      <Button onClick={() => setSelectedBook(newBook)}>New Book</Button>
      <Table
        columns={[
          { heading: "ID", sortable: "_id" },
          { heading: "Title", sortable: "title" },
          { heading: "Author 1", sortable: "auth1" },
          { heading: "Author 2", sortable: "auth2" },
          { heading: "Published", sortable: "yearpublished" },
          { heading: "Categories", sortable: "categories" },
          { heading: "BigSkyAward", sortable: "bigskyaward" },
          { heading: "ISBN", sortable: "isbn" },
          { heading: "NomBy", sortable: "nominatedby" },
          { heading: "Publisher", sortable: "publisher" },
          { heading: "Address", sortable: "paddress1" },
          { heading: "Address 2", sortable: "paddress2" },
          { heading: "City", sortable: "pcity" },
          { heading: "State", sortable: "pstate" },
          { heading: "Zip", sortable: "pzip" },
          { heading: "Country", sortable: "pcountry" },
          { heading: "Phone", sortable: "pphone" },
          { heading: "Email", sortable: "pemail" },
          { heading: "Author Address", sortable: "aaddress1" },
          { heading: "Address 2", sortable: "aaddress2" },
          { heading: "City", sortable: "acity" },
          { heading: "State", sortable: "astate" },
          { heading: "Zip", sortable: "azip" },
          { heading: "Country", sortable: "acountry" },
          { heading: "CopyIDs", sortable: "copyIds" },
          { heading: "X", sortable: " " },
        ]}
        rows={filter(
          search(_books, query),
          filteredStatus,
          filteredCategories,
          statuses
        )}
        renderRow={(book, i) => {
          const tdProps = {
            key: { i },
            className: `${i % 2 !== 0 ? "bg-blue-100" : ""} px-6 py-4 p-2`,
            onClick: () => setSelectedBook(book),
          }
          const tdDel = {
            key: { i },
            className: `${i % 2 !== 0 ? "bg-blue-100" : ""}  px-6 py-4 p-2`,
            onClick: () => deleteBook(book),
          }

          return (
            <tr key={book._id}>
              <td {...tdProps}>{book._id}</td>
              <td {...tdProps}>{book.title}</td>
              <td {...tdProps}>{book.auth1}</td>
              <td {...tdProps}>{book.auth2}</td>
              <td {...tdProps}>{book.yearpublished}</td>
              <td {...tdProps}>{book.categories.join(", ")}</td>
              <td {...tdProps}>{book.bigskyaward}</td>
              <td {...tdProps}>{book.isbn}</td>
              <td {...tdProps}>{book.nominatedby}</td>
              <td {...tdProps}>{book.publisher}</td>
              <td {...tdProps}>{book.paddress1}</td>
              <td {...tdProps}>{book.paddress2}</td>
              <td {...tdProps}>{book.pcity}</td>
              <td {...tdProps}>{book.pstate}</td>
              <td {...tdProps}>{book.pzip}</td>
              <td {...tdProps}>{book.pcountry}</td>
              <td {...tdProps}>{book.pphone}</td>
              <td {...tdProps}>{book.pemail}</td>
              <td {...tdProps}>{book.aaddress1}</td>
              <td {...tdProps}>{book.aaddress2}</td>
              <td {...tdProps}>{book.acity}</td>
              <td {...tdProps}>{book.astate}</td>
              <td {...tdProps}>{book.azip}</td>
              <td {...tdProps}>{book.acountry}</td>
              <td {...tdProps}>{book.copyIds.join(", ")}</td>
              <td {...tdDel}>{<XIcon className="w-5 h-5 text-red-500" />}</td>
            </tr>
          )
        }}
      />
      {selectedBook && (
        <Modal open={true} close={() => setSelectedBook(undefined)}>
          <BookForm
            books={_books}
            categories={categories}
            bookProps={selectedBook}
            setBooks={setBooks}
            setSelectedBook={setSelectedBook}
          />
        </Modal>
      )}

      {bookToDelete && (
        <Modal open={bookToDelete} close={() => setBookToDelete(undefined)}>
          <p>
            Are you sure you want to delete the book,
            <strong> {bookToDelete.title}</strong>
          </p>
          <Button
            onClick={() => {
              deleteBookConfirmed()
              setBookToDelete(undefined)
            }}
          >
            Yes
          </Button>
          <Button onClick={() => setBookToDelete(undefined)}>No</Button>
        </Modal>
      )}
    </div>
  )
}
