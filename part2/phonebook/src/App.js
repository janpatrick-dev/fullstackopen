import { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then((response) => {
        setPersons(response.data);
      });
  }, [])

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
    const newPerson = { name: newName, number: newNumber, id: persons.length + 1 }
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

      <Filter
        text='filter shown with'
        value={filter}
        handleChange={handleFilterChange}
      />

      <h3>add a new</h3>

      <PersonForm 
        name={newName}
        number={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
      />
      
      <h3>Numbers</h3>

      <Persons
        persons={personsToShow}
      />
    </div>
  );
}

export default App;
