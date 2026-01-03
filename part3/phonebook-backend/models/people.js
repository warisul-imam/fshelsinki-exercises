const mongoose = require('mongoose')

const dbPassword = process.argv[2]

const url = process.env.MONGODB_URI

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })
    .then(result => console.log('connected to MongoDB'))
    .catch(err => console.log('error connecting to MongoDB', err))

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 5
    },
    number: {
        type: String,
        minLength: 9,
        validate: {
            validator: (v) => /^\d{2,3}-\d+$/.test(v),
            message: (props) => `${props.value} is not a valid phone number!`
        }
    }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)