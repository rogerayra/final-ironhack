require('dotenv').config()
const mongoose = require('mongoose')
const User = require('./models/User')
const Customer = require('./models/Customer')
const Visit = require('./models/Visit')
const GeoArea = require('./models/GeoArea')
const fs = require('fs')

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
    let rawdata = fs.readFileSync('../Info/provincias-espanolas.json')
    let provinces = JSON.parse(rawdata)

    const newCountry = await GeoArea.create({
      name: 'España',
      category: 'country'
    })

    let ccaas = new Set()
    provinces.forEach(province => ccaas.add(province.fields.ccaa))

    let testState = []
    ccaas.forEach(ccaa =>
      testState.push({
        name: ccaa,
        category: 'state'
      })
    )
    let newStates = await GeoArea.create(testState)

    await Promise.all(
      newStates.map(newState => GeoArea.findByIdAndUpdate(newCountry._id, { $push: { subareas: newState._id } }))
    )

    let testProvs = provinces.map(prov => {
      return {
        name: prov.fields.provincia,
        category: 'province',
        location: {
          type: 'Point',
          coordinates:
            prov.fields.geo_point_2d && prov.fields.geo_point_2d.length === 2
              ? [prov.fields.geo_point_2d[1], prov.fields.geo_point_2d[0]]
              : null
        }
      }
    })
    let newProvs = await GeoArea.create(testProvs)

    await Promise.all(
      provinces.map(prov => {
        const p = newProvs.find(newProv => newProv.name === prov.fields.provincia)
        return GeoArea.findOneAndUpdate({ name: prov.fields.ccaa }, { $push: { subareas: p._id } })
      })
    )

    const newAdmin = await User.register(
      {
        firstname: `Roger`,
        surname: `Ayra`,
        email: `roger@ironhack.com`,
        role: 'ADMIN'
      },
      '1234'
    )

    const names = [
      ['Armando', 'Márquez'],
      ['Alejandro', 'Bernal'],
      ['Jorge', 'Martínez'],
      ['Humberto', 'Barajas'],
      ['Edgar', 'Herrera'],
      ['Dagoberto', 'Rodríguez'],
      ['Eric', 'Settles'],
      ['Sofía', 'de la Cueva'],
      ['Mariana', 'Gamiño'],
      ['Bryan', 'Mejía']
    ]

    let testUsers = []
    for (let i = 0; i < names.length; i++) {
      testUsers.push({
        firstname: names[i][0],
        surname: names[i][1],
        email: `${names[i][0]}@ironhack.com`,
        role: 'SALESREP'
      })
    }
    const newUsers = await Promise.all(testUsers.map(testUser => User.register(testUser, '1234')))

    const sectors = ['Automóvil', 'Aeronáutica', 'Molde / Matriz', 'Mecanizado General', 'Energía']
    const states = await GeoArea.find({ category: 'state' }).populate('subareas')
    let testCustomers = []
    states.forEach(state => {
      state.subareas.forEach(prov => {
        const sector = sectors[Math.floor(Math.random() * sectors.length)]
        const salesRep = newUsers[Math.floor(Math.random() * newUsers.length)]
        testCustomers.push({
          name: `${prov.name} ${sector}`,
          sector: sector,
          country: newCountry._id,
          state: state._id,
          province: prov._id,
          salesRep: salesRep._id,
          location: prov.location
        })
      })
    })
    const newCustomers = await Customer.create(testCustomers)

    const purposes = ['Visita de cortesía', 'Presentación oferta']
    const customers = await Customer.find({})
    let testVisits = []
    for (let i = 1; i <= 31; i++) {
      let customer = customers[Math.floor(Math.random() * customers.length)]
      testVisits.push({
        start: new Date(2019, 6, i, 9, 30),
        end: new Date(2019, 6, i, 11),
        user: customer.salesRep,
        customer: customer._id,
        purpose: purposes[Math.floor(Math.random() * purposes.length)],
        notes: 'Aerolíneas que contribuyen al cambio climático y se aprovechan de la ola de calor para vender billetes'
      })

      customer = customers[Math.floor(Math.random() * customers.length)]
      testVisits.push({
        start: new Date(2019, 6, i, 15, 30),
        end: new Date(2019, 6, i, 16, 30),
        user: customer.salesRep,
        customer: customer._id,
        purpose: purposes[Math.floor(Math.random() * purposes.length)],
        notes: 'Aerolíneas que contribuyen al cambio climático y se aprovechan de la ola de calor para vender billetes'
      })
    }
    const newVisits = await Visit.create(testVisits)
  } catch (error) {
    console.error(error)
  } finally {
    mongoose.connection.close()
  }
}
