const router = require('express').Router();
const {registerUser, loginUser, getAllUsers} = require('../controllers/userController')


//Register
router.post("/register", registerUser)

//Login
router.post('/login', loginUser)

//Get Users
router.get('/', getAllUsers)

module.exports = router;