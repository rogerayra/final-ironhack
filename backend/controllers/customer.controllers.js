const Customer = require('../models/Customer')

exports.getAllCustomers = async (req, res, next) => {
  try {
    const customers = await Customer.find({})
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
    res.status(200).json({ customer })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}

exports.postOneCustomer = async (req, res, next) => {
  try {
    const { name, sector, address, salesRep, location } = req.body
    const customer = await Customer.create({ name, sector, address })
    res.status(200).json({ customer })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}

exports.patchOneCustomer = async (req, res, next) => {
  try {
    const { id } = req.params
    const { name, sector, address, salesRep, location } = req.body
    const customer = await Customer.findByIdAndUpdate(id, { name, sector, address }, { new: true })
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
