const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB

// connection string
let username = process.env.DB_USERNAME;
let password = process.env.DB_PASSWORD;
mongoose.connect(`mongodb+srv://${username}:${password}@theeestooges.7wpudcx.mongodb.net/?retryWrites=true&w=majority&appName=TheeeStooges`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'));

// Entry in DB
const UserSchema = new mongoose.Schema({
    userIDNumber: Number,
    username: String,
    email: String,
    password: String,
    role: String,
});

const User = mongoose.model('User', UserSchema);

//
// REGISTRATION ROUTE
//
app.post('/register', async (req, res) => {
    const {userIDNumber, username, email, password, role} = req.body;
    const hashedPassword = require('bcryptjs').hashSync(password, 10);

    try {
        const user = await User.create({userIDNumber, username, email, password: hashedPassword, role});
        res.json(user);
    } catch (err) {
        res.status(500).json({error: 'Registration failed'});
    }
});

//
// LOGIN ROUTE
//
app.post('/login', async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (!user) return res.status(400).json({error: 'User not found'});

    const valid = require('bcryptjs').compareSync(password, user.password);
    if (!valid) return res.status(401).json({error: 'Incorrect password'});

    const token = require('jsonwebtoken').sign({id: user._id}, 'secret123');
    res.json({token});
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});
