const Visit = require('../models/Visit')

exports.getAllVisits = async (req, res, next) => {
  try {
    const { c, u } = req.query
    const visits = await Visit.find({})
    if (c) await Promise.all(visits.map(visit => visit.populate('customer').execPopulate()))
    if (u) await Promise.all(visits.map(visit => visit.populate('user').execPopulate()))
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
    res.status(200).json({ visit })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}

exports.postOneVisit = async (req, res, next) => {
  try {
    const { start, end, user, customer, purpose } = req.body
    const visit = Visit.create({ start, end, user, customer, purpose })
    res.status(201).json({ visit })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}

exports.patchOneVisit = async (req, res, next) => {
  try {
    const { id } = req.params
    const { start, end, user, customer, purpose, status } = req.body
    const visit = await Visit.findByIdAndUpdate(id, { start, end, user, customer, purpose, status }, { new: true })
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
    res.status(200).json({ user, msg: 'Visit deleted' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}
