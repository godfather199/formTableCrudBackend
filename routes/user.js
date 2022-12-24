const router = require('express').Router()
const User = require('../models/User')

//register
router.post('/register', async (req, res) => {
    try {
        const newUser = new User(req.body)
        const saveUser = await newUser.save()

        res.status(200).json(saveUser)
    }
    catch (err) {
        console.log(err)
    }
})

//update
router.put('/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body
            },
            {
                new: true
            }
        )

        res.status(200).json(updatedUser)
    }
    catch (err) {
        res.status(500).json(err)
    }
})

//delete
router.delete('/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json('User has been deleted')
    }
    catch (err) {
        res.status(500).json(err)
    }
})

//get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find()

        res.status(200).json(users)
    }
    catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router