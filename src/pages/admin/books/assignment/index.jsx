import AdminBookAssignment from "@/features/admin/books/assignment";
import books from "@/data/books";

export default function AdminBookAssignmentPage({ bookAssignment }) {
  //return <div>{JSON.stringify(bookAssignment)}</div>;
  return <AdminBookAssignment bookAssignment={bookAssignment} />;
}

function aggregateBookAssignment(books) {
  // Not sure how to pass the bookId. I will hard code it here.
  return books.filter((book) => book._id === "2001");
}

export function getServerSideProps() {
  return {
    props: {
      bookAssignment: aggregateBookAssignment(books),
    },
  };
}
