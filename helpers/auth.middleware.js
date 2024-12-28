// middlewares/auth.middleware.js
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/user/login'); // Redirect to login page if not authenticated
}

module.exports = isAuthenticated;
