const mongoose = require('mongoose')

const signupSchmea = mongoose.Schema({
    username : {
        type : String,
        trim : true
    }
    ,
    email : {
        type : String,
        trim : true
    }
    ,
    password : {
        type : String,
        trim : true
    }
    ,
    logout : {
        type : Boolean,
        default : false
    }
})

const signup = new mongoose.model('signup', signupSchmea)

module.exports = signup