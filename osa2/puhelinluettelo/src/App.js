import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const PersonsList = ({ persons, filter, handleButton }) => {
  return (
    <div>
      {
        persons
          .filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))
          .map((person) => <p key={person.name}>{person.name} {person.number} <button onClick={() => handleButton(person.id)} >Poista</button> </p>)
      }
    </div>
  )
}

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      Filter shown list with <input value={filter} onChange={handleFilterChange} />
    </div>
  )
}

const AddNewForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        Name: <input value={newName} onChange={handleNameChange} />
        <br />
        Number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(persons => setPersons(persons))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to the phonebook`)
      return false
    }
    const newPerson = {
      name: newName,
      number: newNumber
    }

    personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleDeleteButton = (id) => {
    const confirmed = window.confirm(`Poistetaanko ${persons.find(person => person.id === id).name}`)
    if(confirmed) {
      personService.remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h2>Add new</h2>
      <AddNewForm 
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <PersonsList persons={persons} filter={filter} handleButton={handleDeleteButton}/>
    </div>
  )
}

export default App