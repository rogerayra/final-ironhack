require('dotenv').config()
const jwt = require('jsonwebtoken')
const User = require('../models/User')

exports.createToken = user => {
  return jwt
    .sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role
      },
      process.env.SECRET,
      {
        expiresIn: '24h'
      }
    )
    .split('.')
}

exports.verifyToken = (req, res, next) => {
  const { headload, signature } = req.cookies

  if (!headload || !signature) res.status(401).json({ msg: 'Unauthorized, missing token' })

  jwt.verify(headload + signature, process.env.SECRET, (err, decoded) => {
    if (err) res.status(401).json({ msg: 'Unauthorized, missing token' })
    User.findById(decoded.userId)
      .then(user => {
        req.user = user
        next()
      })
      .catch(err => {
        return res.status(401).json({ err })
      })
  })
}
