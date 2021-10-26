import AdminBookAssignments from "@/features/admin/books/assignments";
import readers from "@/data/readers";

export default function AdminBookAssignmentsPage({ bookAssignments }) {
  // return <div>{JSON.stringify(bookAssignments)}</div>;
  return <AdminBookAssignments bookAssignments={bookAssignments} />;
}

function aggregateBookAssignments(readers) {
  const books = readers
    .flatMap((reader) =>
      reader.assignments.flatMap((assignment) => assignment.book)
    )
    .reduce((acc, book) => {
      return acc.map((book) => book._id).includes(book._id)
        ? acc
        : [...acc, book];
    }, []);

  console.dir(books);

  return books.reduce((acc, book) => {
    const assigned = readers.flatMap((reader) =>
      reader.assignments.filter(
        (assignment) => assignment.book._id === book._id
      )
    );

    const reviewed = readers.flatMap((reader) =>
      reader.assignments.filter(
        (assignment) =>
          assignment.book._id === book._id && assignment.reviewedOn
      )
    );

    return [
      ...acc,
      {
        ...book,
        assignedCount: assigned.length,
        reviewedCount: reviewed.length,
      },
    ];
  }, []);

  return readers.reduce((acc, reader) => {
    return [
      ...acc,
      ...reader.assignments.map((assignment) => ({
        book: assignment.book,
        round: 1,
        assigned: readers.filter((reader) =>
          reader.assignments.map(
            (_assignment) => _assignment._id === assignment._id
          )
        ).length,
        completed: readers.filter((reader) =>
          reader.assignments.map(
            (_assignment) =>
              _assignment._id === assignment._id && assignment.reviewedOn
          )
        ).length,
      })),
    ];
    return acc;
  }, []);
}

export function getServerSideProps() {
  return {
    props: {
      bookAssignments: aggregateBookAssignments(readers),
    },
  };
}
