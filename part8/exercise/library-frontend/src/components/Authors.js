import { useQuery } from "@apollo/client"
import { ALL_AUTHORS } from "../queries"
import UpdateAuthor from "./UpdateAuthor";

const Authors = (props) => {
  const query = useQuery(ALL_AUTHORS);

  if (!props.show || query.loading) {
    return null
  }
  
  const authors = query.data.allAuthors;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <UpdateAuthor />
    </div>
  )
}

export default Authors
