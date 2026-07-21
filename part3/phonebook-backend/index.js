const morgan = require('morgan')
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)
console.log('Starting server...')

let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456"
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523"
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345"
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122"
  }
]

// Home route
app.get('/', (req, res) => {
  res.send('Server is running!')
})

// Get all persons
app.get('/api/persons', (req, res) => {
  res.json(persons)
})

// Get single person
app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id

  const person = persons.find(person => person.id === id)

  if (person) {
    res.json(person)
  } else {
    res.status(404).json({
      error: 'person not found'
    })
  }
})

// Delete person
app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id

  persons = persons.filter(person => person.id !== id)

  res.status(204).end()
})

// Add person
app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'name or number missing'
    })
  }

  const personExists = persons.some(
    person => person.name === body.name
  )

  if (personExists) {
    return res.status(400).json({
      error: 'name must be unique'
    })
  }

  const newPerson = {
    id: String(Math.floor(Math.random() * 1000000)),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(newPerson)

  res.json(newPerson)
})

// Info page
app.get('/info', (req, res) => {
  const date = new Date()

  res.send(`
    <h1>Phonebook Info</h1>
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${date}</p>
  `)
})


// Error handling middleware (must be before unknown endpoint)
const errorHandler = (error, req, res, next) => {

  if (error.name === 'SyntaxError') {
    return res.status(400).json({
      error: 'invalid JSON'
    })
  }

  next(error)
}

app.use(errorHandler)


// Unknown endpoint middleware (must be last)
const unknownEndpoint = (req, res) => {
  res.status(404).json({
    error: 'unknown endpoint'
  })
}

app.use(unknownEndpoint)


const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})