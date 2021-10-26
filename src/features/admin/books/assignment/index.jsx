export default function AdminBookAssignment({ bookAssignment }) {
  return (
    <div>
      <table>
        <tr>
          <th>Title</th>
          <th>Round</th>
        </tr>
        <tbody>
          {bookAssignment.map((book) => (
            <tr>
              <td>1{book.title}</td>
              <td>2{book.genres.join(",")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
