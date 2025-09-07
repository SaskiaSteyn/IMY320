const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config({ path: '../.env' })

const app = express()

// Configure CORS properly
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(express.json())

// connection string
let username = process.env.DB_USERNAME
let password = process.env.DB_PASSWORD
mongoose.connect(`mongodb+srv://${username}:${password}@theeestooges.7wpudcx.mongodb.net/stooges?retryWrites=true&w=majority&appName=TheeeStooges`)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err))

// Entry in DB
const UserSchema = new mongoose.Schema({
    userIDNumber: Number,
    username: String,
    email: String,
    password: String,
    role: String,
})

const User = mongoose.model('User', UserSchema)

// Product Schema
const ProductSchema = new mongoose.Schema({
    id: String,
    name: String,
    tags: [String],
    price: Number,
    stock: Number,
    image: String,
    description: String,
    sizes: [String]
})

const Product = mongoose.model('Product', ProductSchema)

//
// REGISTRATION ROUTE
//
app.post('/register', async (req, res) => {
    const { userIDNumber, username, email, password, role } = req.body

    // Validate required fields
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Username, email, and password are required' })
    }

    const hashedPassword = require('bcryptjs').hashSync(password, 10)

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] })
        if (existingUser) {
            return res.status(400).json({ error: 'User with this username or email already exists' })
        }

        const user = await User.create({ userIDNumber, username, email, password: hashedPassword, role })
        // Don't send password in response
        const { password: _, ...userResponse } = user.toObject()
        res.json(userResponse)
    } catch (err) {
        console.error('Registration error:', err)
        res.status(500).json({ error: 'Registration failed' })
    }
})

//
// LOGIN ROUTE
//
app.post('/login', async (req, res) => {
    const { username, password } = req.body

    // Validate required fields
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' })
    }

    try {
        const user = await User.findOne({ username })
        if (!user) return res.status(400).json({ error: 'User not found' })

        const valid = require('bcryptjs').compareSync(password, user.password)
        if (!valid) return res.status(401).json({ error: 'Incorrect password' })

        const token = require('jsonwebtoken').sign({ id: user._id }, 'secret123')
        res.json({ token })
    } catch (err) {
        console.error('Login error:', err)
        res.status(500).json({ error: 'Login failed' })
    }
})

//
// LOGOUT ROUTE
//
app.post('/logout', (req, res) => {
    res.json({ message: 'Logged out successfully' })
})



//
// GET all products
//
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find()
        res.json(products)
    } catch (err) {
        console.error('Error fetching products:', err)
        res.status(500).json({ error: 'Failed to fetch products' })
    }
})

// POST filter products by tags
app.post('/products/tags', async (req, res) => {
    const tags = req.body.tagsArray
    if (!tags) {
        return res.status(400).json({ error: 'Tags parameter is required' })
    }
    // tags can be an array or a comma-separated string
    const tagsArray = Array.isArray(tags) ? tags : tags.split(',')
    try {
        // Find products that have ANY of the specified tags (using $in for OR logic)
        const products = await Product.find({ tags: { $in: tagsArray } })
        res.json(products)
    } catch (err) {
        console.error('Error fetching products by tags:', err)
        res.status(500).json({ error: 'Failed to fetch products by tags' })
    }
})

// POST to add a new product
app.post('/products/add', async (req, res) => {
    const { ...productData } = req.body

    try {
        const product = await Product.create(productData)
        res.status(201).json(product)
    } catch (err) {
        console.error('Error adding product:', err)
        res.status(500).json({ error: 'Failed to add product' })
    }
})

app.listen(3000, () => {
    console.log('Server running on port 3000')
});

