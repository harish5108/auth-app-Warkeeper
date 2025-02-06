# Authentication Warrior

Authentication is the process of verifying the identity of a user, system. It's like checking an ID to make sure someone is who they say they are.
## Authentication-Output
- **Output1:**

<img src="https://raw.githubusercontent.com/harish5108/auth-app-Warkeeper/refs/heads/main/SharedScreenshotAuthO2.jpg" alt="Output1" width="100%" height="100%">

- **Output2:**

<img src="https://raw.githubusercontent.com/harish5108/auth-app-Warkeeper/refs/heads/main/ScreenshotAuthO3.jpg" alt="Output2" width="100%" height="100%">

- **Output3:**

<img src="https://raw.githubusercontent.com/harish5108/auth-app-Warkeeper/refs/heads/main/ScreenshotAuthO4.jpg" alt="Output3" width="100%" height="100%">

- **Output4:**

<img src="https://raw.githubusercontent.com/harish5108/auth-app-Warkeeper/refs/heads/main/ScreenshotAuthO5.jpg" alt="Output4" width="100%" height="100%">

## 1. Overview of the System

Two Servers: One is an Express server that handles user authentication and other backend operations, while the other is a local server (could be your frontend or another service) that communicates with the Express server.
- **Key Technologies:**
  - PostgreSQL (pg): Database to store user credentials.
  - Express: Web framework for building the API.
  - Async JavaScript: Used for handling asynchronous operations like database queries and authentication.
  - Material UI: Frontend component library for building UI elements.
  - OAuth2: An authentication protocol that allows users to log in using third-party services like Google, Facebook, etc.
## 2. Login Authentication Flow

- **Frontend (Local Server):** The local server (your React app or similar frontend) uses Material UI to create a user-friendly login form where users enter their credentials.
- **Backend (Express Server):** The Express server handles the login authentication process, validating the user's credentials against the PostgreSQL database.
## 3. Steps of Authentication

**3.1 User Submits Login Form (Frontend)**
The user enters their username and password into a Material UI form.
Once submitted, the frontend sends an HTTP request (using fetch or axios) to the Express backend.

**3.2 Authentication (Backend - Express)**
Async Database Query: The Express server, using async JavaScript, queries the PostgreSQL database to check if the user exists and if the password matches the stored hash.
If the user exists and the password matches, the server generates a JWT (JSON Web Token) or uses OAuth2 to authenticate with third-party services.

**3.3 Return Response**
JWT or OAuth2 Token: If successful, the backend sends a JWT token or an OAuth2 access token back to the frontend. The token can then be used for subsequent requests to protected routes.
Error Handling: If authentication fails, the backend responds with an error message.

**3.4 Use OAuth2**
If using OAuth2, the user might log in with third-party services (like Google or Facebook). The backend will handle the OAuth2 flow to authenticate the user and retrieve an access token.
## 4. Technologies in Action

- **Express Server (Backend)**
PostgreSQL (pg) is used to check the user credentials in the database.
Async JavaScript ensures that the database queries and other operations are non-blocking.
If using OAuth2, passport.js (or another library) is used for OAuth2 authentication.
- **Local Server (Frontend):**
Material UI is used to design the login form and other UI components.
Once the form is submitted, the frontend sends a request to the Express server for authentication.
Upon successful login, the frontend stores the received token (JWT or OAuth2) and uses it for future requests.
## 5. Summary of Key Technologies:

- **PostgreSQL (pg):** Stores user data like usernames and hashed passwords.
- **Express: Provides** API endpoints for login and handles authentication.
- **Async JavaScript:** Ensures smooth, non-blocking operations like querying the database and handling requests.
- **Material UI:** Frontend framework used to build the login page and user interface.
- **OAuth2:** An authentication method to allow users to log in using third-party accounts (Google, Facebook, etc.).
- **JWT:** Token used for maintaining authentication between the client and server.

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
#
