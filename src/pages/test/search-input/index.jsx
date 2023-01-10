// import { useState } from "react"
// export default function SearchFilter() {
//   const [searchTerm, setSearchTerm] = useState("")
//   const fruits = ["apple", "mango", "watermelon", "orange", "jack fruit"]
//   const [searchResults, setSearchResults] = useState([])

//   function handleSearch(searchTerm) {
//     var results = []
//     setSearchTerm(searchTerm)
//     console.log("Term", searchTerm)
//     results = fruits.filter(
//       (fruit) => fruit.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
//     )
//     console.log("resljts", results)
//   }
//   return (
//     <div>
//       <label>Search:</label>
//       <input
//         type="text"
//         onChange={(e) => handleSearch(e.target.value)}
//         name="word"
//         value={searchTerm}
//       />
//       {searchResults &&

//       }
//       {searchResults.map((fruit) => (
//         <div>{fruit}</div>
//       ))}
//     </div>
//   )
// }
// import { useState } from "react"
// export default function searchInput() {
//   const [searchTerm, setSearchTerm] = useState("")
//   const [searchResults, setSearchResults] = useState([])

//   const fruits = ["apple", "mango", "orange", "banana"]

//   function handleSearch(event) {
//     setSearchTerm(event.target.value)
//     var results = []
//     results = fruits.filter(
//       (fruit) => fruit.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
//     )
//     setSearchResults(results)
//   }
//   return (
//     <div>
//       <h2>Search Term</h2>
//       <label>Search</label>
//       <input
//         type="text"
//         onChange={(e) => handleSearch(e)}
//         value={searchTerm}
//         name="search"
//       />
//       <p></p>

//       {searchResults && searchResults.map((fruit) => <div>{fruit}</div>)}
//     </div>
//   )
// }
// import { useState } from "react"

// export default function Counter() {
//   const [count, setCount] = useState(0)

//   return (
//     <div className="home">
//       Counter
//       <div className="home">{count}</div>
//       <div>
//         <button onClick={() => setCount((prev) => prev + 1)}>Increment</button>
//       </div>
//       <div>
//         <button onClick={() => setCount((prev) => prev - 1)}>Decrement</button>
//       </div>
//     </div>
//   )
// }

// import { useState } from "react"

// export default function Login() {
//   const [loggedIn, setLoggedIn] = useState(false)
//   const [firstName, setFirstName] = useState("")
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")

//   function handleSubmit(e) {
//     e.preventDefault()
//     console.log("hi")
//     if (
//       firstName === "richard" &&
//       email === "richard@aol.com" &&
//       password === "password"
//     ) {
//       setLoggedIn(true)
//     }
//   }
//   return (
//     <div>
//       Login
//       {loggedIn && <div>Welcome {firstName}</div>}
//       <form>
//         <label>First Name: </label>
//         <input
//           type="text"
//           name="firstName"
//           value={firstName}
//           onChange={(e) => setFirstName(e.target.value)}
//         />
//         <label>Email: </label>
//         <input
//           type="email"
//           name="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <label>Password: </label>
//         <input
//           type="password"
//           name="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button onClick={handleSubmit}>Submit</button>
//       </form>
//     </div>
//   )
// }
import { useEffect, useState } from "react"
export default function makeAPIRequest() {
  const [students, setStudents] = useState([])
  const [joke, setJoke] = useState("")

  // useEffect(async () => {
  //   // const res = await fetch("")
  //   // const data = await res.data()
  //   // const students = await data.JSON.parse()
  //   console.log("here")
  //   setStudents(students)
  // }, [])
  async function getJoke() {
    // fetch("http://official-joke-api.appsspot.com/random_joke")
    //   .then(res=>res.json())
    //   .then((data)=>setJoke("")
    const res = await fetch()
    const data = await res.json()
    data.results
  }
  return (
    <div>
      <h2>Students</h2>
      <button onClick={() => getJoke()}>Get Joke</button>
      <ul>
        {students.map((student) => (
          <li>{student}</li>
        ))}
      </ul>
    </div>
  )
}
