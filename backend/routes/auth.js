const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt'); // Hash password


//REGISTER
router.post('/register', async(req, res) => {
    try {

        const salt = await bcrypt.genSalt(10);  // GenSalt method from bcrypt
        const hashedPass = await bcrypt.hash(req.body.password, salt); // Using hash method for password
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass
        })
        const user = await newUser.save()
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
})


//LOGIN
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username}) // We finde one user 
        !user && res.status(400).json('Wrong Credentials'); // Om allt är okej eller om vi hittades den user från register då kan vi logga in

        const validated = await bcrypt.compare(req.body.password, user.password) // Ve gemförar lösenordet med bcrypt lösenord
        !validated && res.status(400).json('Wrong Credentials'); // Om lösenordet är samma med bcrypt lösenord då kan user logga in 
        

        const {password, ...others} = user._doc;  // göm lösenordet 
        res.status(200).json(others); 

    } catch (error) {
        res.status(500).json(error)
    }
})



module.exports = router;