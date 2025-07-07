const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const User = require('../models/User')

const router = express.Router()

router.post('/register', async (req,res)=>{
    const {username, email, password} = req.body;
    try {
        const user = new User({username, email, password});
        await user.save()

        res.status(201).json({message: 'User created'})
    } catch (err) {
        res.status(400).json({error: err.message})
    }
});

router.post('/login', async (req,res)=>{
    const {email, password} = req.body;
    try{

        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({error: 'invalid credentials'})
        }
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        res.json({token, user: {id: user._id, username: user.username}});

    } catch (err) {
        res.status(500).json({error: err.message})
    }


})


module.exports = router;