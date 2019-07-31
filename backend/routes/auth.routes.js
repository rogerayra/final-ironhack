const router = require('express').Router()
const passport = require('../config/Passport')
const { verifyToken } = require('../config/jwt')
const { login, logout } = require('../controllers/auth.controllers')

router.post('/login', passport.authenticate('local'), login)
router.get('/logout', verifyToken, logout)

module.exports = router
