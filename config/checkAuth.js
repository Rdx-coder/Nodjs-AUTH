// Routing middleware for authentication

module.exports = {
    // Middleware to ensure user is authenticated
    ensureAuthenticated: function (req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }
      req.flash('error_msg', 'Please log in first!');
      res.redirect('/auth/login');
    },
    
    // Middleware to redirect authenticated users
    forwardAuthenticated: function (req, res, next) {
      if (!req.isAuthenticated()) {
        return next();
      }
      res.redirect('/dashboard');
    }
  };
  