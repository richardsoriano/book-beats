// import nc from "next-connect"
// import onError from "../../../common/errormiddleware"
// import multer from "multer"
// import path from "path"
// const handler = nc(onError)

// export const config = {
//   api: { bodyParser: false },
// }
// let storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public")
//   },
//   filename: function (req, file, cb) {
//     cb(
//       null,
//       file.fieldname + "_" + Date.now() + path.extname(file.originalname)
//     )
//   },
// })
// let upload = multer({
//   storage: storage,
// })
// let uploadFile = upload.single("file")
// handler.use(uploadFile)
// handler.post((req, res) => {
//   console.log("req", req.file)
//   console.log("body", req.body)
//   res.status(200).send(" Uploaded file")
// })
// export default handler
