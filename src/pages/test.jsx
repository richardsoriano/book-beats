// import { useState } from 'react'

// export default function Test({}) {
//   const [to, setTo] = useState('')
//   const [subject, setSubject] = useState('')
//   const [html, setHtml] = useState('')
//   const [error, setError] = useState(undefined)
//   const from = 'willfilmforfood@gmail.com'

//   async function send() {
//     const res = await fetch('/api/mailer', {
//       method: 'POST',
//       body: JSON.stringify({
//         to,
//         from,
//         subject,
//         html,
//       }),
//     })
//     const json = await res.json()
//     if (json.error) return setError(error)

//     console.dir(json)
//   }

//   // soriano.richard2020@gmail.com

//   return (
//     <div>
//       {error && <div className='text-red-500'>{error}</div>}
//       <div>From: {from}</div>

//       <div>
//         <label>To:</label>
//         <input
//           className='w-full p-2 border'
//           type='text'
//           value={to}
//           onChange={(e) => setTo(e.target.value)}
//         />
//       </div>

//       <div>
//         <label>Subject:</label>
//         <input
//           className='w-full p-2 border'
//           type='text'
//           value={subject}
//           onChange={(e) => setSubject(e.target.value)}
//         />
//       </div>

//       <div>
//         <label>HTML:</label>
//         <textarea
//           className='w-full h-40 p-2 border '
//           value={html}
//           onChange={(e) => setHtml(e.target.value)}
//         />
//       </div>

//       <div>
//         <button
//           onClick={send}
//           className='w-full px-8 py-2 text-white bg-blue-600 border'
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   )
// }
