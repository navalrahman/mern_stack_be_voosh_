const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required: true
    },
    lastname:{
        type:String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.statics.signup = async function(firstname, lastname, email, password){
        console.log('eee',email);
    // validation
    if(!email || !password || !firstname || !lastname){
        throw Error('All fields must be filled')
    }

    if(!firstname){
        throw Error('Firstname is required')
    }
    if(!lastname){
        throw Error('lastname is required')
    }

    if(!validator.isEmail(email)){
        throw Error('Email is not valid')
    }

    
    if(!validator.isStrongPassword(password)){
        throw Error('Password not strong enough')
    }

    const exist = await this.findOne({email})

    if(exist){
        throw Error('Already included')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ firstname, lastname, email, password: hash})

    return user
}

userSchema.statics.login = async function(email, password) {
    // validation
    if(!email || !password){
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({ email })
  
    if (!user) {
      throw Error('Incorrect Email')
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match){
        throw Error('Incorrect Password')
    }

    return user
  
} 

// module.exports = mongoose.model('User', userSchema)
const userModel = mongoose.model('users', userSchema)
module.exports = userModel