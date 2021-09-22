const router = require('express').Router();
const User = require('../models/User');
const Post = require('../models/Post');
const bcrypt = require('bcrypt');

// UPDATE
router.put('/:id', async (req, res) => {
    if(req.body.userId === req.params.id){

        if(req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);  //UPDATE PASSWORD
        }

        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {  
                $set: req.body  //UPDATE USER USING findByIdAndUpdate 
            }, 

            {new: true})
            res.status(200).json(updatedUser)

        } catch (error) {
            res.status(500).json(error)
        }
    }else {
        res.status(401).json('You can update only your account !')
    }
})


//DELETE
router.delete('/:id', async (req, res) => {
    if(req.body.userId === req.params.id){   // Vi hittar userId 
        try {
            const user = await User.findById(req.params.id); // Vi gör två TryCatch för att hitta users info och posts

            try {
                await Post.deleteMany({username: user.username}); // vi tabort även users posts
                await User.findByIdAndDelete(req.params.id); // Vi tabort user
                res.status(200).json('User has been Deleted...')
    
            } catch (error) {
                res.status(500).json(error)
            }
            
        } catch (error) {
            res.status(404).json('User not found!');
        }
        
    }else {
        res.status(401).json('You can delete only your account !')
    }
});


// GET USER 
router.get('/:id', async(req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const {password, ...others} = user._doc;
        res.status(200).json(others)
        
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;