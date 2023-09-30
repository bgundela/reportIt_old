const Report = require('../models/Report')
const asyncHandler = require('express-async-handler')

const getReports = asyncHandler(async (req, res) => {
    const { city } = req.body

    const reports = await Report.find().lean().exec()

    const cityReports = reports.filter(report => (report.city === city))
    res.json(cityReports)

})

const createNewReport = asyncHandler(async (req, res) => {
    const { city, title, explanation, email, picture } = req.body


    const reportObject = { title, explanation, city, email, picture }




    const report = await Report.create(reportObject)

    if (report) { //created 
        res.status(201).json({ message: `New report ${title} created.` })
    } else {
        res.status(400).json({ message: 'Invalid report data received.' })
    }

})

module.exports = {
    getReports,
    createNewReport
}