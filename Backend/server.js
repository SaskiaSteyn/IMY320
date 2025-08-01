const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB

mongoose.connect('mongodb://localhost:27017/TheeeStooges', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'));

// Entry in DB
const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

const User = mongoose.model('User', UserSchema);

//
// ROUTES
//

// mongodb://localhost:27017/TheeeStooges/register
app.post('/register', async (req, res) => {
    const {username, email, password} = req.body;
    const hashedPassword = require('bcryptjs').hashSync(password, 10);

    try {
        const user = await User.create({username, email, password: hashedPassword});
        res.json(user);
    } catch (err) {
        res.status(500).json({error: 'Registration failed'});
    }
});

// mongodb://localhost:27017/TheeeStooges/login
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
