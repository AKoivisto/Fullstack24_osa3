const mongoose = require('mongoose')
const url = process.env.MONGODB_URI
mongoose.set('strictQuery', false)
  
console.log('connecting to', url)
mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

    const contactSchema = new mongoose.Schema({
        name: {
            type: String,
            minlength: 3,
            required: true
            },
        number: {
            type: String,
            minlength: 8,
            required: true,
            validate: {
                validator: function(v) {
                    return /^\d{2,3}\-\d{4,}$/.test(v);
                }
            }
          },     
    })

    contactSchema.set('toJSON', {
        transform: (document, returnedObject) => {
            returnedObject.id = returnedObject._id.toString()
            delete returnedObject._id
            delete returnedObject.__v
        }
    })

module.exports = mongoose.model('Contact',contactSchema)



