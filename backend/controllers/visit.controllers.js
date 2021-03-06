const Visit = require('../models/Visit')

exports.getAllVisits = async (req, res, next) => {
  try {
    const filter = {}
    if (req.user.role === 'SALESREP') filter.user = req.user._id

    const visits = await Visit.find(filter)
      .populate('customer')
      .populate('user')

    res.status(200).json({ visits })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}

exports.getOneVisit = async (req, res, next) => {
  try {
    const { id } = req.params

    const visit = await Visit.findById(id)
      .populate('customer')
      .populate('user')

    res.status(200).json({ visit })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}

exports.postOneVisit = async (req, res, next) => {
  try {
    const { start, end, user, customer, purpose, notes } = req.body

    const visit = await Visit.create({ start, end, user, customer, purpose, notes })
    await visit.populate('customer').execPopulate()
    await visit.populate('user').execPopulate()

    res.status(201).json({ visit })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}

exports.patchOneVisit = async (req, res, next) => {
  try {
    let update = {}
    const { id } = req.params
    const { start, end, user, customer, purpose, notes } = req.body
    if (start) update.start = start
    if (end) update.end = end
    if (user) update.user = user
    if (customer) update.customer = customer
    if (purpose) update.purpose = purpose
    if (notes) update.notes = notes

    const visit = await Visit.findByIdAndUpdate(id, update, { new: true })
    await visit.populate('customer').execPopulate()
    await visit.populate('user').execPopulate()

    res.status(200).json({ visit })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}

exports.deleteOneVisit = async (req, res, next) => {
  try {
    const { id } = req.params

    const visit = await Visit.findByIdAndDelete(id)

    res.status(200).json({ visit, msg: 'Visit deleted' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}
