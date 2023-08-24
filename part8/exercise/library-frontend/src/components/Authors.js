import { useQuery } from "@apollo/client"
import { ALL_AUTHORS, USER } from "../queries"
import UpdateAuthor from "./UpdateAuthor";
import { useEffect } from "react";

const Authors = ({ setUser }) => {
  const userQuery = useQuery(USER, {
    fetchPolicy: 'no-cache'
  });
  const query = useQuery(ALL_AUTHORS);

  useEffect(() => {
    if (userQuery.data && userQuery.data.me) {
      setUser(userQuery.data.me);
    }
  }, [userQuery])

  if (userQuery.loading || query.loading) {
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
      <UpdateAuthor authors={authors} />
    </div>
  )
}

export default Authors
