const passport = require('passport');
const bcryptjs = require('bcryptjs');
const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const jwt = require('jsonwebtoken');
const JWT_KEY = "jwtactive987";
const JWT_RESET_KEY = "jwtreset987";

// User Model
const User = require('../models/User');

// Register Handle
exports.registerHandle = (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];

    // Checking required fields
    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please enter all fields' });
    }

    // Checking password mismatch
    if (password != password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    // Checking password length
    if (password.length < 8) {
        errors.push({ msg: 'Password must be at least 8 characters' });
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    } else {
        User.findOne({ email: email }).then(user => {
            if (user) {
                errors.push({ msg: 'Email ID already registered' });
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            } else {
                // Generate token
                const token = jwt.sign({ name, email, password }, JWT_KEY, { expiresIn: '30m' });

                // Send activation email
                // ...

            }
        });
    }
};

// Activate Account Handle
exports.activateHandle = (req, res) => {
    const token = req.params.token;
    let errors = [];

    if (token) {
        jwt.verify(token, JWT_KEY, (err, decodedToken) => {
            if (err) {
                errors.push({ msg: 'Incorrect or expired link! Please register again' });
                res.redirect('/auth/register');
            } else {
                // Create new user
                // ...

            }
        });
    } else {
        console.log("Account activation error!");
    }
};

// Forgot Password Handle
exports.forgotPassword = (req, res) => {
    const { email } = req.body;
    let errors = [];

    // Checking required fields
    if (!email) {
        errors.push({ msg: 'Please enter an email ID' });
    }

    if (errors.length > 0) {
        res.render('forgot', {
            errors,
            email
        });
    } else {
        User.findOne({ email: email }).then(user => {
            if (!user) {
                errors.push({ msg: 'User with Email ID does not exist!' });
                res.render('forgot', {
                    errors,
                    email
                });
            } else {
                // Generate token
                const token = jwt.sign({ _id: user._id }, JWT_RESET_KEY, { expiresIn: '30m' });

                // Send password reset email
                // ...

            }
        });
    }
};

// Redirect to Reset Handle
exports.gotoReset = (req, res) => {
    const { token } = req.params;

    if (token) {
        jwt.verify(token, JWT_RESET_KEY, (err, decodedToken) => {
            if (err) {
                errors.push({ msg: 'Incorrect or expired link! Please try again' });
                res.redirect('/auth/login');
            } else {
                res.render('reset', {
                    token
                });
            }
        });
    } else {
        console.log("Password reset error!");
    }
};

// Reset Password Handle
exports.resetPassword = (req, res) => {
    const { password, password2, token } = req.body;
    let errors = [];

    // Checking required fields
    if (!password || !password2) {
        errors.push({ msg: 'Please enter all fields' });
    }

    // Checking password mismatch
    if (password != password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    // Checking password length
    if (password.length < 8) {
        errors.push({ msg: 'Password must be at least 8 characters' });
    }

    if (errors.length > 0) {
        res.render('reset', {
            errors,
            password,
            password2
        });
    } else {
        jwt.verify(token, JWT_RESET_KEY, (err, decodedToken) => {
            if (err) {
                errors.push({ msg: 'Incorrect or expired link! Please try again' });
                res.redirect('/auth/login');
            } else {
                // Update password
                // ...

            }
        });
    }
};

// Login Handle
exports.loginHandle = (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/auth/login',
        failureFlash: true
    })(req, res, next);
};

// Logout Handle
exports.logoutHandle = (req, res) => {
    req.logout();
    res.redirect('/');
};
