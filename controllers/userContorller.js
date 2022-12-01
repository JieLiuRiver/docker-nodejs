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
        res.status(200).json({
            staus: 'success',
            data: {
                user: newUser
            }
        })
    } catch (error) {
        res.status(400).json({
            staus: 'fail'
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
            res.status(404).json({
                staus: 'fail',
                message: 'user not found'
            })
        }

        const isCorrect = bcrypt.compareSync(password, user.password)
        if (isCorrect) {
            res.status(200).json({
                staus: 'success',
                data: {
                    user: newUser
                }
            })
        } else {
            res.status(404).json({
                staus: 'fail',
                message: 'incorrect username or password'
            })
        }
    } catch (error) {
        res.status(400).json({
            staus: 'fail'
        })
    }
}
