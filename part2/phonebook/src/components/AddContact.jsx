import { useState } from 'react'

const AddContact = ({
  persons,
  setPersons,
  createPerson,
  updatePerson,
  notifTypes,
  sendNotif
}) => {

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  
  const addPerson = (event) => {
    event.preventDefault()

    const newPersonObj = {
      name: newName,
      number: newNumber
    }

    const CONFIRM_UPDATE_MSG = `${newPersonObj.name} is already added to phonebook, replace the old number with new one?`

    const existingPerson = persons.filter(person => person.name == newPersonObj.name)[0]

    if (!!existingPerson) {
      if (confirm(CONFIRM_UPDATE_MSG)) {
        const updatedPersonObj = newPersonObj
        updatePerson(existingPerson.id, updatedPersonObj)
          .then(updatedPerson => {
            setPersons(
              persons.map(
                person => person.id == updatedPerson.id ?
                  updatedPerson
                  : person
              )
            )
            sendNotif(notifTypes.UPDATE_SUCCESS, `Updated ${updatedPerson.name}'s number to ${updatedPerson.number}`)
          })
          .catch(err => {
            sendNotif(notifTypes.ERR_404, `Information of ${updatedPersonObj.name} has already been removed from server.`)
            setPersons(persons.filter(person => person.name != updatedPersonObj.name))
          })
      }
    }

    else {
      createPerson(newPersonObj)
        .then(newPerson => {
          setPersons([...persons, newPerson])
          sendNotif(notifTypes.CREATION_SUCCESS, `Added ${newPerson.name} to phonebook.`)
        })
    }

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