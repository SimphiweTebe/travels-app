require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 4000;

const pinRouter = require('./routes/pins');
const usersRouter = require('./routes/users');

app.use(express.json())

async function connect(){
    try {
        await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
        console.log('DB connected successfully');
    } catch (error) {
        console.log(error);
    }
}
connect();

//routes
app.use('/api/pins', pinRouter)
app.use('/api/users', usersRouter)

app.listen(PORT, ()=> console.log(`Server running on ${PORT}`))