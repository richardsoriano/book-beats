import { useState } from "react"
import Button from "@/ui/buttons"
import TextField from "ui/text-field"
import AttachCategories from "./attachCategories"
import AttachCopyIds from "./attachCopyIds"
export default function BookForm({
  books,
  categories,
  bookProps,
  setBooks = () => {},
  setSelectedBook = () => {},
}) {
  const [book, setBook] = useState(bookProps)
  const [_categories, setCategories] = useState(categories)
  const [_copyIds, setCopyIds] = useState([])

  async function saveBook() {
    const bookId = book._id ? book._id : ""

    let newBook
    console.log("book,", book)
    const res = await fetch(`/api/books/${bookId}`, {
      method: bookId ? "PATCH" : "POST",
      body: JSON.stringify(book),
    })
      .then((res) => res.json())
      .then((data) => {
        // enter you logic when the fetch is successful
        newBook = {
          _id: data._id,
          title: data.title,
          auth1: data.auth1,
          auth2: data.auth2,
          yearpublished: data.yearpublished,
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
          aaddress1: data.aaddress1,
          aaddress2: data.aaddress2,
          acity: data.acity,
          astate: data.astate,
          azip: data.azip,
          acountry: data.acountry,
          copyIds: data.copyIds,
        }
      })
    if (bookId !== "") {
      books.map((_book) => console.log(_book._id))
      setBooks((prev) => prev.filter((_book) => _book._id !== newBook._id))
      books.map((_book) => console.log(_book._id))
    }
    setBooks((prev) => [...prev, newBook])
    setSelectedBook(undefined)
  }
  return (
    <div>
      <div className="py-6">
        <h2 className="text-4xl text-blue-400">Edit Book</h2>
        <TextField
          label="Title"
          value={book.title}
          onChange={(title) => setBook((prev) => ({ ...prev, title }))}
        />
        <TextField
          label="Author 1"
          value={book.auth1}
          onChange={(auth1) => setBook((prev) => ({ ...prev, auth1 }))}
        />
        <TextField
          label="Author 2"
          value={book.auth2}
          onChange={(auth2) => setBook((prev) => ({ ...prev, auth2 }))}
        />
        <TextField
          label="Year Published"
          value={book.yearpublished}
          onChange={(yearpublished) =>
            setBook((prev) => ({ ...prev, yearpublished }))
          }
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
          label="Address"
          value={book.paddress1}
          onChange={(paddress1) => setBook((prev) => ({ ...prev, paddress1 }))}
        />
        <TextField
          label="Address 2"
          value={book.paddress2}
          onChange={(paddress2) => setBook((prev) => ({ ...prev, paddress2 }))}
        />
        <TextField
          label="City"
          value={book.pcity}
          onChange={(pcity) => setBook((prev) => ({ ...prev, pcity }))}
        />
        <TextField
          label="State"
          value={book.pstate}
          onChange={(pstate) => setBook((prev) => ({ ...prev, pstate }))}
        />
        <TextField
          label="Zip"
          value={book.pzip}
          onChange={(pzip) => setBook((prev) => ({ ...prev, pzip }))}
        />
        <TextField
          label="Country"
          value={book.pcountry}
          onChange={(pcountry) => setBook((prev) => ({ ...prev, pcountry }))}
        />
        <TextField
          label="Phone"
          value={book.pphone}
          onChange={(pphone) => setBook((prev) => ({ ...prev, pphone }))}
        />{" "}
        <TextField
          label="Email"
          value={book.pemail}
          onChange={(pemail) => setBook((prev) => ({ ...prev, pemail }))}
        />
        <TextField
          label="Address"
          value={book.aaddress1}
          onChange={(aaddress1) => setBook((prev) => ({ ...prev, aaddress1 }))}
        />
        <TextField
          label="Address 2"
          value={book.aaddress2}
          onChange={(aaddress2) => setBook((prev) => ({ ...prev, aaddress2 }))}
        />
        <TextField
          label="City"
          value={book.acity}
          onChange={(acity) => setBook((prev) => ({ ...prev, acity }))}
        />
        <TextField
          label="State"
          value={book.astate}
          onChange={(astate) => setBook((prev) => ({ ...prev, astate }))}
        />
        <TextField
          label="Zip"
          value={book.azip}
          onChange={(azip) => setBook((prev) => ({ ...prev, azip }))}
        />
        <TextField
          label="Country"
          value={book.acountry}
          onChange={(acountry) => setBook((prev) => ({ ...prev, acountry }))}
        />
        <AttachCopyIds copyIds={_copyIds} book={book} setBook={setBook} />
      </div>
      <Button onClick={saveBook}>Save</Button>
    </div>
  )
}
