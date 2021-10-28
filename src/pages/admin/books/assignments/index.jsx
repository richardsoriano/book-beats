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
        : [...acc, { ...book, round: 1 }];
    }, []);

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
        status:
          assigned.length === reviewed.length ? "Completed" : "In progress",
      },
    ];
  }, []);
}

export function getServerSideProps() {
  return {
    props: {
      bookAssignments: aggregateBookAssignments(readers),
    },
  };
}
