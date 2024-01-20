const User = require('../models/user.js') 
const bcrypt = require('bcrypt') 
const jwt = require('jsonwebtoken') 
const secretKey = process.env.SECRET_KEY;

const authController = {
    signup: async (req, res, next) => {
        try {
            const {firstName, lastName, userName, mobile, email, password, confirmPassword} = req.body

            const findUser = await User.findOne({userName})

            if(findUser) return res.status(400).json({message: "کاربری با این مشخصات قبلا در سامانه ثبت نام کرده است"})
            else if(password !== confirmPassword) return res.status(400).json({message: "رمز عبور و تکرار آن باهم برابر نیستند"})
            else {
    
                const salt = await bcrypt.genSalt(12)
                const hashedPass = await bcrypt.hash(password, salt)
    
                const newUser = new User({
                    firstName,
                    lastName,
                    userName,
                    mobile,
                    email,
                    password: hashedPass,
                })
                await newUser.save()
                return res.status(201).json({newUser})
            }
    
        } catch (error) {
            return res.status(500).json({error: error})            
        }
    },
    
    signin: async (req, res, next) => {
        try {
            const {userName, password} = req.body
            if(!userName || !password) return res.status(400).json({message: "فیلد ها اجباری می باشند"}) 
            const user = await User.findOne({userName})

            if(!user) return res.status(400).json({message: "کاربر یافت نشد"})
            else {
                const isMatch = await bcrypt.compare(password, user.password)
                if(!isMatch) return res.status(400).json({message: "نام کاربری یا کلمه عبور صحیح نمی باشند"})
                else {
                    const payload = {
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        username: user.userName
                    }
                    jwt.sign(payload, secretKey, {expiresIn: "7d"},
                    (err, token) => {
                        res.json({
                            success: true,
                            token: token,
                        });
                    }
)
                }
            }

        } catch (error) {
            return res.status(500).json({error: error})            
        }
    }
}

module.exports = authController