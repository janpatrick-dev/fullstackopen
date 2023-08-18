import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";

const UpdateAuthor = () => {
  const [name, setName] = useState('');
  const [born, setBorn] = useState('');
  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS }]
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    editAuthor({ variables: { name, setBornTo: Number(born) } });
    setName('');
    setBorn('');
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name <input
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          born <input
            value={born}
            onChange={(e) => setBorn(e.target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
};

export default UpdateAuthor;