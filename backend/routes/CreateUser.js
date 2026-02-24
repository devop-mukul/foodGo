const express = require('express')
const router = express.Router()
const User = require('../models/User')
// const bcrypt = require('bcryptjs')

const { body, validationResult } = require('express-validator')

router.post('/createuser', [
    body('email', "Invalid Email").isEmail(),
    body('password', "Incorrect Password").isLength({ min: 8 })],
    async (req, res) => {

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        try {
            await User.create({
                name: req.body.name,
                password: req.body.password,
                email: req.body.email,
                location: req.body.location
            })
            res.json({ success: true })
        } catch (err) {
            console.log("Error in creating user: ", err)
            res.json({ success: false })
        }
    })

router.post('/loginuser', [body('email', "Invalid Email").isEmail(),
body('password', "Incorrect Password").isLength({ min: 8 })],
    async (req, res) => {

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        let email = req.body.email;
        try {
            let userdata = await User.findOne({ email })
            if (!userdata) {
                return res.status(400).json({ errors: "Try logging in with correct credentials" })
            }

            if (req.body.password !== userdata.password) {
                return res.status(400).json({ errors: "Try logging in with correct credentials" })
            }

            return res.json({ success: true })

        } catch (err) {
            console.log(err)
        }
    })

module.exports = router