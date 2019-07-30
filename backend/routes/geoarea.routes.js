const router = require('express').Router()
const { getAllCountries, getAllStates, getAllProvinces } = require('../controllers/geoarea.controllers')

router.get('/country', getAllCountries)
router.get('/state', getAllStates)
router.get('/province', getAllProvinces)

module.exports = router
