const Pin = require('../models/Pins')

const createPins = async (req, res) => {
    const newPin = new Pin(req.body);
    try {
        const savedPin = await newPin.save()
        res.status(201).json(savedPin)
    } catch (error) {
        res.status(500).json(error)
    }
} 

const getAllPins = async (req,res)=> {
    try {
        const pins = await Pin.find();
        res.status(200).json(pins)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = { createPins, getAllPins }