import axios from 'axios'
import { useEffect, useState } from 'react'
import {
  Filter,
  AddContact,
  Persons
} from './components'

const App = () => {

  const [persons, setPersons] = useState([])

  useEffect(() => {
    axios.get("http://localhost:3001/persons")
      .then(response => {
        const personsData = response.data
        setPersons(personsData)
      })
  }, [persons])

  const [nameFilter, setNameFilter] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={nameFilter} setFilter={setNameFilter} />
      <AddContact persons={persons} setPersons={setPersons} />
      <Persons persons={persons} nameFilter={nameFilter} />
    </div>
  )
}

export default App