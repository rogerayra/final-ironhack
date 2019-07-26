const router = require('express').Router()
const {
  getAllCustomers,
  getOneCustomer,
  postOneCustomer,
  patchOneCustomer,
  deleteOneCustomer
} = require('../controllers/customer.controllers')

router.get('/', getAllCustomers)
router.get('/:id', getOneCustomer)
router.post('/', postOneCustomer)
router.patch('/:id', patchOneCustomer)
router.delete('/:id', deleteOneCustomer)

module.exports = router
