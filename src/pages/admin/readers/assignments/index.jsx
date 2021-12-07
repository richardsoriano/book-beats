import dbPromise, { jsonify } from '@/modules/mongodb'
import AdminReadersAssignments from '@/features/admin/readers/assignments'

// import readers from '@/data/readers'

export default function AdminReadersAssignmentsPage({ readerAssignments }) {
  return <AdminReadersAssignments readerAssignments={readerAssignments} />
  // readers
}

function aggregateReaderAssignments(readers) {
  return readers.map((reader) => ({
    reader: reader.name,
    max: reader.preferences.maxNumberOfBooks,
    assignedCount: reader.assignments.length,
    completedCount: reader.assignments.filter(
      (assignment) => assignment.reviewedOn || undefined
    ).length,
    availableCount:
      reader.preferences.maxNumberOfBooks - reader.assignments.length,
    categories: reader.preferences.categories,
  }))
}

export async function getServerSideProps() {
  const dbConnection = await dbPromise
  const collection = await dbConnection.db().collection('readers')
  const readers = await collection.find({}).toArray()

  console.log('getServerSideProps')
  return {
    props: {
      readerAssignments: aggregateReaderAssignments(jsonify(readers)),
    },
  }
}
