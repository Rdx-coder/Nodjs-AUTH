# Node.js Authentication App

This is a Node.js authentication app built using Express.js, Passport.js, and MongoDB. It provides user registration, login, logout, and password reset functionalities. The app supports local email/password authentication as well as authentication using Google OAuth.

## Features

- User registration with email and password
- User login with email and password
- User logout
- Password reset functionality
- Google authentication using OAuth 2.0

## Installation

1. Clone the repository:

   ```shell
   git clone https://github.com/Rdx-coder/NOODE-JS-AUTH..git

2. Install the dependencies:

    shell
    Copy code
    cd node-authentication-app
    npm install

3. Set up environment variables:

    Create a .env file in the root directory of the project.

    Define the following environment variables in the .env file: 

    MONGODB_URI=your_mongodb_connection_string
    SESSION_SECRET=your_session_secret
    MAILER_EMAIL=your_email_address
    MAILER_PASSWORD=your_email_password

4. Start the application:
   npm start
   The application will be accessible at http://localhost:1432.

Usage:=>

    Register a new user by providing an email address and password on the
    signup page.
    Login with the registered email and password on the login page.
    Use the Google login button to authenticate with your Google account.
    Click on the logout button to log out of the application.
    Use the forgot password link on the login page to reset your password.

Dependencies
    The main dependencies used in this project are:

    express: Web application framework for Node.js.
    mongoose: Object Data Modeling (ODM) library for MongoDB and Node.js.
    passport: Authentication middleware for Node.js.
    passport-local: Passport strategy for authenticating with a username 
    and password.
    passport-google-oauth20: Passport strategy for authenticating with 
    Google using OAuth 2.0.
    bcryptjs: Library for hashing and comparing passwords.
    express-session: Session middleware for Express.
    connect-flash: Flash message middleware for Express.
    nodemailer: Library for sending emails from Node.js.
    For a complete list of dependencies, please refer to the package.json file.

License
    This project is licensed under the MIT License.
    
    Feel free to modify and customize the README file according to your 
    specific project requirements.

