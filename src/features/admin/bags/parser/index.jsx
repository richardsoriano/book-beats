import { useState } from "react"
import Button from "@/ui/buttons"
import BooksAvailable from "./steps/booksavailable"
import BagsAvailable from "./steps/bagsavailable"
import AddBooksToBags from "./steps/addbookstobags"
// import SaveToDB from "@/features/admin/bags/parser/steps/savetodb"

export default function BagParser({ categories, books, booksNoBags, bags }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [_bags, setBags] = useState(bags)
  // console.log("books no bags", booksNoBags)
  const steps = [
    {
      component: <BooksAvailable booksNoBags={booksNoBags} />,
      label: "Books Available",
    },
    {
      component: <BagsAvailable bags={bags} />,
      label: "Bags Available",
    },
    {
      component: (
        <AddBooksToBags
          booksNoBags={booksNoBags}
          bags={bags}
          setBags={setBags}
        />
      ),
      label: "Add Bags to Books",
    },
    {
      component: <SaveToDB />,
      label: "Save To Bags DB",
    },
  ]

  function SaveToDB() {
    console.log("Save to DB")
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Bag Parser</h1>
      <div className="flex items-center justify-around ">
        <Button onClick={() => setCurrentStep(0)}>1 Books Available</Button>
        <Button onClick={() => setCurrentStep(1)}>2 Bags Available</Button>
        <Button onClick={() => setCurrentStep(2)}>3 Add Books to Bags</Button>
        <Button onClick={() => SaveToDB()}>4 Save to DB</Button>
      </div>
      <div>{currentStep}</div>
      <h2>{steps[currentStep].label}</h2>
      <div>{steps[currentStep].component}</div>
    </div>
  )
}
