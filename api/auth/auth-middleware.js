const User = require('../users/users-model')

async function checkUsernameFree(req, res, next) {
    try {
        const users = await User.findBy({ username: req.body.username })
    if (!users.length) {
      next()
    }
    else next({ status: 422, message: "username taken"})
    } catch (err) {
        next(err)
    }
}

function checkUsernameAndPassword(req, res, next) {
    if (!req.body.username || !req.body.password) {
        next({ status: 422, message: 'username and password required' })
    } else {
        next()
    }
} 

async function checkUsernameExists(req, res, next) {
    try {
        const [user] = await User.findBy({ username: req.body.username })
        if (!user) {
            next({ status: 401, message: 'invalid credentials' })
        } else {
            req.user = user
            next()
        }
    } catch (err) {
        next(err)
    }
}

module.exports = {
    checkUsernameFree,
    checkUsernameAndPassword,
    checkUsernameExists,
}