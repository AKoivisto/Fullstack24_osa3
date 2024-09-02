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

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/persons', (request, response) => {
    response.json(persons)
  })
  
  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })