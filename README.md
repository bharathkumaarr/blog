# MERN Blog Platform - Fullstack Project

This is a minimal yet fully functional **MERN Blog App** featuring authentication, blog post CRUD, comments, likes, and a mock AI suggestion tool. Built using:

- **MongoDB** + **Express** + **Node.js**
- **React + Redux Toolkit** + **Shadcn/UI**
- JWT Authentication


## Backend Setup (`/server`)

### Dependencies
- express
- mongoose
- cors
- dotenv
- jsonwebtoken
- bcrypt

### Environment Variables (`.env`)
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### Run Backend
```bash
cd server
npm install
node index.js
```


### API Routes Summary

#### Auth
| Endpoint         | Method | Description             |
|------------------|--------|-------------------------|
| /api/auth/register | POST   | Register new user       |
| /api/auth/login    | POST   | Login and return JWT    |

#### Posts
| Endpoint              | Method | Auth Required | Description            |
|------------------------|--------|----------------|------------------------|
| /api/posts             | GET    | NO              | Get all posts          |
| /api/posts/:id         | GET    | NO              | Get single post        |
| /api/posts             | POST   | YES              | Create post            |
| /api/posts/:id         | PUT    | YES              | Update own post        |
| /api/posts/:id         | DELETE | YES              | Delete own post        |
| /api/posts/:id/like    | POST   | YES              | Like/Unlike toggle     |

#### Comments
| Endpoint                  | Method | Auth Required | Description          |
|----------------------------|--------|----------------|----------------------|
| /api/comments/:postId      | POST   | YES              | Add comment to post  |
| /api/comments/:id          | DELETE | YES              | Delete own comment   |

### Authentication
- JWT tokens required in the `Authorization` header: `Bearer <token>`
- Middleware: `/middleware/authMiddleware.js`

---

## Features Completed (Backend)
- [x] User Sign Up / Login
- [x] JWT authentication and protected routes
- [x] Secure password hashing
- [x] Blog CRUD (own only)
- [x] Like / Unlike feature
- [x] Comment / Delete comment
- [x] MongoDB integration
- [x] Clean, readable modular code
