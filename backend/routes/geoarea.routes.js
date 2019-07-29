const router = require('express').Router()
const { getAllStates } = require('../controllers/geoarea.controllers')

router.get('/', getAllStates)

module.exports = router
