import { useState } from "react"
import { search, filter } from "./helpers"

import Button from "@/ui/buttons"
import Table from "@/ui/table"
import Modal from "@/ui/modal"
import BookForm from "./book-form"
import { XIcon } from "@heroicons/react/solid"
import {
  DataGrid,
  GridToolbarExport,
  GridToolbarContainer,
} from "@material-ui/data-grid"

const eventCodeDefault = "hpbaw2023"
const newBook = {
  _id: "",
  entryid: "",
  title: "",
  nomstatus: "",
  nommemo: "",
  author1: "",
  author2: "",
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
  createddate: "",
  qualifiedstatus: "",
  copyIds: "",
  eventCode: eventCodeDefault,
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

  function MyExportButton() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    )
  }

  function deleteBook(book) {
    console.log("book to dele", book)
    setBookToDelete(book)
  }
  async function deleteBookConfirmed() {
    console.log("book to delete", bookToDelete)
    const newBook = {
      _id: bookToDelete._id,
      entryid: "",
      title: "",
      nomstatus: "",
      nommemo: "",
      author1: "",
      author2: "",
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
      aphone: "",
      aemail: "",
      aaddress1: "",
      aaddress2: "",
      acity: "",
      astate: "",
      azip: "",
      acountry: "",
      createddate: "",
      qualifiedstatus: "",
      copyIds: "",
      eventCode: eventCodeDefault,
    }
    console.log("new book", newBook)
    const res = await fetch(`/api/books/${bookToDelete._id}`, {
      method: "DELETE",
      body: JSON.stringify(newBook),
    })
    setBooks((prev) => prev.filter((_book) => _book._id !== bookToDelete._id))
  }
  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "bookId", headerName: "Book ID", width: 200 },
    { field: "title", headerName: "Title", width: 500 },
    { field: "nomstatus", headerName: "Status", width: 200 },
    { field: "nommemo", headerName: "Memo", width: 200 },
    { field: "author1", headerName: "Author 1", width: 200 },
    { field: "categories", headerName: "Categories", width: 500 },
    { field: "copyIds", headerName: "Copy ID", width: 300 },
    { field: "eventCode", headerName: "Event Code", width: 300 },
  ]

  const rows = _books.map((_book, i) => ({
    id: i,
    bookId: _book.entryid,
    title: _book.title,
    nomstatus: _book.nomstatus,
    nommemo: _book.nommemo,
    author1: _book.author1,
    categories: _book.categories.join(", "),
    copyIds: _book.copyIds,
    eventCode: _book.eventCode,
  }))

  return (
    <div>
      <Button onClick={() => setSelectedBook(newBook)}>New Book</Button>
      <div style={{ height: 400, width: "90%" }}>
        <h4>Export to CSV</h4>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          components={{
            Toolbar: MyExportButton,
          }}
        />
      </div>
      <Table
        columns={[
          { heading: "EntryID", sortable: "entryid" },
          { heading: "Title", sortable: "title" },
          { heading: "Status", sortable: "nomstatuses" },
          { heading: "Memo", sortable: "nommemo" },
          { heading: "Author 1", sortable: "author1" },
          { heading: "Author 2", sortable: "author2" },
          { heading: "Categories", sortable: "categories" },
          { heading: "BigSkyAward", sortable: "bigskyaward" },
          { heading: "ISBN", sortable: "isbn" },
          { heading: "NomBy", sortable: "nominatedby" },
          { heading: "Publisher", sortable: "publisher" },
          { heading: "Pub Address", sortable: "paddress1" },
          { heading: "Pub Address 2", sortable: "paddress2" },
          { heading: "Pub City", sortable: "pcity" },
          { heading: "Pub State", sortable: "pstate" },
          { heading: "Pub Zip", sortable: "pzip" },
          { heading: "Pub Country", sortable: "pcountry" },
          { heading: "Pub Phone", sortable: "pphone" },
          { heading: "Pub Email", sortable: "pemail" },
          { heading: "Auth Phone", sortable: "aphone" },
          { heading: "Auth Email", sortable: "aemail" },
          { heading: "Auth Address 1", sortable: "aaddress1" },
          { heading: "Auth Address 2", sortable: "aaddress2" },
          { heading: "Auth City", sortable: "acity" },
          { heading: "Auth State", sortable: "astate" },
          { heading: "Auth Zip", sortable: "azip" },
          { heading: "Auth Country", sortable: "acountry" },

          { heading: "Created Date", sortable: "createddate" },
          { heading: "Qualified", sortable: "qualifiedstatus" },
          { heading: "CopyIDs", sortable: "copyIds" },
          { heading: "Event Code", sortable: "eventCode" },
          { heading: "X", sortable: false },
        ]}
        rows={filter(
          search(_books, query),
          filteredStatus,
          filteredCategories,
          statuses
        )}
        renderRow={(book, i) => {
          const tdProps = {
            className: `${i % 2 !== 0 ? "bg-blue-100" : ""} px-2 py-4 p-2`,
            onClick: () => setSelectedBook(book),
          }
          const tdDel = {
            className: `${i % 2 !== 0 ? "bg-blue-100" : ""}  px-2 py-4 p-2`,
            onClick: () => deleteBook(book),
          }

          return (
            <tr key={book.uniqueId}>
              <td {...tdProps}>{book.entryid}</td>
              <td {...tdProps}>{book.title}</td>
              <td {...tdProps}>{book.nomstatus}</td>
              <td {...tdProps}>{book.nommemo}</td>
              <td {...tdProps}>{book.author1}</td>
              <td {...tdProps}>{book.author2}</td>
              <td {...tdProps}>
                {book.categories.length ? book.categories.join(", ") : ""}
              </td>
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
              <td {...tdProps}>{book.aphone}</td>
              <td {...tdProps}>{book.aemail}</td>
              <td {...tdProps}>{book.aaddress1}</td>
              <td {...tdProps}>{book.aaddress2}</td>
              <td {...tdProps}>{book.acity}</td>
              <td {...tdProps}>{book.astate}</td>
              <td {...tdProps}>{book.azip}</td>
              <td {...tdProps}>{book.acountry}</td>
              <td {...tdProps}>{book.createddate}</td>
              <td {...tdProps}>{book.qualifiedstatus}</td>
              <td {...tdProps}>{book.copyIds}</td>
              <td {...tdProps}>{book.eventCode}</td>
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
