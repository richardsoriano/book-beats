import { useState } from "react"

import NameBag from "./steps/nameBag"
import AttachCategory from "./steps/attachCategory"
import BagBooks from "./steps/bagBooks"
import AssignReader from "./steps/assignReader"
import AssignStatus from "./steps/assignStatus"
import categories from "@/data/categories"
import Button from "@/ui/buttons"

export default function BagForm({
  books,
  bagProps,
  bags,
  readers,
  pickupstatus,
  setBags = () => {},
  setSelectedBag = () => {},
}) {
  const [currentStep, setCurrentStep] = useState(0)
  const [bag, setBag] = useState(bagProps)

  const steps = [
    {
      component: <NameBag bag={bag} setBag={setBag} />,
      label: "Name Bag",
    },
    {
      component: (
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

  async function saveBag() {
    const bagId = bag._id ? bag._id : ""
    let newBag

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
          numBooks: bag.books.length,
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
    <div>
      <ul className="flex mb-4 space-x-2">
        {Object.keys(steps).map((step) => (
          <li
            className={`${
              steps[step].label === steps[currentStep].label ? "underline" : ""
            }`}
          >
            {step}. {steps[step].label}
          </li>
        ))}
      </ul>
      {currentStep > 0 && (
        <Button onClick={() => setCurrentStep((prev) => prev - 1)}>Prev</Button>
      )}
      {currentStep < steps.length - 1 ? (
        <Button onClick={() => setCurrentStep((prev) => prev + 1)}>Next</Button>
      ) : (
        <Button onClick={saveBag}>Save</Button>
      )}
      <div>{steps[currentStep].component}</div>
    </div>
  )
}
