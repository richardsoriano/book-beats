import AdminReaderAssignments from '@/features/admin/reader/assignments'
import readers from '@/data/readers'

export default function AdminReaderAssignmentsPage({ reader }) {
  return (
    <AdminReaderAssignments
      reader={reader}
      assignments={aggregateAssignments(reader)}
    />
  )
}

function aggregateAssignments(reader) {
  return reader.assignments.map((assignment) => ({
    book: assignment.book.title,
    reviwedOn: assignment.reviewedOn,
  }))
}

export function getServerSideProps(req) {
  return {
    props: {
      reader: readers.find((reader) => reader._id === req.query._id),
    },
  }
}
