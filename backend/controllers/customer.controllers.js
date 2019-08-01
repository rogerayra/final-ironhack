const Customer = require('../models/Customer')

exports.getAllCustomers = async (req, res, next) => {
  try {
    const { _id } = req.user
    const filter = {}
    if (req.user.role === 'SALESREP') filter.salesRep = _id

    const customers = await Customer.find(filter)
      .populate('salesRep')
      .populate('country')
      .populate('state')
      .populate('province')

    res.status(200).json({ customers })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}

exports.getOneCustomer = async (req, res, next) => {
  try {
    const { id } = req.params

    const customer = await Customer.findById(id)
      .populate('salesRep')
      .populate('country')
      .populate('state')
      .populate('province')

    res.status(200).json({ customer })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}

exports.postOneCustomer = async (req, res, next) => {
  try {
    const { name, sector, address, salesRep, country, state, province, location } = req.body

    const customer = await Customer.create({ name, sector, address, salesRep, country, state, province })
    await customer.populate('salesRep').execPopulate()
    await customer.populate('country').execPopulate()
    await customer.populate('state').execPopulate()
    await customer.populate('province').execPopulate()

    res.status(200).json({ customer })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}

exports.patchOneCustomer = async (req, res, next) => {
  try {
    const { id } = req.params
    const { name, sector, address, salesRep, country, state, province, location } = req.body
    let update = {}

    if (name) update.name = name
    if (sector) update.sector = sector
    if (address) update.address = address
    if (salesRep) update.salesRep = salesRep
    if (country) update.country = country
    if (state) update.state = state
    if (province) update.province = province

    const customer = await Customer.findByIdAndUpdate(id, update, { new: true })
    await customer.populate('salesRep').execPopulate()
    await customer.populate('country').execPopulate()
    await customer.populate('state').execPopulate()
    await customer.populate('province').execPopulate()

    res.status(200).json({ customer })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}

exports.deleteOneCustomer = async (req, res, next) => {
  try {
    const { id } = req.params

    const customer = await Customer.findByIdAndDelete(id)

    res.status(200).json({ customer, msg: 'Customer deleted' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}
