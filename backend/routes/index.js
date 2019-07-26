const router = require('express').Router()

/* GET home page */
router.get('/', (req, res, next) => {
  try {
    res.send('Hola')
  } catch (err) {
    console.log(err)
    res.status(500).json({ err })
  }
})

module.exports = router
