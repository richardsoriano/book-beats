import { useState } from "react"
import Button from "@/ui/buttons"
import BooksAvailable from "./steps/booksavailable"
import BagsAvailable from "./steps/bagsavailable"
import AddBooksToBags from "./steps/addbookstobags"
import ProgressBar from "@/ui/progress-bar"

export default function BagParser({ categories, books, booksNoBags, bags }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [_bags, setBags] = useState(bags)
  const [progressPercentage, setProgressPercentage] = useState(0)
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
          bags={_bags}
          setBags={setBags}
        />
      ),
      label: "Add Bags to Books",
    },
  ]
  function setStep(step) {
    let progress = 0
    if (step === 0) {
      progress = 25
    } else if (step === 1) {
      progress = 50
    } else if (step === 2) {
      progress = 75
    } else if (step === 3) {
      progress = 100
    }
    setCurrentStep(step)
    setProgressPercentage(progress)
    console.log("progress", progress)
  }
  function saveDB(step) {
    let progress = 100
    setCurrentStep(step)
    setProgressPercentage(progress)
    // SaveToDB()
  }
  return (
    <div>
      <h1 className="text-2xl font-bold">Bag Parser</h1>
      <ProgressBar progressPercentage={progressPercentage} />
      <div className="flex items-center justify-around ">
        <Button onClick={() => setCurrentStep(0)}>1 Books Available</Button>
        <Button onClick={() => setCurrentStep(1)}>2 Bags Available</Button>
        <Button onClick={() => setCurrentStep(2)}>3 Add Books to Bags</Button>
        <Button onClick={() => SaveToDB()}>4 Save to DB</Button>
      </div>

      <div>{steps[currentStep].component}</div>
    </div>
  )
}
