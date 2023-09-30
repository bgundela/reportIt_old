const express = require('express')
const router = express.Router()
const reportsController = require('../controllers/reportsController')
const verifyJWT = require('../middleware/verifyJWT')


router.route('/reports')
    .post(reportsController.getReports)

router.route('/create')
    .post(reportsController.createNewReport)

module.exports = router