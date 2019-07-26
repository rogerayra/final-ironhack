const router = require('express').Router()
const { getAllUsers, getOneUser, postOneUser, patchOneUser, deleteOneUser } = require('../controllers/user.controllers')

router.get('/', getAllUsers)
router.get('/:id', getOneUser)
router.post('/', postOneUser)
router.patch('/:id', patchOneUser)
router.delete('/:id', deleteOneUser)

module.exports = router
