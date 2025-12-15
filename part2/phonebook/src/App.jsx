import { useEffect, useState } from 'react'
import {
  AddContact,
  Filter,
  Notification,
  Persons
} from './components'
import personsService from './services/persons'

const App = () => {

  const [persons, setPersons] = useState([])

  useEffect(() => {

    personsService.getAllPersons()
      .then(persons => setPersons(persons))
  }, [])

  const [nameFilter, setNameFilter] = useState('')

  const [notifType, setNotifType] = useState(null)
  const [notifMessage, setNotifMessage] = useState('')

  const notifTypes = {
    CREATION_SUCCESS: 0,
    UPDATE_SUCCESS: 1,
    ERR_404: 2
  }

  const sendNotif = (type, msg) => {
    
    setNotifType(type)
    setNotifMessage(msg)

    setTimeout(() => {
      setNotifType(null)
      setNotifMessage('')
    }, 3500)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notifTypes={notifTypes} notifType={notifType} msg={notifMessage} />
      <Filter filter={nameFilter} setFilter={setNameFilter} />
      <AddContact
        persons={persons}
        setPersons={setPersons}
        createPerson={personsService.createPerson}
        updatePerson={personsService.updatePerson}
        sendNotif={sendNotif}
        notifTypes={notifTypes}
      />
      <Persons
        persons={persons}
        setPersons={setPersons}
        nameFilter={nameFilter}
        deletePerson={personsService.deletePerson} />
    </div>
  )
}

export default App