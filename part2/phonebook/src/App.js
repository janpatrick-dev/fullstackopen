import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPerson = { name: newName, number: newNumber }
    const newPersonExists = persons.filter((person) => person.name === newPerson.name).length > 0;

    setNewName('');
    setNewNumber('');
    if (newPersonExists) {
      return alert(`${newPerson.name} is already added to phonebook`);
    }

    setPersons([...persons, newPerson]);
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: 
          <input 
            type='text' 
            value={newName} 
            onChange={handleNameChange} 
          />

        </div>
        <div>
          number:
          <input
            type='text'
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => 
        <p>{person.name} {person.number}</p>
      )}
    </div>
  );
}

export default App;
