import dbPromise from "@/modules/mongodb"

export default async function CreateBook(req, res) {
  console.log("Create Book")
  let {
    entryid,
    title,
    nomstatuses,
    nommemo,
    author1,
    author2,
    // yearpublished,
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
    aphone,
    aemail,
    aaddress1,
    aaddress2,
    acity,
    astate,
    azip,
    acountry,
    captcha,
    created,
    copyIds,
  } = JSON.parse(req.body)

  const newCopyIds = copyIds.length ? copyIds.split(",") : ""
  copyIds = newCopyIds
  console.log(
    "books",
    entryid,
    title,
    nomstatuses,
    nommemo,
    author1,
    author2,
    // yearpublished,
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
    aphone,
    aemail,
    aaddress1,
    aaddress2,
    acity,
    astate,
    azip,
    acountry,
    captcha,
    created,
    copyIds
  )
  const dbConnection = await dbPromise
  const collection = await dbConnection.db().collection("books")
  const { insertedId } = await collection.insertOne({
    entryid,
    title,
    nomstatuses,
    nommemo,
    author1,
    author2,
    // yearpublished,
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
    aphone,
    aemail,
    aaddress1,
    aaddress2,
    acity,
    astate,
    azip,
    acountry,
    captcha,
    created,
    copyIds,
  })

  res.status(201).json({
    _id: insertedId.toString(),
    entryid,
    title,
    nomstatuses,
    nommemo,
    author1,
    author2,
    // yearpublished,
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
    aphone,
    aemail,
    aaddress1,
    aaddress2,
    acity,
    astate,
    azip,
    acountry,
    captcha,
    created,
    copyIds,
  })
}