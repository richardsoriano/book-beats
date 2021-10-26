import AdminReaderAssignments from "@/features/admin/readers/assignments";
import readers from "@/data/readers";

export default function AdminReadersAssignmentsPage({ readerAssignments }) {
  // return <div>{JSON.stringify(readerAssignments)}</div>;
  return <AdminReaderAssignments readerAssignments={readerAssignments} />;
}

function aggregateReaderAssignments(readers) {
  let acc = [];
  readers.forEach((reader) => {
    acc.push({
      name: reader.name,
      preferences: reader.preferences,
      assignedCount: reader.assignments.length,
      reviewedCount: reader.assignments.filter(
        (assignment) => assignment.reviewedOn
      ).length,
    });
  });
  return acc;

  // return readers.reduce((acc, reader) => {
  //   reader.assignments.forEach((assignment) => {
  //     acc.push({
  //       book: assignment.book,
  //       round: 1,
  //       assigned: readers.filter((reader) =>
  //         reader.assignments.map(
  //           (_assignment) => _assignment._id === assignment._id
  //         )
  //       ).length,
  //       completed: readers.filter((reader) =>
  //         reader.assignments.map(
  //           (_assignment) =>
  //             _assignment._id === assignment._id && assignment.reviewedOn
  //         )
  //       ).length,
  //     });
  //   });
  //   return acc;
  // }, []);
}

export function getServerSideProps() {
  return {
    props: {
      readerAssignments: aggregateReaderAssignments(readers),
    },
  };
}
