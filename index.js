const express = require('express')
const app = express()
const morgan = require('morgan')

let persons = [
    {
        id: "1",
        name: "Arto Hellas",
        number: "040-13579"
    },
    {
        id: "2",
        name: "Mikko Mikkola",
        number: "080-391720"
    },
    {
        id: "3",
        name: "Timo Timonen",
        number: "030-1323279"
    },
    {
        id: "4",
        name: "Kaija Kataja",
        number: "3298-9292871"
    }
]

app.use(express.json())
var morgan_end = ""
morgan.token('data', () => JSON.stringify(morgan_end))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/persons', (request, response) => {
    response.json(persons)
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
  })

  app.get('/info', (request, response) => {
    const personCount = persons.length
    response.send(`<p>Phonebook has info for ${personCount} people</p> <br>
        <p>${new Date()}</p>`)
  })

  app.delete('/api/persons/:id', (request, response) => {
    
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })

  app.post('/api/persons', (request, response) => {
    const new_id = String(Math.floor(500*Math.random()))
    const body = request.body
    morgan_end = request.body

    if (!body.name ) { 
        return response.status(400).json({ 
        error: 'missing name!' 
      })
    }

    if (!body.number) { 
        return response.status(400).json({ 
        error: 'missing number!' 
      })
    }

    const personunique = persons.find(person => person.name === body.name) 
    if (personunique) {    
        return response.status(400).json({
            error: `${body.name} is already in the phonebook`
        })
    }

    const person = {
        id: new_id,
        name: body.name,
        number: body.number
    }
    
    persons = persons.concat(person)
    console.log(person)
    response.json(person)
  })
  
  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
