const express = require('express')

const router = express.Router()
const authController = require('./../controller/authController')
const postController = require('./../controller/postControllers')

router.route('/signup').post(authController.signupTheUser)
router.route('/me').get(authController.me)
router.route('/login').post(authController.loginUser)
router.route('/logout').get(authController.logoutUser)
router.route('/all-users').get(authController.getAllusers)
router.route('/add-post').post(postController.createPost)
router.route('/all-post').get(postController.getAllPosts)
router.route('/delete-post').delete(postController.deletePost)
router.route('/update-post').patch(postController.updateUserPost)
router.route('/like-post').post(postController.likeThePost)
router.route('/comment-post').post(postController.addingAComment)
router.route('/bookmark-post').post(postController.bookmarkPost)








module.exports = router