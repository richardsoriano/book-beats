import dbPromise from "@/modules/mongodb"

// async function findHighestCopyId() {
//   const dbConnection = await dbPromise
//   const collection = await dbConnection.db().collection("bags")
//   const bags = await collection.find({}).toArray()
// }
export default async function CreateAuthor(req, res) {
  console.log("createAuthor")

  const arrayOfAuthors = JSON.parse(JSON.stringify(req.body))
  console.log(arrayOfAuthors)

  // find last index

  const newArray = arrayOfAuthors.map(async (auth) => {
    const dbConnection = await dbPromise
    const collection = await dbConnection.db().collection("authors")
    const { insertedId } = await collection.insertOne(auth)
    console.log("insertId", insertedId)
    // console.log("inserted")
  })
  // const dbConnection = await dbPromise
  // const collection = await dbConnection.db().collection("authors")
  // const { insertedId } = await collection.insertOne()
  // console.log("insertId", insertId)
  // res.status(201).json({ _id: insertedId.toString(), first, last, age, amount })
  let name = "richard"
  res.status(201).json({ name })
}
