const express = require('express')
const router = express.Router()
const usersController = require('../controllers/usersController')
const verifyJWT = require('../middleware/verifyJWT')

// router.use(verifyJWT)

router.route('/register')
    .post(usersController.createNewUser)

router.route('/city')
    .post(usersController.getUserCity)

module.exports = router