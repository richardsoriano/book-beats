import { useState } from "react"
import Papa from "papaparse"

import Button from "@/ui/buttons"

const createBooks = async (arrayOfBooks) => {
  const res = await fetch(`/api/parser/`, {
    method: "POST",
    headers: { "Content-type": "application/json;charset=UTF-8" },
    body: JSON.stringify(arrayOfBooks),
  }).then((res) => res.json())
  return
}

const createArrayOfCategories = (categories) => {
  const arrCategories = categories.split(",")

  return arrCategories.map((c) => c.trim())
}
const findLastId = (lastCopyIds) => {
  return parseInt(lastCopyIds[lastCopyIds.length - 1])
}
const createArrayOfCopyIDs = (categories, lastId) => {
  let newCopyIds = []
  let numOfCategories = categories.length * 4

  for (let i = 1; i <= numOfCategories; i++) {
    newCopyIds.push(lastId + i)
  }

  return newCopyIds
}

export default function AdminBooksParser({ lastBook }) {
  const [data, setData] = useState([])
  const [error, setError] = useState("")
  const [file, setFile] = useState("")
  const [aggregatedBooks, setAggregatedBooks] = useState([])
  // const [lastCopyIds, setLastCopyIds] = useState(lastBook.copyIds)

  const allowedExtensions = ["csv"]

  // console.log("book=", lastBook.copyIds)

  const handleFileChange = (e) => {
    setError("")

    if (e.target.files.length) {
      const inputFile = e.target.files[0]

      const fileExtension = inputFile?.type.split("/")[1]
      if (!allowedExtensions.includes(fileExtension)) {
        setError("Please input a csv file")
        return
      }
      setFile(inputFile)
    }
  }

  const handleParse = () => {
    if (!file) return setError("Enter a valid file")

    const reader = new FileReader()
    reader.onload = async ({ target }) => {
      const csv = Papa.parse(target.result, { header: true })
      const parsedData = csv?.data

      var arrayOfBooks = []
      var copyIds
      var categories
      // console.log("lastCopyIds", lastBook.copyIds)

      var lastId = findLastId(lastBook.copyIds)
      // console.log("last Id", lastId)
      // console.log("parsedData=", parsedData)

      parsedData.map((book, i) => {
        categories = createArrayOfCategories(book.categories.trim())
        copyIds = createArrayOfCopyIDs(categories, lastId)
        lastId = findLastId(copyIds)
        // console.log("after", lastId)
        const newBook = {
          ...book,
          index: i,
          categories: categories,
          copyIds,
        }

        arrayOfBooks.push({
          ...book,
          index: i,
          categories: categories,
          copyIds,
        })
      })
      // console.log("array of Books", arrayOfBooks)
      setAggregatedBooks(arrayOfBooks)
      // createBooks(arrayOfBooks)
      const columns = Object.keys(parsedData[0])
      // console.log(columns)
      setData(columns)
    }
    reader.readAsText(file)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Import Books</h1>
      <h2>
        Last Book{" "}
        <strong className="text-xl font-bold text-blue-600">
          {lastBook.title}
        </strong>
        Category{" "}
        <strong className="text-xl font-bold text-blue-600">
          {lastBook.categories.join(",")}
        </strong>
        copyIds:
        <strong className="text-xl font-bold text-blue-600">
          {lastBook.copyIds.join(",")}
        </strong>
      </h2>
      <label className="text-2xl">Enter CSV File</label>
      <div className="p-4 ">
        <input
          className="text-white bg-blue-500 rounded-md "
          onChange={handleFileChange}
          id="csvInput"
          name="file"
          type="File"
        />
      </div>
      <div className="p-4">
        <Button onClick={handleParse}>Parse</Button>
      </div>
      <div style={{ marginTop: "3rem" }}>
        {error ? (
          error
        ) : (
          <table className="border border-separate table-auto border-spacing-2 border-slate-500 whitespace-nowrap ">
            <thead>
              <tr>
                <th className="">EntryId</th>
                <th className="">title</th>
                <th className="">auth1</th>
                <th className="">auth2</th>
                <th className="">yearpublished</th>
                <th className="">categories</th>
                <th className="">bigskyaward</th>
                <th className="">isbn</th>
                <th className="">nominatedby</th>
                <th className="">publisher</th>
                <th className="">paddress1</th>
                <th className="">paddress2</th>
                <th className="">pcity</th>
                <th className="">pstate</th>
                <th className="">pzip</th>
                <th className="">pcountry</th>
                <th className="">pphone</th>
                <th className="">pemail</th>
                <th className="">aaddress1</th>
                <th className="">aaddress2</th>
                <th className="">acity</th>
                <th className="">astate</th>
                <th className="">azip</th>
                <th className="">acountry</th>
                <th className="">copyIds</th>
              </tr>
            </thead>
            <tbody>
              {aggregatedBooks.map((book, i) => {
                const tdProps = {
                  className: `${
                    i % 2 !== 0 ? "bg-blue-100" : ""
                  } px-4 py-4 p-4`,
                }
                return (
                  <tr key={i}>
                    <td {...tdProps}>{book.entryid}</td>
                    <td {...tdProps}>{book.title.substr(0, 50)}</td>
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
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
        <div className="p-4">
          <Button onClick={() => createBooks(aggregatedBooks)}>
            Save Books to Database
          </Button>
        </div>
      </div>
    </div>
  )
}
