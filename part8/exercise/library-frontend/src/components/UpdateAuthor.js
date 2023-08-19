import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";
import Select from "react-select";

const UpdateAuthor = ({ authors }) => {
  const [name, setName] = useState(null);
  const [born, setBorn] = useState('');
  const [ editAuthor, result ] = useMutation(EDIT_AUTHOR, {
    update: (cache, response) => {
      cache.updateQuery({ query: ALL_AUTHORS }, ({ allAuthors }) => {
        return {
          allAuthors: allAuthors.map(a => {
            if (a.name === response.data.editAuthor.name) {
              return response.data.editAuthor;
            }
            return a;
          })
        }
      });
    }
  });

  const options = authors.map((a) => {
    return {
      value: a.name,
      label: a.name
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    editAuthor({ variables: { name: name.value, setBornTo: Number(born) } });
    setBorn('');
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={handleSubmit}>
        <Select
          defaultValue={name}
          onChange={setName}
          options={options}
        />
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