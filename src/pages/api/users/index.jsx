import { hash } from 'bcrypt'
import dbPromise from '@/modules/mongodb'
// $2b$07$y4h2CyRN5QOI42WTrXnr2eNy7rQjHmFK7NNBcCJRZB7BxBqd2HaWq
export default async function UsersApi(req, res) {
  const { email, password } = req.body
  const hashedPassword = await hash(password, 7)
  const dbConnection = await dbPromise
  await dbConnection
    .db()
    .collection('users')
    .insertOne({ email, hashedPassword })

  res.status(201).json({ hashedPassword })
}
