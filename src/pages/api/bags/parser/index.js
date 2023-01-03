import dbPromise from "@/modules/mongodb"

export default async function SaveBagsToDB(req, res) {
  console.log("Save To DB")
  const insertId = 100
  // const { arrayIds } = JSON.parse(req.body)

  res.status(201).json({ _id: insertId.toString() })
}
