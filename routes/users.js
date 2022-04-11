//users route
const express = require('express');
const passport = require('passport');

const router = express.Router();
const userController = require('../controllers/userControllers');

router.use(passport.initialize());

router.get('/', userController.getAllUsers);    
router.post('/signup', userController.createUser);
router.post('/login', userController.loginUser);
router.put('/:id', userController.updateUserProfile);
router.delete('/:id', userController.deleteUser);


module.exports = router;