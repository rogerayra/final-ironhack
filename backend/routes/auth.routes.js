const router = require('express').Router()
const passport = require('../config/Passport')
const { login, logout } = require('../controllers/auth.controllers')

router.post('/login', passport.authenticate('local'), login)
router.get('/logout', logout)

module.exports = router
