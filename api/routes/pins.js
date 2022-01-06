const router = require('express').Router();
const { createPins, getAllPins} = require('../controllers/pinController')
//create
router.post("/", createPins)

//get all
router.get('/', getAllPins)

module.exports = router;