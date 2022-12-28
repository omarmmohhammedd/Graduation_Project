const jwt = require('jsonwebtoken')
const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1]
    if (token) {
      jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
        if (err) res.status(401).json({ 'message': 'UnAuthMessage' })
        else {
          if (allowedRoles.includes(decoded.roles)) next()
          else res.status(401).json({ 'message': `User Did not have Permissions To see This Page User Role is ${decoded.roles}` })
        }
      })
    } else res.status(401).json({ 'message': 'UnAuth' })
  }
}
module.exports = verifyRoles;
