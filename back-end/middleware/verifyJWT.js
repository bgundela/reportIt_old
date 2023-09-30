const jwt = require('jsonwebtoken')


const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization
    const token = authHeader && authHeader.split(' ')[1]

    if (token === null) return res.status(401).json({ message: 'Unauthorized' })

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Forbidden' })
        req.user = user
        req.city = citynext()
    })
}






// const verifyJWT = (req, res, next) => {
//     const authHeader = req.headers.authorization || req.headers.Authorization

//     if (!authHeader?.startsWith('Bearer ')) {
//         return res.status(401).json({ message: 'Unauthorized' })
//     }

//     const token = authHeader.split(' ')[1]

//     jwt.verify(
//         token,
//         process.env.ACCESS_TOKEN_SECRET,
//         (err, decoded) => {
//             if (err) return res.status(403).json({ message: 'Forbidden' })
//             req.user = decoded.UserInfo.username
//             req.roles = decoded.UserInfo.roles
//             next()
//         }
//     )
// }

module.exports = verifyJWT 