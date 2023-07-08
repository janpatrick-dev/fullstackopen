import { useState, useEffect } from 'react';
import personService from './services/persons';
import Filter from './components/Filter';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

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
    const existingPerson = persons.find((person) => person.name === newPerson.name);

    setNewName('');
    setNewNumber('');
    if (existingPerson) {
      const promptText = `${newPerson.name} is already added to phone book, replace the old number with a new one?`;
      if (window.confirm(promptText)) {
        personService
          .update(existingPerson.id, newPerson)
          .then((returnedPerson) => {
            setSuccess(`Updated ${returnedPerson.name}`);
            setTimeout(() => {
              setSuccess(null);
            }, 5000);
            setPersons(persons.map((person) => {
              return person.id !== returnedPerson.id 
                ? person 
                : returnedPerson 
            }));
          })
          .catch((error) => {
            setError(`Information of ${existingPerson.name} has already been removed from server`);
            setTimeout(() => {
              setError(null);
            }, 5000);
            setPersons(persons.filter((person) => person.id !== existingPerson.id));
          })
      }
    } else {
      personService
        .create(newPerson)
        .then((returnedPerson) => {
          setSuccess(`Added ${returnedPerson.name}`);
          setTimeout(() => {
            setSuccess(null);
          }, 5000);
          setPersons([...persons, returnedPerson]);
        })
        .catch((e) => {
          setError(e.response.data.error);
        });
    }
  }

  const handleDelete = (e, id) => {
    const personToDelete = persons.find((person) => person.id === id);
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personService
        .remove(id)
        .then((response) => {
          setSuccess(`Deleted ${personToDelete.name}`);
          setTimeout(() => {
            setSuccess(null);
          }, 5000);
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((error) => {
          setError(`Information of ${personToDelete.name} has already been removed from server`);
          setTimeout(() => {
            setError(null);
          }, 5000);
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
      <Notification
        className={error ? 'error' : 'success'}
        message={error ? error : success}
      />

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
