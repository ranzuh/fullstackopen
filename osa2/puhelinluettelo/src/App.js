import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const PersonsList = ({ persons, filter, handleButton }) => {
  return (
    <div>
      {
        persons
          .filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))
          .map((person) => <p key={person.name}>{person.name} {person.number} <button onClick={() => handleButton(person.id)} >Delete</button> </p>)
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

    const newPerson = {
      name: newName,
      number: newNumber
    }

    if (persons.some((person) => person.name === newName)) {
      const confirmed = window.confirm(`${newName} is already added to the phonebook, update the old number with new one?`)
      if (confirmed) {
        const oldId = persons.find(person => person.name === newName).id
        personService.update(oldId, newPerson)
          .then(response => {
            setPersons(persons.map(person => person.id !== oldId ? person : response))
          })
      }
      return false
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
    const confirmed = window.confirm(`Delete ${persons.find(person => person.id === id).name}`)
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