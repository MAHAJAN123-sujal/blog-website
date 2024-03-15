const express = require('express');
const { getAllBlogs, createBlogController, updateBlogController, deleteBlogController, getSingleBlogController, getUserBlogController } = require('../controllers/blogController');

const router = express.Router();

// routes
/// for getting all blogs
router.get('/all-blogs',getAllBlogs);

// for creating blog
router.post('/create-blog',createBlogController);

// for updating blog
router.put('/update-blog/:id',updateBlogController);

//for deleting the blog
router.delete('/delete-blog/:id',deleteBlogController);

// for getting a single blog
router.get('/single-blog/:id',getSingleBlogController);

// for getting user blogs
router.get('/user-blog/:id',getUserBlogController);

module.exports = router;
