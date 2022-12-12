// import multer from "multer"
import { getSession } from "next-auth/react"
import nc from "next-connect"

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// }
// const upload = multer({
//   storage: multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, path.join(process.cwd(), "public", "uploads"))
//     },
//     filename: function (req, file, cb) {
//       cb(null, new Date().getTime() + "-" + file.originalname)
//     },
//   }),
// })
// const bodyParser = require("body-parser")
// app.use(bodyParser.json())
// const record = JSON.parse(req.body)
const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack)
    res.status(500).end("Something broke!")
  },
  onNoMatch: (req, res, next) => {
    res.status(404).end("Page is not found")
  },
})
  // .use(bodyParser.json())
  // .use(upload.single("image"))
  .post((req, res) => {
    // console.log("here",)
    // console.log("res", res)
    // make sure that they're valid user
    // try {
    //   const session = await getSession({req})
    //   if (!session){
    //     errorHandler("Access denied",res)
    //   }else {
    //     res.status(201).json({ body: req.body })
    //     res.send("Hello World")
    //   }
    // } catch (error) {

    // }
    // console.log("here")
    // res.send("Hello World")
    console.log(JSON.parse(req.body))
    res.status(201).json({ body: "Hello world" })
  })
export default handler
