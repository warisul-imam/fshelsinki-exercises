const Person = ({ name, number }) => <p>{name} {number}</p>

const Persons = ({ persons, nameFilter }) => {
  
  const NAME_MATCHES_FILTER = (name) => name.substring(0, nameFilter.trim().length).toLowerCase().trim() == nameFilter.toLowerCase().trim()
  const NAME_FILTER_IS_NOT_EMPTY = nameFilter.trim().length != 0

  return (
  <div>
    <h2>Numbers</h2>
      { NAME_FILTER_IS_NOT_EMPTY ?
        persons
          .filter(person => NAME_MATCHES_FILTER(person.name))
          .map(person =>
            <Person key={person.name} name={person.name} number={person.number} />
          )
        : persons
          .map(person =>
            <Person key={person.name} name={person.name} number={person.number} />
          )
      }
  </div>
);}

export default Persons;