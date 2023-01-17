import { useState } from "react"
import Papa from "papaparse"
import ProgressBar from "@/ui/progress-bar"
import Button from "@/ui/buttons"

const createBooks = async (arrayOfBooks) => {
  setCurrentStep(2)
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
  const [lastCopyIds, setLastCopyIds] = useState(lastBook.copyIds)
  const [currentStep, setCurrentStep] = useState(0)
  const [progressPercentage, setProgressPercentage] = useState(0)
  const allowedExtensions = ["csv"]
  const [hashMapCategories, setHashMapCategories] = useState({})

  const steps = [
    {
      // component: <BooksAvailable booksNoBags={booksNoBags} />,
      label: "1. Choose CSV File",
    },
    {
      // component: <BagsAvailable bags={bags} />,
      label: "2. Parse File",
    },
    {
      // component: (
      //   <AddBooksToBags
      //     booksNoBags={booksNoBags}
      //     bags={_bags}
      //     setBags={setBags}
      //   />
      // ),
      label: "3. Save to DB",
    },
  ]

  const listStats = () => {
    return (
      <div className="flex justify-around ">
        <ul className="flex px-4">
          <li className="px-4">Total Book Titles:{aggregatedBooks.length}</li>
          {Object.keys(hashMapCategories).map((key) => (
            <li className="px-4">
              {key}: {hashMapCategories[key]}
            </li>
          ))}
        </ul>
      </div>
    )
  }
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
      setCurrentStep(0)
      setProgressPercentage(33)
    }
  }
  function calculateCategories(categories) {
    let newHashMapCategories = {}
    if (categories.length <= 0) {
      return newHashMapCategories
    }
    let arrCategories = categories.split(",")
    for (let i = 0; i < arrCategories.length; i++) {
      if (newHashMapCategories[arrCategories[i]]) {
        newHashMapCategories[arrCategories[i]]++
      } else {
        newHashMapCategories[arrCategories[i]] = 1
      }
    }

    return newHashMapCategories
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

      var lastId = findLastId(lastBook.copyIds)

      parsedData.map((book, i) => {
        categories = createArrayOfCategories(book.categories.trim())
        copyIds = createArrayOfCopyIDs(categories, lastId)
        console.log("copyIds Parse", lastId, copyIds)
        lastId = findLastId(copyIds)

        setHashMapCategories(calculateCategories(book.categories))

        arrayOfBooks.push({
          ...book,
          index: i,
          categories: categories,
          copyIds,
        })
      })

      setAggregatedBooks(arrayOfBooks)

      const columns = Object.keys(parsedData[0])

      setData(columns)
      setCurrentStep(1)
      setProgressPercentage(66)
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
          {lastBook.categories.length ? lastBook.categories.join(",") : ""}
        </strong>
        copyIds:
        <strong className="text-xl font-bold text-blue-600">
          {lastBook.copyIds.length ? lastBook.copyIds.join(",") : ""}
        </strong>
      </h2>
      <ProgressBar progressPercentage={progressPercentage} />
      <div>{steps[currentStep].label}</div>
      <div className="flex items-center justify-around ">
        <div className="p-2 ">
          <input
            className="text-white bg-blue-500 rounded-md "
            onChange={handleFileChange}
            id="csvInput"
            name="file"
            type="File"
          />
        </div>
        <Button onClick={() => handleParse()}>Parse</Button>
        <Button onClick={() => createBooks(aggregatedBooks)}>Save</Button>
      </div>
      <h1 className="text-2xl font-bold">List Stats</h1>
      {listStats()}
      <div style={{ marginTop: "3rem" }}>
        {error ? (
          error
        ) : (
          <table className="border border-separate table-auto border-spacing-2 border-slate-500 whitespace-nowrap ">
            <thead>
              <tr>
                <th className="">EntryId</th>
                <th className="">Title</th>
                <th className="">Status</th>
                <th className="">Memo</th>
                <th className="">Author 1</th>
                <th className="">Author 2</th>
                <th className="">Year Published</th>
                <th className="">Categories</th>
                <th className="">Big Sky Award</th>
                <th className="">isbn</th>
                <th className="">Nominated By</th>
                <th className="">Publisher</th>
                <th className="">Pub Address1</th>
                <th className="">Pub Address2</th>
                <th className="">Pub City</th>
                <th className="">Pub State</th>
                <th className="">Pub Zip</th>
                <th className="">Pub Country</th>
                <th className="">Pub Phone</th>
                <th className="">Pub Email</th>
                <th className="">Auth Address1</th>
                <th className="">Auth Address2</th>
                <th className="">Auth City</th>
                <th className="">Auth State</th>
                <th className="">Auth Zip</th>
                <th className="">Auth Country</th>
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
                    <td {...tdProps}>{book.nomstatus}</td>
                    <td {...tdProps}>{book.nommemo}</td>
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
