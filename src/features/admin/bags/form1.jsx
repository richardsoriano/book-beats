import { useState } from "react"

import NameBag from "./steps/nameBag"
import AttachCategory from "./steps/attachCategory"
import BagBooks from "./steps/bagBooks"
import AssignReader from "./steps/assignReader"
import AssignStatus from "./steps/assignStatus"
import categories from "@/data/categories"
import Button from "@/ui/buttons"
// import { hash } from "bcrypt"

export default function BagForm({
  books,
  bagProps,
  bags,
  readers,
  pickupstatus,
  setBags = () => {},
  setSelectedBag = () => {},
  setErrors = () => {},
}) {
  const [currentStep, setCurrentStep] = useState(0)
  const [bag, setBag] = useState(bagProps)

  const steps = [
    {
      component: bag._id ? (
        <div className="py-4">
          <span className="text-lg font-semibold">{bag.name}</span>
        </div>
      ) : (
        <NameBag bag={bag} setBag={setBag} />
      ),
      label: "Name Bag",
    },
    {
      component: bag._id ? (
        <div className="py-4">
          <span className="text-lg font-semibold">{bag.category}</span>
        </div>
      ) : (
        <AttachCategory categories={categories} bag={bag} setBag={setBag} />
      ),
      label: "Attach Category",
    },
    {
      component: <BagBooks books={books} bag={bag} setBag={setBag} />,
      label: "Bag Books",
    },
    {
      component: <AssignReader readers={readers} bag={bag} setBag={setBag} />,
      label: "Assign Reader",
    },
    {
      component: (
        <AssignStatus pickupstatus={pickupstatus} bag={bag} setBag={setBag} />
      ),
      label: "Assign Status",
    },
  ]

  function IsCopyIdBagged(arrCopyIds, hashMapBagIdCopyId, bagId, copyId) {
    /**
     * Determines a CopyId is in any bags so that it can be added to a bag.
     * if it's NOT in the bag, \and the array length is 1, then it's taken.
     * if it's in a bag. Then the array length would only be 1, then it's not taken. it's ok to bag. return false.
     * if length ===0 then it has not been bagged. return false
     * if length ===1 then it's bagged.
     *  is it in current bag, return false.
     *  is it in another bag, return true.
     *
     * @param {bagId} current BagId
     * @param {copyId} current CopyId for a particular book.
     * @param {hashMapBagIdCopyId} used to lookup BagIds and CopyIds.
     * @param {arrCopyIds} an array of all the CopyIds that are bagged.
     * @return {boolean} true if the CopyId is in any bags including current bag.
     */
    console.log("arrCopyIds", arrCopyIds)
    console.log("bagId", bagId)
    console.log("copyId", copyId)
    let arr = []
    let filteredArrCopyIds = arrCopyIds.filter((c) => c === copyId)
    console.log("filteredArrCopyIds", filteredArrCopyIds)
    if (filteredArrCopyIds.length === 0) {
      console.log("it is not bagged")
      return false
    }
    if (filteredArrCopyIds.length === 1) {
      if (hashMapBagIdCopyId.has(bagId + copyId)) {
        console.log("it's in current Bag ")
        return false
      } else {
        console.log("it's in another bag")
        return true
      }
    }
  }
  function aggregateArrayCopyIds(_bags, bagCategory, baggedBooks) {
    let arrCopyIds = []
    let offset = 0
    for (let i = 0; i < _bags.length; i++) {
      offset = _bags[i].categories.indexOf(bagCategory)
      for (let j = 0; j < 4; j++) {
        arrCopyIds.push(_bags[i].copyIds[offset * 4 + j])
      }
    }
    console.log("aggregate arr", arrCopyIds)

    // for (let i = 0; i < baggedBooks.length; i++) {
    //   let offset = baggedBooks[i].categories.indexOf(bag.category)
    //   for (let j = 0; j < 4; j++) {
    //     arrCopyIds.push(baggedBooks[i].copyIds[offset * 4 + j])
    //   }
    // }

    // arrCopyIds[0] = "1001"
    // arrCopyIds[1] = "1002"
    // arrCopyIds[2] = "1003"
    // arrCopyIds[3] = "1004"
    return arrCopyIds
  }
  function aggregateHashMapBagIdCopyId(bagsFilteredByCategory) {
    // let hashMapBagIdCopyId = new Map()
    // hashMapBagIdCopyId.set("01" + "1001", true)
    // hashMapBagIdCopyId.set("02" + "1002", true)
    // hashMapBagIdCopyId.set("03" + "1003", true)
    // hashMapBagIdCopyId.set("04" + "1004", true)

    let hashMapBagIdCopyId = new Map()
    for (let i = 0; i < bagsFilteredByCategory.length; i++) {
      for (let j = 0; j < bagsFilteredByCategory[i].copyIds.length; j++) {
        console.log(
          "both",
          bagsFilteredByCategory[i]._id + bagsFilteredByCategory[i].copyIds[j]
        )
        hashMapBagIdCopyId.set(
          bagsFilteredByCategory[i]._id + bagsFilteredByCategory[i].copyIds[j],
          true
        )
      }
    }

    return hashMapBagIdCopyId
  }
  function aggregateCopyIdsFilteredByCategoryBagged(bagsFilteredByCategory) {
    let arrCopyIds = []

    for (let i = 0; i < bagsFilteredByCategory.length; i++) {
      for (let j = 0; j < bagsFilteredByCategory[i].copyIds.length; j++) {
        arrCopyIds.push(bagsFilteredByCategory[i].copyIds[j])
      }
    }

    return arrCopyIds
  }
  // function IsCopyIdTaken(arrCopyIds, bagId, copyId) {
  // if (hashMapCopyId.get(copyId) && (hashMapBagIdCopyId.get(bag._id + copyId)))
  // if more than one copyId in array of bags exists.
  // arrCopyIds
  // let tmpCopyId = 2406

  // if (arrCopyIds.filter((_copyId) => _copyId === tmpCopyId).length > 1) {
  //   console.log(
  //     "number of CopyIds found",
  //     arrCopyIds.filter((_copyId) => _copyId === tmpCopyId).length
  //   )
  // }
  // if (hashMapBagIdCopyId.has(bagId + copyId)) return true
  // else return false
  // }
  // function aggregateArrayCopyIds(bags) {
  //   let arrCopyIds = []

  //   for (let i = 0; i < bags.length; i++) {
  //     for (let j = 0; j < bags[i].copyIds.length; j++) {
  //       arrCopyIds[i + j] = bags[i].copyIds[j]
  //       // console.log("aggregate CopyId", bags[i].copyIds[j])
  //     }
  //   }
  //   console.log("aggregate arr", arrCopyIds)
  //   return arrCopyIds
  // }
  // function aggregateHashMapBagIdCopyId(bags) {
  //   let hashMapBagIdCopyId = new Map()

  //   for (let i = 0; i < bags.length; i++) {
  //     for (let j = 0; j < bags[i].copyIds.length; j++) {
  //       hashMapBagIdCopyId.set(bags[i]._id + bags[i].copyIds[j], true)
  //     }
  //   }

  //   return hashMapBagIdCopyId
  // }
  async function saveBag() {
    const bagId = bag._id ? bag._id : ""
    let newBag
    // let arrCopyIds = aggregateArrayCopyIds(bags)

    /* START */
    // console.log("bag", bag)
    // console.log("bag.books", bag.books)

    // WORKS ?
    // 1. filter all books by category. booksFilteredByCategory. To be used Loop. Find first possible copyId.
    // 2. filter all bags by category. bagsFilteredByCategory. To be used in hashMap.
    // 3. arrCopyIdsFilteredByCategoryBagged. aggregateCopyIdsFilteredByCategoryBagged It might be bagged in another bag.
    // 4. hashMapBagIdCopyId (bagsFilteredByCategory,arrCopyIdsFilteredByCategoryBagged)
    // 5. //loop through booksFilteredByCategory.
    // 6.     loop through booksFilteredByCategory.copyIds Find first possible copyId.
    // 7.        isCopyIdAvailable if so break.
    // 8.        if not. errors.push with book title
    // 9. find book. title where copyId. display title.
    //1.booksFilteredByCategory
    let booksFilteredByCategory = books.filter(
      (book) => book.categories.indexOf(bag.category) >= 0
    )
    // console.log("books", books)
    // console.log("booksFilteredByCategory", booksFilteredByCategory)
    //2.bagsFilteredByCategory
    let bagsFilteredByCategory = bags.filter(
      (_bag) => _bag.category === bag.category
    )
    console.log("bag category", bag.category)
    console.log("bags", bags)
    console.log("bagsFilteredByCategory", bagsFilteredByCategory)
    // 3. arrCopyIds
    let arrCopyIds = aggregateCopyIdsFilteredByCategoryBagged(
      bagsFilteredByCategory
    )
    console.log("arrCopyIds", arrCopyIds)
    // 4. hashMapBagIdCopyId
    let hashMapBagIdCopyId = aggregateHashMapBagIdCopyId(bagsFilteredByCategory)
    // let isCopyIdAvailable = hashMapBagIdCopyId.has(
    //   "63e9c2c196ee1dde8ebd436c2633"
    // )
    // console.log("iscopyIdAvailable", isCopyIdAvailable)
    // 5. function IsCopyIdBagged(arrCopyIds, hashMapBagIdCopyId, bagId, copyId)

    // if it's not bagged. tmpCopyId is not in arrCopyIds. tmpCopyId="110", tmpBagId="2000"
    // if it's in current bagged.  tmpCopyId="01" tmpBagId="1001"
    // if it's not in current bag, but in another bag. "tmpCopyId="01" tmpBagId="1002"
    // 6. Bag.books. loop through. find book that corresponds.

    let offset = 0
    let numCopyIds = 4
    let foundCopyId = 0
    for (let i = 0; i < bag.books.length; i++) {
      let foundBook = booksFilteredByCategory.find(
        (bookFilteredByCategory) => bookFilteredByCategory._id === bag.books[i]
      )
      offset = foundBook.categories.indexOf(bag.category)

      console.log("copyIds", foundBook.copyIds)
      let j = -1
      let countCopyIds = 0
      let isCopyIdAvailable = false
      while (!isCopyIdAvailable && j < numCopyIds) {
        j++
        console.log("found book", foundBook.copyIds[numCopyIds * offset + j])
        console.log("title", foundBook.title)
        console.log("bag name", bag)

        let isBagged = IsCopyIdBagged(
          arrCopyIds,
          hashMapBagIdCopyId,
          bag._id,
          foundBook.copyIds[numCopyIds * offset + j]
        )

        if (isBagged) {
          // push errors
          console.log(
            "found book bagged CopyId. Continue",
            foundBook.copyIds[numCopyIds * offset + j]
          )
          console.log("title", foundBook.title)
          countCopyIds++
        } else {
          isCopyIdAvailable = true
          console.log(
            "found a copyId available that's not bagged",
            foundBook.copyIds[numCopyIds * offset + j]
          )
        }
      }
      console.log("isBagged number", countCopyIds)
      console.log("isCopyIdAvailable", isCopyIdAvailable)
      console.log("found copyId", foundBook.copyIds[numCopyIds * offset + j])
      console.log("found Book", foundBook)
      // if looped through 4 copyId's. None of them were available. Output error.
      if (countCopyIds === numCopyIds) {
        setErrors((prev) => [...prev, `${foundBook.title}`])
      } else {
        console.log("no errors")
      }
    }

    // let isCopyIdAvailable = IsCopyIdBagged(arrCopyIds, hashMapBagIdCopyId, bagId, copyId)
    /* WRONG? START*/
    // let baggedBooks = books.filter((book) => bags.books.indexOf(book._id) >= 0)
    // let arrCopyIds = aggregateArrayCopyIds(bags, baggedBooks)
    // let hashMapBagIdCopyId = aggregateHashMapBagIdCopyId(bags)
    // console.log("arrayCopyIds", arrCopyIds)
    // console.log("hashMapBagIdCopyId", hashMapBagIdCopyId)
    /* WRONG END */
    // let tmpBagId = "011"
    // CopyIds, for each book, 2405,2406,2407, 2408, 1909, 1910,1911,1912,1053,1054,10544
    // currently in bag [2406,1910,1054]
    // IsCopyIdBagged
    // tmpBagId = 63e9c2c196ee1dde8ebd4361, copyId=2406. true. cannot be bagged.
    // tmpBagId = 63e9c2c196ee1dde8ebd4361 copyId=1910. false. can be bagged.
    // tmpBagId = 01 copyId=1910. true. cannot be bagged.
    // tmpBagId = 01 copyId=1908. false. can be bagged

    // 1. test individual cases.
    // 2. test copyId loops. 2405,2406,2407, 2408, 1909, 1910,1911,1912,1053,1054,10544
    // 3. test temp bags ["100", "101", "103","63e9c2c196ee1dde8ebd4361", "104" ]

    // console.log("bagId", bag._id)
    // console.log("bagged books", bag.books)
    // console.log("bagged copyIds", bag.copyIds)
    // let tmpBagId = "63e9c2c196ee1dde8ebd4361"
    // let tmpCopyId = "2406"

    // // if it's not bagged. tmpCopyId is not in arrCopyIds. tmpCopyId="110", tmpBagId="2000"
    // // if it's in current bagged.  tmpCopyId="01" tmpBagId="1001"
    // // if it's not in current bag, but in another bag. "tmpCopyId="01" tmpBagId="1002"

    // let isBagged = IsCopyIdBagged(
    //   arrCopyIds,
    //   hashMapBagIdCopyId,
    //   tmpBagId,
    //   tmpCopyId
    // )
    // if (isBagged) {
    //   setErrors((prev) => [...prev, `book already taken ${tmpCopyId}`])
    // } else {
    //   console.log("no errors")
    // }
    // WORKS END
    // console.log("books", books)

    /* END */
    // bag.copyIds.map((copyId) => {
    //   if (IsCopyIdTaken(arrCopyIds, bag._id, copyId)) {
    //     console.log("copyID is taken", copyId)
    //   }
    // })

    // const res = await fetch(`/api/bags/${bagId}`, {
    //   method: bagId ? "PATCH" : "POST",
    //   body: JSON.stringify(bag),
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     // enter you logic when the fetch is successful
    //     newBag = {
    //       _id: data._id,
    //       name: data.name,
    //       category: data.category,
    //       books: data.books,
    //       numBooks: bag.books.length,
    //       reader: data.reader,
    //       pickupstatus: data.pickupstatus,
    //     }
    //   })
    // if (bagId !== "") {
    //   // remove the old version
    //   setBags((prev) => prev.filter((_bag) => _bag._id !== bagId))
    // }

    setBags((prev) => [...prev, newBag])
    setSelectedBag(undefined)
  }
  return (
    <>
      <div className="py-4">
        <span className="text-lg font-semibold text-red-500">
          Number of books: {bag.books.length}
        </span>
      </div>

      <div>
        <ul className="flex mb-4 space-x-2">
          {Object.keys(steps).map((step) => (
            <li
              className={`${
                steps[step].label === steps[currentStep].label
                  ? "underline"
                  : ""
              }`}
            >
              {step}. {steps[step].label}
            </li>
          ))}
        </ul>
        {currentStep > 0 && (
          <Button onClick={() => setCurrentStep((prev) => prev - 1)}>
            Prev
          </Button>
        )}
        {currentStep < steps.length - 1 ? (
          <Button onClick={() => setCurrentStep((prev) => prev + 1)}>
            Next
          </Button>
        ) : (
          <Button onClick={saveBag}>Save</Button>
        )}
        <div>{steps[currentStep].component}</div>
      </div>
    </>
  )
}
