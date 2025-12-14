import { useState } from 'react'

const AddContact = ({ persons, setPersons }) => {

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  
  const addPerson = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newNumber
    }

    if (persons.filter(person => person.name == newPerson.name).length != 0) {
      alert(`${newPerson.name} is already added to phonebook`)
      setNewName('')
      return;
    }

    setPersons([...persons, newPerson])
    setNewName('')
    setNewNumber('')
  }
  
  return (
  <div>
    <h2>Add a new contact</h2>
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={event => setNewName(event.target.value)} /> <br />
        number: <input value={newNumber} onChange={event => setNewNumber(event.target.value)} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  </div>
);}

export default AddContact;