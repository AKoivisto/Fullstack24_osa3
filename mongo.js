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
    name: {
        type: String,
        minlength: 3,
        required: true
    },
    number: String,
})

const Contact = mongoose.model('Contact', contactSchema)

if (process.argv.length===3) {
    console.log('phonebook:')
    Contact.find({}).then(result => {
        result.forEach(contact => {
            console.log(contact.name,contact.number)
        })
        mongoose.connection.close()
    })
  }

else {
const contact = new Contact({
    name: process.argv[3],
    number: process.argv[4]
})

contact.save().then(result => {
    console.log('contact saved!')
    mongoose.connection.close()
})

}
