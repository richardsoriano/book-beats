import { useEffect, useState } from "react"
import Button from "@/ui/buttons"
import TextField from "ui/text-field"
import AttachCategories from "./attachCategories"
import AttachCopyIds from "./attachCopyIds"
import AttachNomStatus from "./attachNomStatus"
import AttachQualifiedStatus from "./attachQualifiedStatus"
const nomstatuses = ["Need Payment", "Need Books", "Complete"]
const qualifiedstatuses = ["Yes", "No", "Partial"]

export default function BookForm({
  books,
  categories,

  bookProps,
  setBooks = () => {},
  setSelectedBook = () => {},
}) {
  const [book, setBook] = useState(bookProps)
  const [_categories, setCategories] = useState(categories)

  async function saveBook() {
    const bookId = book._id ? book._id : ""

    //prevents empty entries for entryid, book title and author
    if(book.entryid.trim() === '') return; 
    if(book.title.trim() === '') return;
    if(book.author1.trim() === '') return; 

    let newBook
    console.log("book,", book)
    const res = await fetch(`/api/books/${bookId}`, {
      header: {
        "Content-Type": "application/json",
      },
      method: bookId ? "PATCH" : "POST",
      body: JSON.stringify(book),
    })
      .then((res) => res.json())
      .then((data) => {
        // enter you logic when the fetch is successful
        newBook = {
          _id: data._id,
          entryid: data.entryid,
          title: data.title,
          nomstatus: data.nomstatus,
          nommemo: data.nommemo,
          author1: data.author1,
          author2: data.author2,
          qualified: data.qualified,
          categories: data.categories,
          bigskyaward: data.bigskyaward,
          isbn: data.isbn,
          nominatedby: data.nominatedby,
          publisher: data.publisher,
          paddress1: data.paddress1,
          paddress2: data.paddress2,
          pcity: data.pcity,
          pstate: data.pstate,
          pzip: data.pzip,
          pcountry: data.pcountry,
          pphone: data.pphone,
          pemail: data.pemail,
          aphone: data.aphone,
          aemail: data.aemail,
          aaddress1: data.aaddress1,
          aaddress2: data.aaddress2,
          acity: data.acity,
          astate: data.astate,
          azip: data.azip,
          acountry: data.acountry,
          createddate: data.createddate,
          qualifiedstatus: data.qualifiedstatus,
          copyIds: data.copyIds,
        }
      })
    if (bookId !== "") {
      setBooks((prev) => prev.filter((_book) => _book._id !== newBook._id))
    }
    setBooks((prev) => [...prev, newBook])
    setSelectedBook(undefined)
  }

  // make edits for line 88
  return (
    <div>
      <div className="py-6">
        {book._id ? (
          <h2 className="text-4xl text-blue-400">Edit Book</h2>
        ) : (
          <h2 className="text-4xl text-blue-400">Add Book</h2>
        )}
        <TextField
          label="Entry ID"
          value={book.entryid}
          onChange={(entryid) => setBook((prev) => ({ ...prev, entryid }))}
        />
        <TextField
          label="Title"
          value={book.title}
          onChange={(title) => setBook((prev) => ({ ...prev, title }))}
        />
        <AttachNomStatus
          nomstatuses={nomstatuses}
          book={book}
          setBook={setBook}
        />
        <TextField
          label="Nomination Memo"
          value={book.nommemo}
          onChange={(nommemo) => setBook((prev) => ({ ...prev, nommemo }))}
        />
        <TextField
          label="Author 1"
          value={book.author1}
          onChange={(author1) => setBook((prev) => ({ ...prev, author1 }))}
        />
        <TextField
          label="Author 2"
          value={book.author2}
          onChange={(author2) => setBook((prev) => ({ ...prev, author2 }))}
        />
        <AttachCategories
          categories={_categories}
          book={book}
          setBook={setBook}
        />
        <TextField
          label="Big Sky Award"
          value={book.bigskyaward}
          onChange={(bigskyaward) =>
            setBook((prev) => ({ ...prev, bigskyaward }))
          }
        />
        <TextField
          label="ISBN"
          value={book.isbn}
          onChange={(isbn) => setBook((prev) => ({ ...prev, isbn }))}
        />
        <TextField
          label="Nominated By"
          value={book.nominatedby}
          onChange={(nominatedby) =>
            setBook((prev) => ({ ...prev, nominatedby }))
          }
        />
        <TextField
          label="Publisher"
          value={book.publisher}
          onChange={(publisher) => setBook((prev) => ({ ...prev, publisher }))}
        />
        <TextField
          label="Pub Address"
          value={book.paddress1}
          onChange={(paddress1) => setBook((prev) => ({ ...prev, paddress1 }))}
        />
        <TextField
          label="Pub Address 2"
          value={book.paddress2}
          onChange={(paddress2) => setBook((prev) => ({ ...prev, paddress2 }))}
        />
        <TextField
          label="Pub City"
          value={book.pcity}
          onChange={(pcity) => setBook((prev) => ({ ...prev, pcity }))}
        />
        <TextField
          label="Pub State"
          value={book.pstate}
          onChange={(pstate) => setBook((prev) => ({ ...prev, pstate }))}
        />
        <TextField
          label="Pub Zip"
          value={book.pzip}
          onChange={(pzip) => setBook((prev) => ({ ...prev, pzip }))}
        />
        <TextField
          label="Pub Country"
          value={book.pcountry}
          onChange={(pcountry) => setBook((prev) => ({ ...prev, pcountry }))}
        />
        <TextField
          label="Pub Phone"
          value={book.pphone}
          onChange={(pphone) => setBook((prev) => ({ ...prev, pphone }))}
        />{" "}
        <TextField
          label="Pub Email"
          value={book.pemail}
          onChange={(pemail) => setBook((prev) => ({ ...prev, pemail }))}
        />
        <TextField
          label="Auth Phone"
          value={book.aphone}
          onChange={(aphone) => setBook((prev) => ({ ...prev, aphone }))}
        />{" "}
        <TextField
          label="Auth Email"
          value={book.aemail}
          onChange={(aemail) => setBook((prev) => ({ ...prev, aemail }))}
        />
        <TextField
          label="Auth Address"
          value={book.aaddress1}
          onChange={(aaddress1) => setBook((prev) => ({ ...prev, aaddress1 }))}
        />
        <TextField
          label="Auth Address 2"
          value={book.aaddress2}
          onChange={(aaddress2) => setBook((prev) => ({ ...prev, aaddress2 }))}
        />
        <TextField
          label="Auth City"
          value={book.acity}
          onChange={(acity) => setBook((prev) => ({ ...prev, acity }))}
        />
        <TextField
          label="Auth State"
          value={book.astate}
          onChange={(astate) => setBook((prev) => ({ ...prev, astate }))}
        />
        <TextField
          label="Auth Zip"
          value={book.azip}
          onChange={(azip) => setBook((prev) => ({ ...prev, azip }))}
        />
        <TextField
          label="Auth Country"
          value={book.acountry}
          onChange={(acountry) => setBook((prev) => ({ ...prev, acountry }))}
        />
        <TextField
          label="Created Date"
          value={book.createddate}
          onChange={(createddate) =>
            setBook((prev) => ({ ...prev, createddate }))
          }
        />
        <AttachQualifiedStatus
          qualifiedstatuses={qualifiedstatuses}
          book={book}
          setBook={setBook}
        />
        <AttachCopyIds book={book} setBook={setBook} />
      </div>
      <Button onClick={saveBook}>Save</Button>
    </div>
  )
}
