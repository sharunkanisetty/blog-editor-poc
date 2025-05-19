# Blog Editor App

A full-stack blog editor with login/signup using JWT authentication.

## Features
- User authentication (JWT)
- Create, edit, delete blogs
- View drafts and published blogs
- Protected actions (only logged-in users)

## Pages

### 🔐 Login Page
- URL: `/login`
- Allows existing users to login.
- Screenshot:
  ![Login](/screenshots/login.png)

### 🧾 Signup Page
- URL: `/signup`
- New users can register.
- Screenshot:
  ![Signup](../screenshots/signup.png)

### 📝 Editor Page
- URL: `/edit`
- Create or update a blog.
- Screenshot:
  ![Editor](../screenshots/create-blog.png)

### 📃 All Blogs Page
- Lists all published or draft blogs.
- Screenshot:
  ![Blogs](../screenshots/blog-list.png)
  ![Blogs](../screenshots/blog-list-draft.png)

  ### 📃 view Blogs Page
- view published blogs.
- Screenshot:
  ![Blogs](../screenshots/blog-view.png)
  


## Tech Stack
- **Frontend**: React.js
- **Backend**: Node.js, Express
- **Database**: MySQL/PostgreSQL with Sequelize
- **Auth**: JWT

## How to run
1. Start backend:
   ```bash
   node app.js
