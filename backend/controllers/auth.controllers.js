const User = require('../models/User')
const { createToken } = require('../config/jwt')

exports.login = (req, res, next) => {
  try {
    const { user } = req
    console.log('user', user)
    const [header, payload, signature] = createToken(user)
    res.cookie('headload', `${header}.${payload}.`, {
      // maxAge: 1000 * 60 * 30,
      // secure: true
    })
    res.cookie('signature', signature, {
      // httpOnly: true,
      // secure: true
    })
    res.status(200).json({ user })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}

exports.logout = (req, res, next) => {
  try {
    res.clearCookie('headload')
    res.clearCookie('signature')
    res.status(200).json({ msg: 'Logged out' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}
