import dbPromise from "@/modules/mongodb"

export default async function SaveBagsToDB(req, res) {
  console.log("Save To DB")
  const insertId = 100
  const arrayOfBags = JSON.parse(req.body)
  console.log("array of Bags", arrayOfBags)
  // const { arrayIds } = JSON.parse(req.body)

  res.status(201).json({ _id: insertId.toString() })
}
