const express =require('express')
const router = express.Router()
const {signUp,signIn} =require('../controllers/user.controllers')
const { singUpValidation, singInValidation,validation } = require('../middleware/userValidator')
const isAuth = require('../middleware/isAuth')


//sinUp 
router.post('/signup',singUpValidation(),validation, signUp)
//sinUp 

router.post('/signin',singInValidation(),validation,signIn )

// private route
router.get('/current',isAuth,(req,res)=>{
    res.send(req.user)
})









module.exports=router