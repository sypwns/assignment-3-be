const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

// POST /blogs - Create a new blog post
router.post('/', blogController.createBlog);

// GET /blogs - Get all blog posts
router.get('/', blogController.getAllBlogs);

// GET /blogs/:id - Get a single blog post by ID
router.get('/:id', blogController.getBlogById);

// PUT /blogs/:id - Update a blog post by ID
router.put('/:id', blogController.updateBlog);

// DELETE /blogs/:id - Delete a blog post by ID
router.delete('/:id', blogController.deleteBlog);

module.exports = router;