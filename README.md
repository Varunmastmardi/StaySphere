# StaySphere

StaySphere is a comprehensive web application developed using the MERN stack (MongoDB, Express, React, Node.js). This project focuses on providing a platform where users can create, view, edit, and review various accommodation listings. The application is designed using the MVC (Model-View-Controller) architecture and integrates several key features to ensure a seamless user experience.

## Key Features

### 1. User Authentication and Authorization
- User authentication is implemented using Passport.js with local strategy. Users can sign up, log in, and log out securely.
- User roles are managed to ensure that only the owner of a listing can edit or delete it. Similarly, only the author of a review can delete their review.

### 2. Listing Management
- Users can create new listings with detailed information such as location, images, and descriptions.
- Listings can be edited or deleted by their respective owners.
- Location data is enriched by integrating MapTiler’s geocoding API for accurate geolocation.
- Images for listings are uploaded and stored using Cloudinary, ensuring that images are optimized and securely stored.

### 3. Review System
- Users can add reviews to listings, contributing to community-driven feedback.
- Reviews are linked to the listing and the author, allowing for easy management and retrieval.
- The application ensures that only the author of a review can delete it, maintaining integrity in the review process.

### 4. Session Management and Security
- Sessions are managed using `express-session` with MongoDB as the session store, ensuring scalability and security.
- Environment variables are used to manage sensitive information like database URLs, API keys, and session secrets.
- Flash messages are implemented to provide users with feedback during interactions like logging in, logging out, or performing CRUD operations.

### 5. Error Handling
- The application includes robust error handling using custom Express error classes, ensuring that any issues are communicated clearly to the user.
- 404 error handling is implemented for undefined routes, enhancing user experience.

### 6. EJS Templating
- The frontend is built using the EJS templating engine, allowing for dynamic rendering of data from the server.
- Views are modular, with partials used for components like headers and footers, making the codebase easier to maintain.

### 7. RESTful API
- The application follows RESTful principles in designing the API endpoints for listings, reviews, and user management.
- Middleware functions ensure that requests are validated, users are authenticated, and proper permissions are enforced before any data manipulation occurs.

## Tech Stack
- **Frontend:** EJS, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose for ORM)
- **Authentication:** Passport.js
- **File Storage:** Cloudinary
- **Geolocation:** MapTiler API
- **Session Management:** express-session, connect-mongo
- **Templating:** EJS

## Installation Instructions

1. Clone the repository.
   ```bash
   git clone https://github.com/varunmastmardi/StaySphere.git
   
