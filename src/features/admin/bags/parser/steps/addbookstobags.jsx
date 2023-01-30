import { useState, useEffect } from "react"

import Table from "ui/table"

import {
  getBookCategoryExcluded,
  isBagAvailable,
  getRndInteger,
} from "./helper"
import Button from "ui/buttons"

export default function AddBooksToBags({
  booksNoBags,
  bags,
  setBags = () => {},
}) {
  const [bagsNew, setBagsNew] = useState(0)
  const [booksAvailable, setBooksAvailable] = useState(booksNoBags.length)
  const [booksPlacedInBags, setBooksPlacedInBags] = useState(0)
  const [hasParsedBooksBags, sethasParsedBooksBags] = useState(false)
  const [isSavedToDb, setIsSavedToDb] = useState(false)

  // local temp values for deep copy.
  // setBags at the end. Avoid setBags in loops to avoid
  // constant re-rendering.
  booksNoBags.map((b) => console.log("books No Bags", b))
  let localBags = bags.map((_bag) => {
    return { ..._bag }
  })
  let localBagsModifiedNew = []
  let numBooksPlacedInBags = 0
  let numBagsNew = 0
  // useEffect(
  //   (isReady) => {
  //     if (!isReady) return
  //   },
  //   [isReady]
  // )

  function addBooktoBag(index, i, j) {
    let newBag_id = localBags[index]._id
    let newBagBooks = localBags[index].books
    let newBagTitles = localBags[index].titles
    let newBagCopyIds = localBags[index].copyIds
    let newBagName = localBags[index].name
    let newBagCategory = localBags[index].category
    let newBagAssigned = localBags[index].assigned
    let newBagPickupStatus = localBags[index].pickupstatus
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
    // Skip if we've done this already.
    // localBagsModifiedNew is an array of bags that are either modified or new.
    //
    // filter by name. Not best practice, but it'll do.
    // I don't want to add a random id. Why? Because I need to distinguish
    // new bags versus modified bags.
    // modified bags need to be filtered out.
    // new bags plus modified bags will then be added.
    let tmplocalBagsModifiedNew = localBagsModifiedNew.filter(
      (bag) => bag.name !== localBags[index].name
    )
    localBagsModifiedNew = [...tmplocalBagsModifiedNew, tmpBag]

    let tmplocalBags = localBags.filter(
      (bag) => bag.name !== localBags[index].name
    )
    localBags = [...tmplocalBags, tmpBag]
    numBooksPlacedInBags++
  }

  function createNewBag(i, j, indexCopyId) {
    let newBagCategory = getBookCategoryExcluded(booksNoBags[i], j)
    let newBagName = `${newBagCategory}${getRndInteger(1, 999999)}`

    let newBag = {
      _id: "",
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

    localBagsModifiedNew.push(newBag)
    localBags.push(newBag)

    numBooksPlacedInBags++
    numBagsNew++
  }

  function handleParseBooksBags() {
    if (hasParsedBooksBags) {
      return
    }
    const newBag = {
      _id: "",
      name: "",
      books: [],
      titles: [],
      copyIds: [],
    }

    let index
    for (let i = 0; i < booksNoBags.length; i++) {
      for (let j = 0; j < booksNoBags[i].categories.length; j++) {
        for (let k = 0; k < 4; k++) {
          let indexCopyId = j * 4 + k
          index = isBagAvailable(
            booksNoBags[i],
            booksNoBags[i].copyIds[indexCopyId],
            booksNoBags[i].categories[j],
            localBags
          )

          if (index >= 0) {
            addBooktoBag(index, i, indexCopyId)
          } else {
            createNewBag(i, j, indexCopyId)
          }
        }
      }
    }
    let tmpModifiedNewIds = localBagsModifiedNew.map((b) => b.name)
    let tmplocalBags = localBags.filter(
      (bag) => tmpModifiedNewIds.indexOf(bag.name) > -1
    )
    setBags((prev) => [...prev, ...tmplocalBags])
    setBagsNew(numBagsNew)
    setBooksPlacedInBags(numBooksPlacedInBags)
    sethasParsedBooksBags(true)
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
