import { useState } from "react"
import Button from "@/ui/buttons"
import CreateEmptyBags from "./steps/createEmptyBags"
import FindUnfilledBags from "./steps/findUnfilledBags"
import AssignBagsToReaders from "./steps/assignBagsToReaders"
import isBagAvailable from "./helper"

// import SaveToDB from "@/features/admin/bags/parser/steps/savetodb"

export default function BagParser({ categories, books, booksNoBags, bags }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [bagsToBeProcessed, setBagsToBeProcessed] = useState(bags)
  const [unBaggedBooks, setUnBaggedBooks] = useState([])

  for (let i = 0; i < booksNoBags.length; i++) {
    for (let j = 0; j < booksNoBags[i].copyIds.length; j++) {
      console.log(
        "bag avail= ",
        isBagAvailable(booksNoBags[i], booksNoBags[i].copyIds[j], bags)
      )
    }
  }

  const steps = [
    // {
    //   component: (
    //     <FindUnfilledBags
    //       bagsToBeProcessed={bagsToBeProcessed}
    //       setBagsToBeProcessed={setBagsToBeProcessed}
    //     />
    //   ),
    //   label: "Find Unfilled Bags",
    // },
    {
      component: (
        <CreateEmptyBags categories={categories} books={books} bags={bags} />
      ),
      label: "Parse Bags",
    },
    {
      component: <AssignBagsToReaders />,
      label: "Assign Bags to Readers",
    },
    {
      component: <SaveToDB />,
      label: "Save To Bags DB",
    },
  ]

  function createListBooksUnBagged(books, bagsToBeProcessed) {
    // console.log("bagsToBeProcessed", bagsToBeProcessed)
    let booksUnBagged = []
    for (let i = 0; i < books.length; i++) {
      for (let j = 0; j < books[i].copyIds.length; j++) {
        for (let k = 0; k < bagsToBeProcessed.length; k++) {
          if (bagsToBeProcessed[k].copyIds.includes(books[i].copyIds[j])) {
            // console.log("title", books[i].title)
            // console.log("id", books[i]._id)
            // console.log("copyId", books[i].copyIds[j])
            booksUnBagged.push({
              _bookId: books[i]._id,
              title: books[i].title,
              copyId: books[i].copyIds[j],
            })
          }
        }
      }
    }
    // console.log("booksUnBagged", booksUnBagged)
    // books.map((book)=>{
    //   book.copyIds.map((copyId)=>
    //   // reduce???
    //     // bags.map((bag)=>(
    //     //    if (bag.copyIds.includes(copyId)){

    //     //   }else{

    //     //   }
    //     // ))
    //   )
    // })
  }
  function SaveToDB() {
    // console.log("Save to DB")
  }
  // console.log("categories", categories)
  // console.log("books", books)
  // console.log("bags", bags)
  return (
    <div>
      <h1 className="text-2xl font-bold">Bag Parser</h1>
      <Button
        onClick={() =>
          setBagsToBeProcessed(
            bagsToBeProcessed.filter((bags) => bags.books.length < 4)
          )
        }
      >
        Find Unfilled Bags
      </Button>
      <FindUnfilledBags bagsToBeProcessed={bagsToBeProcessed} />
      <Button onClick={() => createListBooksUnBagged(books, bagsToBeProcessed)}>
        List Books unBagged
      </Button>
      <ul>
        {categories.map((category, i) => (
          <li key={i}>
            {category}
            <ul className="mb-4 space-x-2 ">
              {books.map(
                (book, i) =>
                  book.categories.includes(category) && (
                    <li key={i} className="font-bold">
                      {" "}
                      {book.title}
                    </li>
                  )
              )}
            </ul>
          </li>
        ))}
      </ul>

      <ul className="flex p-6 mb-4 space-x-2">
        {Object.keys(steps).map((step, i) => (
          <li
            key={i}
            className={`${
              steps[step].label === steps[currentStep].label ? "underline" : ""
            }`}
          >
            {step}. {steps[step].label}
          </li>
        ))}
      </ul>

      <div>{steps[currentStep].component}</div>
      {currentStep > 0 && (
        <Button onClick={() => setCurrentStep((prev) => prev - 1)}>
          Previous
        </Button>
      )}
      {currentStep < steps.length - 1 ? (
        <Button onClick={() => setCurrentStep((prev) => prev + 1)}>Next</Button>
      ) : (
        <Button onClick={SaveToDB}>Save</Button>
      )}
      {/* {bagsToBeProcessed.map((bag) => (
        <div>{bag.name}</div>
      ))} */}
    </div>
  )
}
