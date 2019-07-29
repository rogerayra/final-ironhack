const User = require('../models/User')

exports.getAllUsers = async (req, res, next) => {
  try {
    let filter = {}
    const { role } = req.query
    if (role) filter = { role }

    const users = await User.find(filter)
    console.log('users', users)
    res.status(200).json({ users })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}

exports.getOneUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)
    res.status(200).json({ user })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}

exports.postOneUser = async (req, res, next) => {
  try {
    const { firstname, surname, email, role, password } = req.body
    const user = User.register({ firstname, surname, email, role }, password)
    res.status(201).json({ user })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}

exports.patchOneUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const { firstname, surname, email, role } = req.body
    const user = await User.findByIdAndUpdate(id, { firstname, surname, email, role }, { new: true })
    res.status(200).json({ user })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}

exports.deleteOneUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const user = await User.findByIdAndDelete(id)
    res.status(200).json({ user, msg: 'User deleted' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}
