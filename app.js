const express = require("express");
const app = express();
const path = require('path')
const jwt = require('jsonwebtoken')
const { promisify } = require('util')
const signup = require('./model/signupModel')
const posts = require('./model/postModel')
const bookmark = require('./model/bookmarkModel')
const activity = require('./model/activityModel')
app.use(express.json());
const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cors = require("cors");
app.use(cors());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'view'));
app.use(express.static(path.join(__dirname, 'public')));

/*const { createProxyMiddleware } = require("http-proxy-middleware");
app.use(
  "/api",
  createProxyMiddleware({
    target: "http://localhost:3000/", //original url
    changeOrigin: true,
    //secure: false,
    onProxyRes: function (proxyRes, req, res) {
      proxyRes.headers["Access-Control-Allow-Origin"] = "*";
    },
    CORS_ALLOW_CREDENTIALS: true,
    CORS_ORIGIN_WHITELIST: ("http://localhost:3000/", "http://127.0.0.1:3000/"),
  })
);*/

/** routes */
const authRoutes = require("./routes/authRoute");
app.use("/api/v1/", authRoutes);


/**finding user */
const user = async(token)=>{
  const tokenUser = token
  if(!tokenUser){
    return
  }
  const verficationID = await promisify(jwt.verify)(tokenUser, process.env.STRING)
  const userFind = await signup.findById(verficationID.id)
  return userFind
}
/**rendering pages */
app.use('/', async(req, res)=>{
  
  const userFind = await user(req.cookies.signin)
  const post = await posts.find()
  const book = await bookmark.find({user : userFind._id}).populate('user').populate('postid')
  const comment = await activity.find({user : userFind._id}).populate('user')
  const userPost = await posts.find({user : userFind._id})
  res.status(200).render('index', {
    user : userFind,
    postAll : post,
    bookmarks : book,
    comment : comment,
    userPost : userPost
  })
})

module.exports = app;
