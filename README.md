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


## Features Completed (Backend)
- [x] User Sign Up / Login
- [x] JWT authentication and protected routes
- [x] Secure password hashing
- [x] Blog CRUD (own only)
- [x] Like / Unlike feature
- [x] Comment / Delete comment
- [x] MongoDB integration
- [x] Clean, readable modular code


## Frontend Setup (`/client`)

### Dependencies

- **React** and **React DOM**
- **React Router DOM** for routing
- **Redux Toolkit** & **React Redux** for state management
- **Shadcn/UI** for modern UI components
- **Tailwind CSS**, `clsx`, `postcss`, `autoprefixer`
- **Vite** for fast dev server and builds

---

### Running the Frontend

```bash
cd client
npm install
npm run dev
```

This will start the development server at [http://localhost:5173](http://localhost:5173).


### Authentication Handling

- Authentication state is managed using Redux (`authSlice.js`)
- JWT token and user info are persisted in `localStorage`
- All protected requests use the `Authorization: Bearer <token>` header

### Routes Overview

| Route         | Protected | Description                            |
|--------------|-----------|----------------------------------------|
| `/register`  | NO         | User registration                      |
| `/login`     | NO         | User login                             |
| `/posts`     | NO         | List all blog posts                    |
| `/post/:id`  | NO         | Post detail view with comments         |
| `/create`    | YES         | Create a new post                      |
| `/edit/:id`  | YES         | Edit your own post                     |

## ✅ Frontend Features

- [x] User registration and login
- [x] Store and persist auth state using Redux
- [x] Create, edit, and delete own blog posts
- [x] Like/unlike functionality per user
- [x] Add comments to posts
- [x] Delete own comments
- [x] Conditionally render Edit/Delete buttons for post author
- [x] Modern UI using Shadcn UI and TailwindCSS
