import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}

const dbPromise =
  process.env.NODE_ENV === 'development' ? development() : production()

export function jsonify(val) {
  return JSON.parse(JSON.stringify(val))
}

export default dbPromise

function development() {
  // Export a module-scoped MongoClient promise. By doing this in a
  // separate module, the client can be shared across functions.
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = new MongoClient(uri, options).connect()
  }
  return global._mongoClientPromise
}

function production() {
  return new MongoClient(uri, options).connect()
}
