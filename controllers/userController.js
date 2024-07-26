const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id:_id}, process.env.SECERT, {expiresIn:'1d'})
}

// login a user
const loginUser = async (req, res) => {
    const {email, password} = req.body
    console.log(req.body);
    try {
        const user = await User.login(email, password)

    // create token
    const token = createToken(user._id)

    res.status(200).json({email, token})    
    } catch (error) {
        res.status(400).json({error: error.message})      
    }


//   res.json({mssg: 'login user'})
}

// signup a user
const signupUser = async (req, res) => {
 
  const {firstname,lastname, email, password} = req.body

  try {
    const user = await User.signup(firstname,lastname, email, password)

    // create token
    const token = createToken(user._id)

    res.status(200).json({firstname,lastname, email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

module.exports = { signupUser, loginUser }