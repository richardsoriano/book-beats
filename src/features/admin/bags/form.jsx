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
      component: <NameBag bag={bag} setBag={setBag} />,
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
      component: bag._id ? (
        <div className="py-4">
          <span className="text-lg font-semibold">{bag.titles.join(", ")}</span>
        </div>
      ) : (
        <BagBooks books={books} bag={bag} setBag={setBag} />
      ),
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
  // START
  // function IsCopyIdBagged(arrCopyIds, hashMapBagIdCopyId, bagId, copyId) {
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

  //   let filteredArrCopyIds = arrCopyIds.filter((c) => c === copyId)

  //   if (filteredArrCopyIds.length === 0) {
  //     return false
  //   }
  //   if (filteredArrCopyIds.length === 1) {
  //     if (hashMapBagIdCopyId.has(bagId + copyId)) {
  //       return false
  //     } else {
  //       return true
  //     }
  //   }
  // }

  // function aggregateHashMapBagIdCopyId(bagsFilteredByCategory) {
  //   let hashMapBagIdCopyId = new Map()
  //   for (let i = 0; i < bagsFilteredByCategory.length; i++) {
  //     for (let j = 0; j < bagsFilteredByCategory[i].copyIds.length; j++) {
  //       console.log(
  //         "both",
  //         bagsFilteredByCategory[i]._id + bagsFilteredByCategory[i].copyIds[j]
  //       )
  //       hashMapBagIdCopyId.set(
  //         bagsFilteredByCategory[i]._id + bagsFilteredByCategory[i].copyIds[j],
  //         true
  //       )
  //     }
  //   }

  //   return hashMapBagIdCopyId
  // }
  // function aggregateCopyIdsFilteredByCategoryBagged(bagsFilteredByCategory) {
  //   let arrCopyIds = []

  //   for (let i = 0; i < bagsFilteredByCategory.length; i++) {
  //     for (let j = 0; j < bagsFilteredByCategory[i].copyIds.length; j++) {
  //       arrCopyIds.push(bagsFilteredByCategory[i].copyIds[j])
  //     }
  //   }

  //   return arrCopyIds
  // }
  // END
  async function saveBag() {
    const bagId = bag._id ? bag._id : ""
    let newBag
    console.log("bag", bag)
    // 1. test individual cases.
    // 2. test copyId loops. 2405,2406,2407, 2408, 1909, 1910,1911,1912,1053,1054,10544
    // 3. test temp bags ["100", "101", "103","63e9c2c196ee1dde8ebd4361", "104" ]
    // if it's not bagged. tmpCopyId is not in arrCopyIds. tmpCopyId="110", tmpBagId="2000"
    // if it's in current bagged.  tmpCopyId="01" tmpBagId="1001"
    // if it's not in current bag, but in another bag. "tmpCopyId="01" tmpBagId="1002"

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
    // Is Bagged Books already taken?
    // START
    // let booksFilteredByCategory = books.filter(
    //   (book) => book.categories.indexOf(bag.category) >= 0
    // )

    // //2.bagsFilteredByCategory
    // let bagsFilteredByCategory = bags.filter(
    //   (_bag) => _bag.category === bag.category
    // )
    // // 3. arrCopyIds
    // let arrCopyIds = aggregateCopyIdsFilteredByCategoryBagged(
    //   bagsFilteredByCategory
    // )
    // // 4. hashMapBagIdCopyId
    // let hashMapBagIdCopyId = aggregateHashMapBagIdCopyId(bagsFilteredByCategory)
    // // 5,6. Bag.books. loop through. find book that corresponds.
    // let offset = 0
    // let numCopyIds = 4
    // for (let i = 0; i < bag.books.length; i++) {
    //   let foundBook = booksFilteredByCategory.find(
    //     (bookFilteredByCategory) => bookFilteredByCategory._id === bag.books[i]
    //   )
    //   offset = foundBook.categories.indexOf(bag.category)

    //   let j = -1
    //   let countCopyIds = 0
    //   let isCopyIdAvailable = false
    //   while (!isCopyIdAvailable && j < numCopyIds) {
    //     j++
    //     let isBagged = IsCopyIdBagged(
    //       arrCopyIds,
    //       hashMapBagIdCopyId,
    //       bag._id,
    //       foundBook.copyIds[numCopyIds * offset + j]
    //     )
    //     if (isBagged) {
    //       countCopyIds++
    //     } else {
    //       isCopyIdAvailable = true
    //     }
    //   }

    //   if (countCopyIds === numCopyIds) {
    //     setErrors((prev) => [...prev, `${foundBook.title}`])
    //   }
    // }
    // END

    const res = await fetch(`/api/bags/${bagId}`, {
      method: bagId ? "PATCH" : "POST",
      body: JSON.stringify(bag),
    })
      .then((res) => res.json())
      .then((data) => {
        // enter you logic when the fetch is successful
        newBag = {
          _id: data._id,
          name: data.name,
          category: data.category,
          books: data.books,
          titles: data.titles,
          copyIds: data.copyIds,
          numBooks: data.books.length,
          reader: data.reader,
          pickupstatus: data.pickupstatus,
        }
      })
    if (bagId !== "") {
      // remove the old version
      setBags((prev) => prev.filter((_bag) => _bag._id !== bagId))
    }

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
