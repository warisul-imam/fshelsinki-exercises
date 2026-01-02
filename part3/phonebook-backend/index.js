require('dotenv').config()

const express = require("express")
const morgan = require("morgan")
const app = express()

const Person = require('./models/people')

app.use(express.json())
app.use(express.static('dist'))

morgan.token('body', (req) => JSON.stringify(req.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get("/api/persons", (req, res) => {
  Person.find({}).then(people => {
    res.json(people)
  })
})

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id

  Person.findById(id)
    .then(person => res.json(person))
    .catch(error => res.status(404).json({ error }))
})

app.get("/info", (req, res) => {
  let date_time = Date()
  Person.find({})
    .then(people => {
      res.send(`
        <p>Phonebook has info for ${people.length} people</p>
        <p>${date_time}</p>
      `)
    })
})

app.post("/api/persons", (req, res) => {
  let person = req.body

  if (!person.name || !person.number) {
    error = `${!person.name && 'name ' || ''}${!person.name && !person.number && 'and ' || ''}${!person.number && 'number ' || ''}${!person.name && !person.number && 'are' || 'is'} missing`

    return res.status(400).json({ error })
  }

  const newPerson = new Person({ name: person.name, number: person.number })
  newPerson.save()
    .then(newPerson => res.status(201).json(newPerson))
})

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id
    Person.deleteOne({_id: id})
    .then(result => {
      if (result.deletedCount == 0) {
        res.status(404).json({ error : "Person not found" })
      } else {
        res.status(204).end()
      }
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
