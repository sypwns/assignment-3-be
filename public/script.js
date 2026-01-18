const API_URL = 'http://localhost:5000/blogs';

// DOM Elements
const blogForm = document.getElementById('blog-form');
const blogIdInput = document.getElementById('blog-id');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const bodyInput = document.getElementById('body');
const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-btn');
const formTitle = document.getElementById('form-title');
const blogsContainer = document.getElementById('blogs-container');

// Load all blogs on page load
document.addEventListener('DOMContentLoaded', loadBlogs);

// Form submit event
blogForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const blogId = blogIdInput.value;
    const blogData = {
        title: titleInput.value.trim(),
        body: bodyInput.value.trim(),
        author: authorInput.value.trim() || 'Anonymous'
    };

    if (blogId) {
        await updateBlog(blogId, blogData);
    } else {
        await createBlog(blogData);
    }
});

// Cancel button event
cancelBtn.addEventListener('click', resetForm);

// Create a new blog
async function createBlog(blogData) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(blogData)
        });

        const result = await response.json();

        if (result.success) {
            alert('Blog created successfully!');
            resetForm();
            loadBlogs();
        } else {
            alert('Error: ' + result.message);
        }
    } catch (error) {
        console.error('Error creating blog:', error);
        alert('Failed to create blog. Please try again.');
    }
}

// Load all blogs
async function loadBlogs() {
    try {
        blogsContainer.innerHTML = '<p class="loading">Loading blogs...</p>';
        
        const response = await fetch(API_URL);
        const result = await response.json();

        if (result.success && result.data.length > 0) {
            displayBlogs(result.data);
        } else {
            blogsContainer.innerHTML = '<p class="no-blogs">No blog posts yet. Create your first post!</p>';
        }
    } catch (error) {
        console.error('Error loading blogs:', error);
        blogsContainer.innerHTML = '<p class="no-blogs">Error loading blogs. Please refresh the page.</p>';
    }
}

// Display blogs in the UI
function displayBlogs(blogs) {
    blogsContainer.innerHTML = blogs.map(blog => `
        <div class="blog-card">
            <h3>${escapeHtml(blog.title)}</h3>
            <div class="blog-meta">
                <span>👤 ${escapeHtml(blog.author)}</span>
                <span>📅 ${new Date(blog.createdAt).toLocaleDateString()}</span>
            </div>
            <p class="blog-body">${escapeHtml(blog.body)}</p>
            <div class="blog-actions">
                <button class="btn btn-edit" onclick="editBlog('${blog._id}')">Edit</button>
                <button class="btn btn-delete" onclick="deleteBlog('${blog._id}')">Delete</button>
            </div>
        </div>
    `).join('');
}

// Edit a blog
async function editBlog(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        const result = await response.json();

        if (result.success) {
            const blog = result.data;
            blogIdInput.value = blog._id;
            titleInput.value = blog.title;
            authorInput.value = blog.author;
            bodyInput.value = blog.body;
            
            formTitle.textContent = 'Update Blog Post';
            submitBtn.textContent = 'Update Post';
            cancelBtn.style.display = 'inline-block';
            
            // Scroll to form
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    } catch (error) {
        console.error('Error loading blog:', error);
        alert('Failed to load blog for editing.');
    }
}

// Update a blog
async function updateBlog(id, blogData) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(blogData)
        });

        const result = await response.json();

        if (result.success) {
            alert('Blog updated successfully!');
            resetForm();
            loadBlogs();
        } else {
            alert('Error: ' + result.message);
        }
    } catch (error) {
        console.error('Error updating blog:', error);
        alert('Failed to update blog. Please try again.');
    }
}

// Delete a blog
async function deleteBlog(id) {
    if (!confirm('Are you sure you want to delete this blog post?')) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        const result = await response.json();

        if (result.success) {
            alert('Blog deleted successfully!');
            loadBlogs();
        } else {
            alert('Error: ' + result.message);
        }
    } catch (error) {
        console.error('Error deleting blog:', error);
        alert('Failed to delete blog. Please try again.');
    }
}

// Reset form
function resetForm() {
    blogForm.reset();
    blogIdInput.value = '';
    formTitle.textContent = 'Create New Blog Post';
    submitBtn.textContent = 'Create Post';
    cancelBtn.style.display = 'none';
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}