const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users_controller');
const postsController = require('../controllers/posts_controller');

router.get('/profile', usersController.profile);
router.get('/post', postsController.post);


  
module.exports = router;