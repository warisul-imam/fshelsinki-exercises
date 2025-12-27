const Person = ({ id, name, number, persons, setPersons, deletePerson }) => {
  const handleDeletePerson = () =>  {
    deletePerson(id)
    setPersons(
      persons.filter(person => person.id != id)
    )
  }

  return (<p>{name} {number} <button onClick={handleDeletePerson}>delete</button></p>);
}

const Persons = ({ persons, setPersons, nameFilter, deletePerson }) => {
  
  const NAME_MATCHES_FILTER = (name) => name.substring(0, nameFilter.trim().length).toLowerCase().trim() == nameFilter.toLowerCase().trim()
  const NAME_FILTER_IS_NOT_EMPTY = nameFilter.trim().length != 0

  return (
  <div>
    <h2>Numbers</h2>
      { NAME_FILTER_IS_NOT_EMPTY ?
        persons
          .filter(person => NAME_MATCHES_FILTER(person.name))
          .map(person =>
            <Person
              key={person.name}
              id={person.id}
              name={person.name}
              number={person.number}
              persons={persons}
              setPersons={setPersons}
              deletePerson={deletePerson}
            />
          )
        : persons
          .map(person =>
            <Person
              key={person.name}
              id={person.id}
              name={person.name}
              number={person.number}
              persons={persons}
              setPersons={setPersons}
              deletePerson={deletePerson}
            />
          )
      }
  </div>
);}

export default Persons;