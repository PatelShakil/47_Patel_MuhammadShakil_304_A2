# Fullstack Assignment

This repository contains the solutions for a full-stack development assignment. The assignment is divided into 7 questions, each demonstrating different concepts and technologies in web development.

## Glimpse of the Assignment

This assignment covers a wide range of topics, from basic server setup to more advanced concepts like session management, database integration, and creating RESTful APIs. Each question builds upon the previous one, introducing new technologies and challenges.

## Learnings from the Assignment

*   **Server-side Development:** Building robust servers with Node.js and Express.
*   **Templating Engines:** Using EJS to render dynamic HTML content.
*   **Middleware:** Understanding and using middleware for various purposes like parsing request bodies, handling file uploads, and managing sessions.
*   **Session Management:** Implementing session management using different stores like file system, Redis, and MongoDB.
*   **Database Integration:** Connecting to and performing CRUD operations on a MongoDB database using Mongoose.
*   **RESTful APIs:** Designing and building RESTful APIs for client-server communication.
*   **Authentication and Authorization:** Implementing basic authentication and protecting routes.
*   **Third-Party APIs:** Interacting with external APIs to fetch data.

---

## Question 1: User Registration Form

This question demonstrates a user registration form with server-side validation and file uploads.

*   **Technologies Used:** Node.js, Express, EJS, Multer, Express-validator
*   **To Run:**
    ```bash
    cd Q1
    npm install
    npm start
    ```

## Question 2: Login with File-based Session

This question implements a login system with session management using the file system to store session data.

*   **Technologies Used:** Node.js, Express, EJS, express-session, session-file-store
*   **To Run:**
    ```bash
    cd Q2
    npm install
    npm start
    ```

## Question 3: Login with Redis Session

This question enhances the login system by using Redis to store session data, providing better performance and scalability.

*   **Technologies Used:** Node.js, Express, EJS, express-session, connect-redis, Redis
*   **To Run:**
    ```bash
    cd Q3
    npm install
    npm start
    ```

## Question 4: Employee Management CRUD

This question demonstrates a full CRUD (Create, Read, Update, Delete) application for managing employees. It uses MongoDB to store employee data and connect-mongo to store session data.

*   **Technologies Used:** Node.js, Express, EJS, MongoDB, Mongoose, express-session, connect-mongo
*   **To Run:**
    ```bash
    cd Q4
    npm install
    npm start
    ```

## Question 5: RESTful API for Employee Leave Management

This question involves creating a RESTful API for managing employee leave applications. It includes a simple HTML, CSS, and JavaScript frontend to interact with the API.

*   **Technologies Used:** Node.js, Express, MongoDB, Mongoose, CORS
*   **To Run:**
    ```bash
    cd Q5
    npm install
    npm start
    ```

## Question 6: Joke Fetcher

This question demonstrates how to fetch data from a third-party API. It fetches a random joke from the JokeAPI and displays it on the frontend.

*   **Technologies Used:** Node.js, Express, Request, CORS
*   **To Run:**
    ```bash
    cd Q6
    npm install
    npm start
    ```

## Question 7: E-commerce Application

This question is a simple e-commerce application with an admin panel to manage products and categories, and a shop view for customers to browse and view products.

*   **Technologies Used:** Node.js, Express, EJS, MongoDB, Mongoose, express-session, method-override
*   **To Run:**
    ```bash
    cd Q7
    npm install
    npm start
    ```