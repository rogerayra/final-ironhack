const router = require('express').Router()
const {
  getAllVisits,
  getOneVisit,
  postOneVisit,
  patchOneVisit,
  deleteOneVisit
} = require('../controllers/visit.controllers')

router.get('/', getAllVisits)
router.get('/:id', getOneVisit)
router.post('/', postOneVisit)
router.patch('/:id', patchOneVisit)
router.delete('/:id', deleteOneVisit)

module.exports = router
