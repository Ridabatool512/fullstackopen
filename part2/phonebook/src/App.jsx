import { useState } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'

const App = () => {
  const [persons, setPersons] = useState([
  { id: 1, name: 'Ali Khan', number: '0301-1234567' },
  { id: 2, name: 'Ayesha Ahmed', number: '0321-9876543' },
  { id: 3, name: 'Muhammad Hamza', number: '0333-4567890' },
  { id: 4, name: 'Fatima Noor', number: '0345-6789012' }

  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addPerson = (event) => {
  event.preventDefault()

  const exists = persons.some(
    person => person.name.toLowerCase() === newName.toLowerCase()
  )

  if (exists) {
    alert(`${newName} is already added to the phonebook`)
    return
  }

  const personObject = {
    id: persons.length + 1,
    name: newName,
    number: newNumber
  }

  setPersons(persons.concat(personObject))
  setNewName('')
  setNewNumber('')
}
  const personsToShow =
    filter === ''
      ? persons
      : persons.filter(person =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        )

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter
        filter={filter}
        handleFilterChange={(e) => setFilter(e.target.value)}
      />

      <h3>Add a new</h3>

      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={(e) => setNewName(e.target.value)}
        newNumber={newNumber}
        handleNumberChange={(e) => setNewNumber(e.target.value)}
      />

      <h3>Numbers</h3>

      <Persons persons={personsToShow} />
    </div>
  )
}

export default App