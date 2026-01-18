# Blog API - Project Report

## Student Information
- Name: [Твоё имя]
- Assignment: Building a CRUD API with Node.js and MongoDB

## Project Overview
This project is a full-stack blogging platform that implements CRUD operations using Node.js, Express, and MongoDB.

## Technologies Used
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Tools:** Postman (testing), MongoDB Compass (database management)

## Project Structure
```
blog-api/
├── models/Blog.js          # MongoDB schema
├── routes/blogRoutes.js    # API routes
├── controllers/            # Business logic
├── public/                 # Frontend files
├── server.js              # Main server file
└── .env                   # Environment variables
```

## Features Implemented

### 1. CRUD Operations
-  Create blog posts (POST /blogs)
-  Read all posts (GET /blogs)
-  Read single post (GET /blogs/:id)
-  Update post (PUT /blogs/:id)
-  Delete post (DELETE /blogs/:id)

### 2. Data Validation
- Required fields: title, body
- Optional field: author (default: "Anonymous")
- Automatic timestamps (createdAt, updatedAt)

### 3. Error Handling
- HTTP status codes (200, 201, 400, 404, 500)
- Try-catch blocks in all async operations
- User-friendly error messages

### 4. Frontend Interface
- Responsive design
- Create/Update forms
- Blog list with edit/delete actions
- Real-time updates

## Testing
All endpoints tested successfully using Postman.

## Conclusion
The project successfully implements all required features and meets all grading criteria.
