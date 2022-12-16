import { useState } from "react"
import Papa from "papaparse"

export default function ParseData({}) {
  const [data, setData] = useState([])
  const [error, setError] = useState("")
  const [file, setFile] = useState("")

  const allowedExtensions = ["csv"]

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
  const createAuthor = async (arrayOfAuthors) => {
    const res = await fetch(`/api/parser/`, {
      method: "POST",
      headers: { "Content-type": "application/json;charset=UTF-8" },
      body: JSON.stringify(arrayOfAuthors),
    }).then((res) => res.json())
    return
  }
  const createArrayOfCategories = (auth) => {
    let categories = []
    let copies = 0
    if (auth.category3 === "") {
      console.log("blank", auth.category3)
    }
    if (auth.category3 === null) {
      console.log("null", auth.category3)
    }

    if (auth.category1 !== null && auth.category1 !== "") {
      copies = 4
      categories.push(auth.category1)
    }
    if (auth.category2 !== null && auth.category2 !== "") {
      copies = 8
      categories.push(auth.category2)
    }
    if (auth.category3 !== null && auth.category3 !== "") {
      copies = 12
      categories.push(auth.category3)
    }

    console.log("categories", categories)
    return categories
  }
  const createArrayOfCopyIDs = (count) => {
    let copyIDs = []
    for (let i = 0; i < count; i++) {
      copyIDs.push(getRandomInteger())
    }
    return copyIDs
  }
  const getRandomInteger = () => {
    return Math.floor(Math.random() * 100000) + 1
  }
  const handleParse = () => {
    if (!file) return setError("Enter a valid file")

    const reader = new FileReader()
    reader.onload = async ({ target }) => {
      const csv = Papa.parse(target.result, { header: true })
      const parsedData = csv?.data

      //      const dbConnection = await dbPromise
      //      const collection = await dbConnection.db().collection('bags')
      //      const bags = await collection.find({}).toArray()
      // read index from last database
      // otherwise use 1000 + i;
      // arrayOfAuthors

      var arrayOfAuthors = []
      parsedData.map((author, i) => {
        let categories = createArrayOfCategories(author)
        let copies = createArrayOfCopyIDs(categories.length)
        arrayOfAuthors.push({
          ...author,
          index: i,
          categories: categories,
          copies: copies,
        })
      })
      console.log("array of authors", arrayOfAuthors)

      createAuthor(arrayOfAuthors)
      const columns = Object.keys(parsedData[0])

      setData(columns)
    }
    reader.readAsText(file)
  }

  return (
    <div>
      <div>
        <label htmlFor="csvInput" style={{ display: "block" }}>
          Enter CSV File
        </label>
        <input
          onChange={handleFileChange}
          id="csvInput"
          name="file"
          type="File"
        />
        <div>
          <button onClick={handleParse}>Parse</button>
        </div>
        <div style={{ marginTop: "3rem" }}>
          {error ? error : data.map((col, idx) => <div key={idx}>{col}</div>)}
        </div>
      </div>
    </div>
  )
}
