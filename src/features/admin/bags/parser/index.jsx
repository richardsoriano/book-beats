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
      progress = 33
    } else if (step === 1) {
      progress = 66
    } else if (step === 2) {
      progress = 100
    }
    setCurrentStep(step)
    setProgressPercentage(progress)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Bag Parser</h1>
      <ProgressBar progressPercentage={progressPercentage} />
      <div className="flex items-center justify-around ">
        <Button onClick={() => setStep(0)}>Books Available</Button>
        <Button onClick={() => setStep(1)}>Bags Available</Button>
        <Button onClick={() => setStep(2)}>Add Books to Bags</Button>
      </div>

      <div>{steps[currentStep].component}</div>
    </div>
  )
}
