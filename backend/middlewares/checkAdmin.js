const checkAdmin = (req, res, next) => {
  if (req.user.role !== 'ADMIN')
    return res.status(401).json({ msg: `Unauthorized, you don't haver permission to access this resourse` })
  next()
}

module.exports = checkAdmin
