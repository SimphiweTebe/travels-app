const bcrypt = require('bcryptjs');
const User = require('../models/User');

const registerUser = async (req, res) => {
    const {username, email, password} = (req.body);

    //check empty fields
    if(!username && !email && !password){
        return res.status(400).json({ message: "All fields are required."})
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({username, email, password: hashedPassword})
        res.status(201).json({ _id: newUser._id, username: newUser.username })
    } catch (error) {
        res.status(400).json({ message: error })
        console.log(error);
    }
}

const loginUser = async (req,res)=> {
    const {email, password} = (req.body);

    try {
        //check empty fields
        if(!email && !password) res.status(500).json({ message: "All fields are required." })
    
        //check user exists && match credentials
        const validUser = await User.findOne({ email });
        const validPass = await bcrypt.compare(password, validUser.password);
        if(!validUser) return res.status(500).json({ message: "Invalid user credentials"});
        if(!validPass) return res.status(500).json({ message: "Invalid user credentials"});

        res.status(200).json({ _id: validUser._id, username: validUser.username })
    } catch (error) {
        res.status(400).json({ message: error.message })
        console.log(error.message);
    }
}

const getAllUsers = async (req,res)=> {
    try {
        const users = await User.find();
        res.status(200).json(users)
    } catch (error) {
        res.status(400).json(error)
        console.log(error);
    }
}

module.exports = { registerUser, loginUser, getAllUsers }