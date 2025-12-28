const cors = require("cors")
const express = require("express")
const morgan = require("morgan")
const app = express()

app.use(cors())

app.use(express.json())
app.use(express.static('dist'))

morgan.token('body', (req) => JSON.stringify(req.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let contacts = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get("/api/persons", (req, res) => {
   res.json(contacts)
})

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id
  const person = contacts.find(person => person.id == id)
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.get("/info", (req, res) => {
  let date_time = Date()
  res.send(`
    <p>Phonebook has info for ${contacts.length} people</p>
    <p>${date_time}</p>`
  )
})

app.post("/api/persons", (req, res) => {
  let person = req.body

  if (!person.name || !person.number) {
    error = `${!person.name && 'name ' || ''}${!person.name && !person.number && 'and ' || ''}${!person.number && 'number ' || ''}${!person.name && !person.number && 'are' || 'is'} missing`

    return res.status(400).json({ error })
  }

  const nameExists = contacts.find(contact => contact.name === person.name)

  if (nameExists) {
    return res.status(400).json({
      error: "name must be unique"
    })
  }


  const id = Math.floor(Math.random() * 10000)
  const newPerson = { ...person, id }
  contacts = contacts.concat(newPerson)
  res.status(201).json(newPerson)
})

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id

  const contact = contacts.find(contact => contact.id == id)

  if (!contact) {
    return res.status(404).json({
      error: "person not found"
    })
  }

  contacts = contacts.filter(person => person.id != id)

  res.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
