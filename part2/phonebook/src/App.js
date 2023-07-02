import { useState, useEffect } from 'react';
import personService from './services/persons';
import Filter from './components/Filter';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => {
        setPersons(initialPersons);
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

    personService
      .create(newPerson)
      .then((returnedPerson) => {
        setPersons([...persons, returnedPerson]);
      });
  }

  const handleDelete = (e, id) => {
    const personToDelete = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personService
        .remove(id)
        .then((response) => {
          setPersons(persons.filter((person) => person.id !== id));
        })
    }
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
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default App;
