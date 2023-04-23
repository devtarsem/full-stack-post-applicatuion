const signup = require('./../model/signupModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const error = require('./../util/errorHandle')
const nodemailer = require('nodemailer')

const { promisify } = require('util')

// implimenting the token genetration function
const tokens = async (id)=>{
    return await jwt.sign({id : id}, process.env.STRING)
}

// finding user from cokies
const user = async(token)=>{
    const tokenUser = token
    const verficationID = await promisify(jwt.verify)(tokenUser, process.env.STRING)
    const userFind = await signup.findById(verficationID.id)
    return userFind
}


exports.signupTheUser = async (req, res, next)=>{
    const {username, email, password} = req.body;
    error.scopeOfError(res,username===undefined || email===undefined || password===undefined,"please enter valid credentials", 404)

    // encrypting the password  
    let passwordNew = await bcrypt.hash(password, 12)
    const createUser = await signup.create({username, email, password : passwordNew})

    // sending user to cookies
    const token = await tokens(createUser?._id)
    console.log(token)
    error.scopeOfError(res, !token, "your user account does not found, please login or signup again", 404)
    res.cookie('signin', token, {httpOnly : true})
    const coo = req.cookies

    res.status(200).json({
        status : "ok",
        token : token,
        data : {
            user : createUser
        }
    })
    next()
}

exports.loginUser = async (req, res, next)=>{
    const {email, password} = req.body
    // finding the user with email
    const findUSer = await signup.find({email : email})
    error.scopeOfError(res, findUSer.length===0, "please enter valid emial or password", 404)

    // checking the password
    const passwordCheck = await bcrypt.compare(password,findUSer[0]?.password)
    error.scopeOfError(res, !passwordCheck, "please enter valid emial or password", 404)

    // assigning the token to the user
    const token = await tokens(findUSer[0]?._id)
    error.scopeOfError(res, !token, "your user account does not found, please login or signup again", 404)
    res.cookie('signin', token, {})

    // checking user logout staus and correcting it
    if(findUSer[0].logout){
        findUSer[0].logout = false
        await findUSer[0].save()
    }

    res.status(200).json({
        status : "ok",
        token : token,
        data : {
            user : findUSer
        }
    })
    next()
}

exports.logoutUser = async (req, res, next)=>{
    const userFinded = await user(req.cookies.signin)
    userFinded.logout = true
    await userFinded.save()

    res.status(200).json({
        status : "ok",
        data : {
            user : userFinded
        }
    })
    next()
}

exports.getAllusers = async (req, res, next)=>{
    const users = await signup.find()
    res.status(200).json({
        status : "ok",
        data : {
            user : users
        }
    })
    next()
}

exports.me = async(req,res, next)=>{
    const userfinded = await user(req.cookies.signin)
    console.log(userfinded)
    res.status(200).json({
        status : "ok",
        data : {
            user : userfinded
        }
    })
    next()
}