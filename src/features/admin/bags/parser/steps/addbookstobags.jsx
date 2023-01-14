import { useState, useEffect } from "react"

import Table from "ui/table"

import { getBookCategoryExcluded, isBagAvailable } from "./helper"
import Button from "ui/buttons"
export default function AddBooksToBags({
  booksNoBags,
  bags,
  setBags = () => {},
}) {
  const [bagsNew, setBagsNew] = useState(0)
  const [booksAvailable, setBooksAvailable] = useState(booksNoBags.length)
  const [booksPlacedInBags, setBooksPlacedInBags] = useState(0)
  const [isReady, setIsReady] = useState(true)
  const [isSavedToDb, setIsSavedToDb] = useState(false)
  useEffect(
    (isReady) => {
      if (!isReady) return
    },
    [isReady]
  )

  function addBooktoBag(index, i, j) {
    let newBag_id = bags[index]._id
    let newBagBooks = bags[index].books
    let newBagTitles = bags[index].titles
    let newBagCopyIds = bags[index].copyIds
    let newBagName = bags[index].name
    let newBagCategory = bags[index].category
    let newBagAssigned = bags[index].assigned
    let newBagPickupStatus = bags[index].pickupstatus
    let newBookTitle = booksNoBags[i].title
    let newBookCopyIds = booksNoBags[i].copyIds[j]
    let newBookId = booksNoBags[i]._id

    newBagTitles.push(newBookTitle)
    newBagCopyIds.push(newBookCopyIds)
    newBagBooks.push(newBookId)

    let tmpBag = {
      _id: newBag_id,
      name: newBagName,
      category: newBagCategory,
      assigned: newBagAssigned,
      pickupstatus: newBagPickupStatus,
      books: newBagBooks,
      titles: newBagTitles,
      copyIds: newBagCopyIds,
    }

    setBags((prev) => prev.filter((_bag) => _bag._id !== bags[index]._id))
    setBags((prev) => [...prev, tmpBag])
    setBooksPlacedInBags((prev) => prev + 1)
  }

  function createNewBag(i, j, indexCopyId) {
    let newBagCategory = getBookCategoryExcluded(booksNoBags[i], j)
    let newBagName = `${newBagCategory}${Math.floor(Math.random() * 10000)}`

    let newBag = {
      name: newBagName,
      category: newBagCategory,
      assigned: "",
      pickupstatus: "needs pickup",
      books: [],
      titles: [],
      copyIds: [],
    }
    let newBookId = booksNoBags[i]._id
    let newBookTitle = booksNoBags[i].title
    let newBookCopyIds = booksNoBags[i].copyIds[indexCopyId]

    newBag.books.push(newBookId)
    newBag.titles.push(newBookTitle)
    newBag.copyIds.push(newBookCopyIds)
    console.log("New Bag created ", newBag)
    setBags((prev) => [...prev, newBag])
    setBooksPlacedInBags((prev) => prev + 1)
    setBagsNew((prev) => prev + 1)
  }

  function handleParseBooksBags() {
    const newBag = {
      _id: "",
      name: "",
      books: [],
      titles: [],
      copyIds: [],
    }
    console.log("handling books", booksNoBags)
    console.log(newBag.hasOwnProperty("_id"))
    let index
    for (let i = 0; i < booksNoBags.length; i++) {
      for (let j = 0; j < booksNoBags[i].categories.length; j++) {
        // console.log("cat", booksNoBags[i].categories[j])
        for (let k = 0; k < 4; k++) {
          let indexCopyId = j * 4 + k
          index = isBagAvailable(
            booksNoBags[i],
            booksNoBags[i].copyIds[indexCopyId],
            bags,
            booksNoBags[i].categories[j]
          )
          // console.log("current book", booksNoBags[i].copyIds[indexCopyId])

          if (index >= 0) {
            // found a Bag
            console.log("found a bag", index)
            // console.log("book", booksNoBags[i])
            // console.log("bag", bags[index])
            addBooktoBag(index, i, indexCopyId)
          } else {
            console.log("create a bag")
            // console.log("book", booksNoBags[i])
            createNewBag(i, j, indexCopyId)
          }
        }
      }
    }
    setIsReady(false)
  }
  async function SaveBags() {
    const res = await fetch("/api/bags/parser", {
      method: "POST",
      body: JSON.stringify(bags),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data)
      })

    setIsSavedToDb(true)
  }
  return (
    <>
      <h2>Add Bags to Books</h2>

      <div>
        <Button onClick={() => handleParseBooksBags()}>Parse</Button>
        <Button onClick={() => SaveBags()}>Save Bags</Button>
        {isSavedToDb && <h2>Saved To Database</h2>}
        {/* {isReady ? (
          <Button onClick={() => handleAddBooks()}>Add</Button>
        ) : (
          <div className="text-2xl text-red-600">Added Books to Bags!</div>
        )} */}
      </div>
      <div className="flex-col justify-end">
        <div className="flex justify-end">
          <div className="mx-4 ">Bags Total: {bags.length}</div>
          <div className="mx-4">Bags New: {bagsNew}</div>
        </div>
        <div className="flex justify-end">
          <div className="mx-4">Book Titles:{booksAvailable} </div>
          <div className="mx-4">
            Books/ CopyIds placed in Bags: {booksPlacedInBags}
          </div>
        </div>
      </div>
      <Table
        columns={[
          { heading: "Name", sortable: "name" },
          { heading: "Category", sortable: "category" },
          { heading: "Books", sortable: "books" },
          { heading: "CopyIds", sortable: "copyIds" },
          { heading: "Num Books", sortable: "numBooks" },
        ]}
        rows={bags}
        renderRow={(bag, i) => {
          const tdProps = {
            className: `${i % 2 !== 0 ? "bg-blue-100" : ""} p-2`,
          }

          return (
            <tr key={i}>
              <td {...tdProps}>{bag.name}</td>
              <td {...tdProps}>{bag.category}</td>
              <td {...tdProps}>{bag.titles.join(", ")}</td>
              <td {...tdProps}>{bag.copyIds.join(", ")}</td>
              <td {...tdProps}>{bag.books.length}</td>
            </tr>
          )
        }}
      />
    </>
  )
}
