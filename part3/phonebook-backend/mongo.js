const mongoose = require('mongoose')

const password = process.argv[2]

if (!password) {
  console.log('Please provide the password as an argument:')
  console.log('node mongo.js <password>')
  process.exit(1)
}

const url =
  `mongodb://fullstackuser:${password}@ac-x0ay6sr-shard-00-00.kjb5opu.mongodb.net:27017,ac-x0ay6sr-shard-00-01.kjb5opu.mongodb.net:27017,ac-x0ay6sr-shard-00-02.kjb5opu.mongodb.net:27017/phonebook?ssl=true&replicaSet=atlas-8xnct4-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

mongoose
  .connect(url)
  .then(() => {
    console.log('Connected to MongoDB')

    if (process.argv.length === 3) {
      console.log('phonebook:')

      return Person.find({})
        .then(result => {
          result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
          })
          mongoose.connection.close()
        })
    }

    if (process.argv.length === 5) {
      const person = new Person({
        name: process.argv[3],
        number: process.argv[4],
      })

      return person.save()
        .then(result => {
          console.log(`added ${result.name} number ${result.number} to phonebook`)
          mongoose.connection.close()
        })
    }

    console.log('Usage:')
    console.log('node mongo.js <password>')
    console.log('or')
    console.log('node mongo.js <password> "Name" "Number"')
    mongoose.connection.close()
  })
  .catch(error => {
    console.log('Error connecting to MongoDB:')
    console.log(error.message)
  })