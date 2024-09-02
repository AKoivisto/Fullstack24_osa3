const express = require('express')
const app = express()

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
    const new_id = Math.floor(500*Math.random())
    const person = request.body
    person.id = String(new_id)

    persons = persons.concat(person)
    console.log(person)
    response.json(person)
  })
  
  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })