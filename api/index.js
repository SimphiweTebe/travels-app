require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;

const pinRouter = require('./routes/pins');
const usersRouter = require('./routes/users');

app.use(cors());
app.use(express.json());

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
app.get('/', (req, res) => {
    res.send("<h1>PIN-IT-API</h1>")
})
app.use('/api/pins', pinRouter)
app.use('/api/users', usersRouter)

app.listen(PORT, ()=> console.log(`Server running on ${PORT}`))