import { useState } from "react"
import Button from "@/ui/buttons"
import CreateEmptyBags from "./steps/createEmptyBags"
import FindUnfilledBags from "./steps/findUnfilledBags"
import AssignBagsToReaders from "./steps/assignBagsToReaders"
// import SaveToDB from "@/features/admin/bags/parser/steps/savetodb"

export default function BagParser({ categories, books, bags }) {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      component: (
        <FindUnfilledBags categories={categories} books={books} bags={bags} />
      ),
      label: "Find Unfilled Bags",
    },
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

  function SaveToDB() {
    console.log("Save to DB")
  }
  // console.log("categories", categories)
  // console.log("books", books)
  // console.log("bags", bags)
  return (
    <div>
      <h1 className="text-2xl font-bold">Bag Parser</h1>

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
    </div>
  )
}
