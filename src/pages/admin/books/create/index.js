import { useState } from "react"
import axios from "axios"
const baseUrl = "http://localhost:3000/api"
export default function BooksCreate() {
  const [image, setImage] = useState(null)
  const [imageInput, setImageInput] = useState(null)
  const [title, setTitle] = useState("")

  const handleImage = (e) => {
    const file = e.target.files[0]
    setImageInput(file)
    const fileReader = new FileReader()
    fileReader.onload = function (e) {
      console.log(e.target.result)
      setImage(e.target.result)
    }
    fileReader.readAsDataURL(file)
  }
  const handleFormData = async (e) => {
    e.preventDefault()
    const form = new FormData()
    form.append("title", title)
    form.append("image", imageInput)

    const result = await createBook(form)
  }
  const createBook = async (form) => {
    try {
      const res = await axios.post(baseUrl + "/books/create", form)
      return res.data
    } catch (error) {
      console.log("error create book")
    }
  }
  return (
    <div>
      <form onSubmit={handleFormData}>
        <div>
          <h1>title</h1>
          <input
            type="text"
            value={title}
            placeholder="Enter Title"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <h1>File</h1>
          <input type="file" onChange={handleImage} />
        </div>
        <div>
          <h1>hi</h1>
          <button>Submit</button>
        </div>
      </form>
    </div>
  )
}
