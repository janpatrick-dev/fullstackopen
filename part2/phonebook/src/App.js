import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]);
  const [newName, setNewName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPerson = { name: newName }
    const newPersonExists = persons.filter((person) => person.name === newPerson.name).length > 0;

    setNewName('');
    if (newPersonExists) {
      return alert(`${newPerson.name} is already added to phonebook`);
    }

    setPersons([...persons, newPerson]);
  }

  const handleChange = (e) => {
    setNewName(e.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: 
          <input type='text' value={newName} onChange={handleChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => 
        <p>{person.name}</p>
      )}
    </div>
  );
}

export default App;
