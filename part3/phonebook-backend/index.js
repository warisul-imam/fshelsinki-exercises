require('dotenv').config()

const express = require("express")
const morgan = require("morgan")
const app = express()

const Person = require('./models/people')

app.use(express.json())
app.use(express.static('dist'))

morgan.token('body', (req) => JSON.stringify(req.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

app.get("/api/persons", (req, res) => {
  Person.find({}).then(people => {
    res.json(people)
  })
})

app.get("/api/persons/:id", (req, res, next) => {
  const id = req.params.id

  Person.findById(id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
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

app.put("/api/persons/:id", (req, res, next) => {
  const id = req.params.id
  const updatedPersonData = req.body
  Person.findByIdAndUpdate(id, updatedPersonData, { new: true })
    .then(updatedPerson => {
      console.log('updated person: ', updatedPerson)
      res.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.delete("/api/persons/:id", (req, res, next) => {
  const id = req.params.id
  Person.findByIdAndDelete(id)
    .then(result => res.status(204).end())
    .catch(error => next(error))
})

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
