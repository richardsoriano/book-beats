import AdminReadersInvitees from '@/features/admin/readers/invitees'
import readers from '@/data/readers'

export default function AdminReadersInviteesPage({ readers }) {
  // return <AdminReadersInvitees readers={readers} />
  console.log('readers invitees', readers)
  return (
    <div>
      <h1>hello Admin Readers Invitees Page</h1>
    </div>
  )
}

function aggregateReaderInvitees(readers) {
  return readers.reduce((acc, reader) => {
    return [
      ...acc,
      {
        _id: reader._id,
        name: reader.name,
        email: reader.email,
        categories: reader.preferences.categories,
        role: reader.role,
      },
    ]
  }, [])
}

export function getServerSideProps(ctx) {
  return {
    props: {
      readers: aggregateReaderInvitees(readers),
    },
  }
}
