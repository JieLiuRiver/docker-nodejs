const User = require('../models/userModel')
const bcrypt = require('bcryptjs')

exports.signUp = async (req, res, next) => {
    const { username, password } = req.body
    const hashPwd = await bcrypt.hash( password, 12)
    try {
        const newUser = await User.create({
            username,
            password: hashPwd
        });
        req.session.user = newUser;
        return res.status(200).json({
            status: 'success',
            data: {
                user: newUser
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            status: 'fail'
        })
    }
}

exports.login = async (req, res, next) => {
    const { username, password } = req.body 
    try {
        const user = await User.findOne({
            username,
        });
        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'user not found'
            })
        }

        const isCorrect = bcrypt.compareSync(password, user.password)
        if (isCorrect) {
            req.session.user = user;
            return res.status(200).json({
                status: 'success'
            })
        } else {
            return res.status(404).json({
                status: 'fail',
                message: 'incorrect username or password'
            })
        }
    } catch (error) {
        console.log('login error', error)
        return res.status(400).json({
            status: 'fail'
        })
    }
}
