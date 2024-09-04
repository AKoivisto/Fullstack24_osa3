require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const Contact = require('./models/contact')
app.use(express.static('dist'))

app.use(express.json())

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  morgan_end = request.body

  if (body.name === undefined) { 
      return response.status(400).json({ 
      error: 'missing name!' 
    })
  }

  if (!body.number === undefined) { 
      return response.status(400).json({ 
      error: 'missing number!' 
    })
  }

  const contact = new Contact({
    name: body.name,
    number: body.number,
  })

  contact.save().then(savedContact => {
    response.json(savedContact)
  })
  .catch(error => next(error))

})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

const cors = require('cors')

app.use(cors())
var morgan_end = ""
morgan.token('data', () => JSON.stringify(morgan_end))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

  
  app.get('/api/persons', (request, response) => {
    Contact.find({}).then(contacts => {
      response.json(contacts)
    })
  })

  app.get('/api/persons/:id', (request, response, next) => {
    Contact.findById(request.params.id).then(contact => {
      if (contact) {
        response.json(contact)
      } else {
        response.status(404).end()
      }
      })
      .catch(error => next(error))
  })

  app.get('/info', (request, response) => {
    Contact.find({}).then(contacts => {
      const personCount = contacts.length
      response.send(`<p>Phonebook has info for ${personCount} people</p> <br>
        <p>${new Date()}</p>`)
    })

  })

  app.delete('/api/persons/:id', (request, response, next) => {
    Contact.findByIdAndDelete(request.params.id)
      .then(result => {
        response.status(204).end()
      })
      .catch(error => next(error))
  })

  app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
    console.log(body)
    const contact = {
      name: body.name,
      number: body.number,
    }

    Contact.findByIdAndUpdate(request.params.id, contact, {new: true})
      .then(updatedContact => {
        response.json(updatedContact)
      })
      .catch(error => next(error))
  })

  app.use(unknownEndpoint)
  app.use(errorHandler)

  const PORT = process.env.PORT
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
