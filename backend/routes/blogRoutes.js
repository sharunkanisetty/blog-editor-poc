const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const { isLoggedIn, wrapAsync } = require('../middleware');
function requireLogin(req, res, next) {
    if (!req.session.userId) {
      return res.status(401).json({ message: 'Unauthorized, please login' });
    }
    next();
  }
  
// Protect routes requiring auth
router.post('/save-draft', wrapAsync(blogController.saveDraft));
router.post('/publish',requireLogin, wrapAsync(blogController.publish));
router.delete('/:id', wrapAsync(blogController.deleteBlog));

// Public routes
router.get('/', wrapAsync(blogController.getAllBlogs));
router.get('/:id', wrapAsync(blogController.getBlogById));

module.exports = router;
