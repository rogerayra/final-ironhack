const User = require('../models/User')

exports.getAllUsers = async (req, res, next) => {
  try {
    let filter = {}
    const { role } = req.query
    if (role) filter = { role }

    const users = await User.find(filter)

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

    const user = await User.register({ firstname, surname, email, role }, password)

    res.status(201).json({ user })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}

exports.patchOneUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const { firstname, surname, email, role, password } = req.body
    let update = {}

    if (firstname) update.firstname = firstname
    if (surname) update.surname = surname
    if (email) update.email = email
    if (role) update.role = role

    const user = await User.findByIdAndUpdate(id, update, { new: true })
    if (password) {
      await user.setPassword(password)
      await user.save()
    }

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
