import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Recommendations = ({ user }) => {
  const booksQuery = useQuery(ALL_BOOKS, {
    variables: { genre: user ? user.favoriteGenre : '' }
  });

  if (!user || booksQuery.loading) {
    return null;
  }

  const books = booksQuery.data.allBooks;

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <strong>{user.favoriteGenre}</strong></p>
      <table>
        <tbody>
          <tr>
            <td></td>
            <td><strong>author</strong></td>
            <td><strong>published</strong></td>
          </tr>
          {books.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations;