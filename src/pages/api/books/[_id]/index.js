import dbPromise from "@/modules/mongodb"
import { ObjectId } from "mongodb"
import connect from "next-connect"

const handler = connect()

async function saveBook(req, res) {
  let {
    _id,
    entryid,
    title,
    author1,
    author2,
    yearpublished,
    categories,
    bigskyaward,
    isbn,
    nominatedby,
    publisher,
    paddress1,
    paddress2,
    pcity,
    pstate,
    pzip,
    pcountry,
    pphone,
    pemail,
    aaddress1,
    aaddress2,
    acity,
    astate,
    azip,
    acountry,
    copyIds,
  } = JSON.parse(req.body)

  const dbConnection = await dbPromise
  const collection = await dbConnection.db().collection("books")
  const dbRes = await collection.updateOne(
    { _id: ObjectId(_id) },
    {
      $set: {
        entryid,
        title,
        author1,
        author2,
        yearpublished,
        categories,
        bigskyaward,
        isbn,
        nominatedby,
        publisher,
        paddress1,
        paddress2,
        pcity,
        pstate,
        pzip,
        pcountry,
        pphone,
        pemail,
        aaddress1,
        aaddress2,
        acity,
        astate,
        azip,
        acountry,
        copyIds,
      },
    }
  )

  res.status(200).json({
    _id,
    entryid,
    title,
    author1,
    author2,
    yearpublished,
    categories,
    bigskyaward,
    isbn,
    nominatedby,
    publisher,
    paddress1,
    paddress2,
    pcity,
    pstate,
    pzip,
    pcountry,
    pphone,
    pemail,
    aaddress1,
    aaddress2,
    acity,
    astate,
    azip,
    acountry,
    copyIds,
  })
}

handler.patch((req, res) => saveBook(req, res))

handler.delete(async (req, res) => {
  const { _id } = JSON.parse(req.body)
  console.log("Delete", _id)

  const dbConnection = await dbPromise
  const collection = await dbConnection.db().collection("books")

  await collection.deleteOne({ _id: ObjectId(_id) })

  res.status(200).json({})
})

export default handler