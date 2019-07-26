require('dotenv').config()
const mongoose = require('mongoose')
const User = require('./models/User')
const Customer = require('./models/Customer')
const Visit = require('./models/Visit')

const testCoords = [
  [-5.996295, 37.38264],
  [-8.712447, 42.23136],
  [2.169919, 41.38792],
  [-3.700346, 40.41669],
  [-2.923441, 43.25696],
  [-0.481006, 38.3452],
  [-0.8765379, 41.65629],
  [-5.844759, 43.36026],
  [-5.663047, 40.96497],
  [-6.970284, 38.8786]
]

mongoose
  .connect(process.env.DB, { useNewUrlParser: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
    load()
  })
  .catch(err => {
    mongoose.connection.close()
    console.error('Error connecting to mongo', err)
  })

async function load() {
  try {
    // let testUsers = []
    // for (let i = 1; i <= 10; i++) {
    //   testUsers.push({
    //     firstname: `pepe${i}`,
    //     surname: `López`,
    //     email: `pepe${i}@p.p`,
    //     role: 'SALESREP'
    //   })
    // }

    // const newAdmin = await User.register(
    //   {
    //     firstname: `Roger`,
    //     surname: `Ayra`,
    //     email: `roger@p.p`,
    //     role: 'ADMIN'
    //   },
    //   '1234'
    // )

    // const newUsers = await Promise.all(testUsers.map(testUser => User.register(testUser, '1234')))

    // let testCustomers = []
    // for (let i = 0; i < newUsers.length; i++) {
    //   for (let j = 1; j <= 100; j++) {
    //     testCustomers.push({
    //       name: `Cliente${i}${j}`,
    //       sector: 'auto',
    //       salesRep: newUsers[i]._id,
    //       location: {
    //         type: 'Point',
    //         coordinates: [testCoords[i][0], testCoords[i][1]]
    //       }
    //     })
    //   }
    // }

    // const newCustomers = await Customer.create(testCustomers)

    let testVisit = {
      start: new Date(2019, 7, 27, 9, 30),
      end: new Date(2019, 7, 27, 11),
      user: mongoose.Types.ObjectId('5d39faece7a8a0027edf442a'),
      customer: mongoose.Types.ObjectId('5d39faede7a8a0027edf4438'),
      purpose: 'Presentación oferta'
    }

    const newVisit = await Visit.create(testVisit)
  } catch (error) {
    console.error(error)
  } finally {
    mongoose.connection.close()
  }
}
