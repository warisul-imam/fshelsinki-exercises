const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('provide password as an argument')
    process.exit(1)
}

const dbPassword = process.argv[2]

const url = `mongodb+srv://mdwarisulimam_db_user:${dbPassword}@cluster0.zegfrlh.mongodb.net/?appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', personSchema)

const name = process.argv[3] ? process.argv[3] : null
const number = process.argv[4] ? process.argv[4] : null

if (name && number) {
    newPerson = new Person({ name, number })
    newPerson.save().then(result => {
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })
}

if (!name && !number) {
    Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(person => console.log(`${person.name} ${person.number}`))
    
        mongoose.connection.close()
    })
}