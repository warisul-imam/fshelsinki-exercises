import { useEffect, useState } from 'react'
import {
  AddContact,
  Filter,
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

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={nameFilter} setFilter={setNameFilter} />
      <AddContact
        persons={persons}
        setPersons={setPersons}
        createPerson={personsService.createPerson}
        updatePerson={personsService.updatePerson}
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