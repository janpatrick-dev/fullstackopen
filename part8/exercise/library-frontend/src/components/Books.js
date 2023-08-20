import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"
import { useState } from "react";

const filters = [
  'refactoring',
  'agile',
  'patterns',
  'design',
  'crime',
  'classic',
  'all genres'
];

const Books = () => {
  const [filter, setFilter] = useState('all genres');
  const query = useQuery(ALL_BOOKS);

  if (query.loading) {
    return null
  }

  const books = filter !== 'all genres' 
    ? query.data.allBooks.filter((b) => b.genres.includes(filter))
    : query.data.allBooks;

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {filters.map((f) => (
        <button key={f} onClick={() => setFilter(f)}>{f}</button>
      ))}
    </div>
  )
}

export default Books
