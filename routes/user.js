const express = require('express')
const router = express.Router()

const UserController = require('../controllers/UserController')

router.get('/show', UserController.show)
router.post('/add', UserController.addUser)
router.post('/update', UserController.updateUser)
router.post('/delete', UserController.deleteUser)

module.exports = router