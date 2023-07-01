import { useState } from 'react';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  }

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  }

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

  const personsToShow = filter 
    ? persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with <input type='text' value={filter} onChange={handleFilterChange} />
      <form onSubmit={handleSubmit}>
        <h2>add a new</h2>
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
      {personsToShow.map((person) => 
        <p key={person.id}>{person.name} {person.number}</p>
      )}
    </div>
  );
}

export default App;
