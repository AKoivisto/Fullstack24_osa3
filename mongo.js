const mongoose = require('mongoose')

if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
  }
  
  const password = process.argv[2]

  const url = `mongodb+srv://anttonvkoivisto:${password}@phonebook-backend.608sw.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Phonebook-backend`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const contactSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Contact = mongoose.model('Contact', contactSchema)

const contact = new Contact({
    name: 'Arto H',
    number: '123-123'
})

contact.save().then(result => {
    console.log('contact saved!')
    mongoose.connection.close()
})
