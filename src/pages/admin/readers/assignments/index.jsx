// import dbPromise, { jsonify } from '@/modules/mongodb'
import AdminReadersInvitees from '@/features/admin/readers/invitees'

import readers from '@/data/readers'

export default function AdminReadersAssignmentsPage({ readerAssignments }) {
  return <AdminReadersAssignments readerAssignments={readerAssignments} />

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
  // TODO
  // const dbConnection = await dbPromise
  // const collection = await dbConnection.db().collection('readers')
  // const readers = await collection.find({}).toArray()

  return {
    props: {
      // readerAssignments: aggregateReaderAssignments(jsonify(readers)),
      readerAssignments: aggregateReaderAssignments(readers),
    },
  }
}
