const User = require('../models/User')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

const createNewUser = asyncHandler(async (req, res) => {
    const { username, password, city } = req.body
    console.log(username)
    console.log(password)
    console.log(city)
    const duplicate = await User.findOne({ username }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Please login with your account.' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const userObject = { username, 'password': hashedPassword, city }

    const user = await User.create(userObject)

    if (user) { //created 
        res.status(201).json({ message: `New user ${username} created.` })
    } else {
        res.status(400).json({ message: 'Invalid user data received.' })
    }
})

const getUserCity = asyncHandler(async (req, res) => {
    const { username } = req.body

    const user = await User.findOne({ username }).lean().exec()

    if (!user) {
        return res.status(400).json({ message: 'Invalid user data received.' })
    }


    const city = user.city

    return res.json(city)
})

module.exports = {
    createNewUser,
    getUserCity
}