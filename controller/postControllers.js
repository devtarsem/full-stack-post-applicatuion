const post = require('./../model/postModel')
const jwt = require('jsonwebtoken')
const { promisify } = require('util')
const signup = require('./../model/signupModel')
const postActivity = require('./../model/activityModel')
const bookmark = require('./../model/bookmarkModel')
const error = require('./../util/errorHandle')

// finding user from cokies
const user = async(token)=>{
    const tokenUser = token
    const verficationID = await promisify(jwt.verify)(tokenUser, process.env.STRING)
    const userFind = await signup.findById(verficationID.id)
    return userFind
}

exports.createPost = async(req, res, next)=>{
    const {title,description,tagged} = req.body;
    error.scopeOfError('res', (title===undefined || description===undefined || tagged===undefined), "please fill valid credentials", 404)
    
    const identifierNUM = Math.trunc(Math.random()*1000000000000000000)
    const userFind = await user(req.cookies.signin)
    error.scopeOfError(res,!userFind, "you are not authorized please login or signed up first", 404)
    
    const createpost = await post.create({user : userFind.id,title,description,tagged, username : userFind.username, identifier : identifierNUM})
    res.status(200).json({
        status : "ok",
        data : {
            post : createpost
        }
    })
    next()
}

exports.getAllPosts = async (req, res, next)=>{
    let query = {...req.query}
    const removedVariables = ['sort', 'fields', 'limit', 'page']
    removedVariables.forEach(e=> delete query[e])
    console.log(query)
    let postquery = post.find(query).populate('user')

    if(req.query.sort){
        console.log(req.query.sort)
        postquery = postquery.sort(req.query.sort.split(',').join(' '))
    }
    else{
        postquery = postquery.sort('-likes')
    }

    const allPosts = await postquery

    res.status(200).json({
        status : "ok",
        data : {
            post : allPosts
        }
    })
    next()
}


exports.deletePost = async (req, res, next)=>{
    const {id} = req.body
    // const userPost = await user(req.cookies.signin)
    // error.scopeOfError(res,!userPost, "you are not authorized please login or signed up first", 404)

    // const postDEL = await post.find({user : userPost._id,id})
    const deletingPOST = await post.findByIdAndDelete(id)
    const bookDEL = await bookmark.find({postid : id})
    const deletingBookmark = await bookmark.findByIdAndDelete(bookDEL[0]._id)
    
    res.status(200).json({
        status : "ok",
        data : {
            post : "your post is deleted sucessfully"
        }
    })
    next()
}

exports.updateUserPost = async (req, res, next)=>{
    const {id,title,description} = req.body
    error.scopeOfError(res, ( id===undefined), "please provide valid credentials", 404)
    const userPost = await user(req.cookies.signin)
    error.scopeOfError(res,!userPost, "you are not authorized please login or signed up first", 404)

    const postDEL = await post.find({user : userPost._id,id})
    const titleUPDATE = title || postDEL.title
    const desUPDATE = description || postDEL.description

    const updatingPost = await post.findByIdAndUpdate(id, {title : titleUPDATE, description : desUPDATE})
    res.status(200).json({
        status : "ok",
        data : {
            post : "your post is updated sucessfully",
            updatedPost : updatingPost
        }
    })
    next()
}

exports.likeThePost = async(req, res, next)=>{
    const {id} = req.body;

    const userFinded = await user(req.cookies.signin)
    error.scopeOfError(res,!userFinded, "you are not authorized please login or signed up first", 404)

    let postCommented = await post.findById(id)
    
    
    if((await postActivity.find({user : userFinded._id})).length!=0){
        let commentedPost = await postActivity.find({user : userFinded._id})
        if(commentedPost[0]?.like === true){
            commentedPost[0].like = false
            postCommented.likes = postCommented.likes - 1
            await postCommented.save()
        }
        else{
            commentedPost[0].like = true
            postCommented.likes = postCommented.likes + 1
            await postCommented.save()
        }
        await commentedPost[0].save()
    }
    else{
        const commentedPost = await postActivity.create({user : userFinded._id, like : true, postid : postCommented._id})
        postCommented.likes = postCommented.likes + 1
        await postCommented.save()
    }
    
    res.status(200).json({
        status : "ok",
        data : {
            like : "your activated is recorded"
        }
    })
    next()
}



exports.addingAComment = async (req, res, next)=>{
    const {comment,id} = req.body;
    error.scopeOfError(res, comment===undefined, "please enter valid comment", 404)
    const userFinded = await user(req.cookies.signin)
    error.scopeOfError(res,!userFinded, "you are not authorized please login or signed up first", 404)

    const postCommented = await post.findById(id)

    if((await postActivity.find({user : userFinded._id})).length!=0){
        let commentedPost = await postActivity.find({user : userFinded._id})
        commentedPost[0].comment = comment
        await commentedPost[0].save()
        postCommented.comments.push([userFinded.username,comment])
        await postCommented.save()
        
    }
    else{
        const postCommentAddition = await postActivity.create({user : userFinded._id,comment,postId : postCommented._id})
        postCommented.comments.push([userFinded.username,comment])
        await postCommented.save()
    }
    res.status(200).json({
        status : "ok",
        data : {
            comment : 'done'
        }
    })
    next()
}


exports.bookmarkPost = async (req, res, next)=>{
    const {id} = req.body;
    const userFinded = await user(req.cookies.signin)
    error.scopeOfError(res,!userFinded, "you are not authorized please login or signed up first", 404)

    const postCommented = await post.findById(id)
    let bookmarkpost;
    if(  (await bookmark.find({user : userFinded._id, postid : postCommented._id})).length===0  ){
        bookmarkpost = await bookmark.create({user : userFinded._id, postid : postCommented._id})
    }
    else {
        console.log("already bookmarked")
    }

    const sendingBookMark = await bookmark.find({user : userFinded._id, postid : postCommented._id}).populate('user').populate('postid')

    res.status(200).json({
        status : "ok",
        data : {
            bookmark_post : sendingBookMark
        }
    })
    next()
}