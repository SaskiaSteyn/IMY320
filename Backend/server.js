const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
// Load dotenv only if not in Docker (docker-compose handles env vars)
if (!process.env.DOCKER_ENV) {
    require('dotenv').config({path: '../.env'})
}
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const app = express()

// Configure CORS properly
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(express.json())

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, '../frontend/public/images/merch')
        // Ensure the directory exists
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, {recursive: true})
        }
        cb(null, uploadPath)
    },
    filename: function (req, file, cb) {
        // Generate unique filename while preserving extension
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: function (req, file, cb) {
        // Check file type
        if (file.mimetype.startsWith('image/')) {
            cb(null, true)
        } else {
            cb(new Error('Not an image! Please upload only images.'), false)
        }
    }
})

// connection string
let username = process.env.DB_USERNAME
let password = process.env.DB_PASSWORD

if (!username || !password) {
    console.error('Missing required environment variables: DB_USERNAME and/or DB_PASSWORD')
    console.error('Please make sure your .env file is properly configured')
    process.exit(1)
}

mongoose.connect(`mongodb+srv://${username}:${password}@theeestooges.7wpudcx.mongodb.net/stooges?retryWrites=true&w=majority&appName=TheeeStooges`)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
        console.error('MongoDB connection error:', err)
        process.exit(1)
    })

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
    descriptor: String,
    link: String,
    image: String,
    availability: String,
    availabilityDate: String,
    price: Number,
    brand: String,
    tags: [String],
    stock: Number,
    sizes: [String]
})

// Order Schema
const OrderSchema = new mongoose.Schema({
    orderID: String,
    userIDNumber: Number,
    orderDate: Date,
    status: String,
    totalPrice: Number,
    items: [{
        productID: String,
        name: String,
        image: String,
        quantity: Number,
        price: Number,
        sizes: [String]
    }]
})

const Product = mongoose.model('Product', ProductSchema)
const Order = mongoose.model('Order', OrderSchema)


//
// REGISTRATION ROUTE
//
app.post('/register', async (req, res) => {
    const {username, email, password, role} = req.body

    // Validate required fields
    if (!username || !email || !password) {
        return res.status(400).json({error: 'Username, email, and password are required'})
    }

    const hashedPassword = require('bcryptjs').hashSync(password, 10)

    try {
        // Check if user already exists
        const existingUser = await User.findOne({$or: [{username}, {email}]})
        if (existingUser) {
            return res.status(400).json({error: 'User with this username or email already exists'})
        }

        // Generate next user ID number by finding the highest existing ID and adding 1
        const lastUser = await User.findOne({}, {}, {sort: {'userIDNumber': -1}})
        const nextUserIDNumber = lastUser ? (lastUser.userIDNumber || 0) + 1 : 1

        const user = await User.create({
            userIDNumber: nextUserIDNumber,
            username,
            email,
            password: hashedPassword,
            role: role || 'user' // Default to 'user' role if not specified
        })

        // Don't send password in response
        const {password: _, ...userResponse} = user.toObject()
        res.json(userResponse)
    } catch (err) {
        console.error('Registration error:', err)
        res.status(500).json({error: 'Registration failed'})
    }
})

//
// LOGIN ROUTE
//
app.post('/login', async (req, res) => {
    const {username, password} = req.body

    // Validate required fields
    if (!username || !password) {
        return res.status(400).json({error: 'Username and password are required'})
    }

    try {
        const user = await User.findOne({username})
        if (!user) return res.status(400).json({error: 'User not found'})

        const valid = require('bcryptjs').compareSync(password, user.password)
        if (!valid) return res.status(401).json({error: 'Incorrect password'})

        const token = require('jsonwebtoken').sign({id: user._id, role: user.role}, 'secret123')
        res.json({
            token,
            user: {
                id: user._id,
                userIDNumber: user.userIDNumber,
                username: user.username,
                email: user.email,
                role: user.role
            }
        })
    } catch (err) {
        console.error('Login error:', err)
        res.status(500).json({error: 'Login failed'})
    }
})

//
// LOGOUT ROUTE
//
app.post('/logout', (req, res) => {
    res.json({message: 'Logged out successfully'})
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
        res.status(500).json({error: 'Failed to fetch products'})
    }
})

// POST filter products by tags
app.post('/products/tags', async (req, res) => {
    const tags = req.body.tagsArray
    if (!tags) {
        return res.status(400).json({error: 'Tags parameter is required'})
    }
    // tags can be an array or a comma-separated string
    const tagsArray = Array.isArray(tags) ? tags : tags.split(',')
    try {
        // Find products that have ANY of the specified tags (using $in for OR logic)
        const products = await Product.find({tags: {$in: tagsArray}})
        res.json(products)
    } catch (err) {
        console.error('Error fetching products by tags:', err)
        res.status(500).json({error: 'Failed to fetch products by tags'})
    }
})

// POST to add a new product
app.post('/products/add', async (req, res) => {
    const {...productData} = req.body

    try {
        const product = await Product.create(productData)
        res.status(201).json(product)
    } catch (err) {
        console.error('Error adding product:', err)
        res.status(500).json({error: 'Failed to add product'})
    }
})

// PUT to update a product by ID
app.put('/products/:id', async (req, res) => {
    const productId = req.params.id
    const updateData = req.body

    try {
        const product = await Product.findOneAndUpdate(
            {id: productId},
            updateData,
            {new: true, runValidators: true}
        )

        if (!product) {
            return res.status(404).json({error: 'Product not found'})
        }

        res.json(product)
    } catch (err) {
        console.error('Error updating product:', err)
        res.status(500).json({error: 'Failed to update product'})
    }
})

// POST to adjust product stock by ID
app.post('/products/:id/adjust-stock', async (req, res) => {
    const productId = req.params.id
    const {adjustment} = req.body

    // Validate adjustment parameter
    if (typeof adjustment !== 'number') {
        return res.status(400).json({error: 'Adjustment must be a number'})
    }

    try {
        const product = await Product.findOne({id: productId})

        if (!product) {
            return res.status(404).json({error: 'Product not found'})
        }

        // Calculate new stock level
        const newStock = product.stock + adjustment

        // Prevent negative stock
        if (newStock < 0) {
            return res.status(400).json({
                error: 'Cannot adjust stock below zero',
                currentStock: product.stock,
                requestedAdjustment: adjustment
            })
        }

        // Update the product stock and availability
        product.stock = newStock
        product.availability = newStock > 0 ? 'In Stock' : 'Out of Stock'
        await product.save()

        res.json({
            success: true,
            productId: productId,
            previousStock: product.stock - adjustment,
            newStock: product.stock,
            adjustment: adjustment,
            availability: product.availability
        })
    } catch (err) {
        console.error('Error adjusting stock:', err)
        res.status(500).json({error: 'Failed to adjust stock'})
    }
})

//  Delete a product by ID
app.delete('/products/:id', async (req, res) => {
    const productId = req.params.id;

    try {
        const deletedProduct = await Product.findOneAndDelete({id: productId});

        if (!deletedProduct) {
            return res.status(404).json({error: 'Product not found'});
        }

        res.json({
            success: true,
            message: `Product with ID ${productId} has been deleted`,
            deletedProduct
        });
    } catch (err) {
        console.error('Error deleting product:', err);
        res.status(500).json({error: 'Failed to delete product'});
    }
});

// POST endpoint for image upload
app.post('/upload-image', upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({error: 'No image file uploaded'})
        }

        // Return the filename that can be used in the product creation
        const filename = req.file.filename
        const imageUrl = `/images/merch/${filename}`

        res.json({
            success: true,
            filename: filename,
            imageUrl: imageUrl,
            message: 'Image uploaded successfully'
        })
    } catch (error) {
        console.error('Error uploading image:', error)
        res.status(500).json({error: 'Failed to upload image'})
    }
})

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
    });
});


// Order History

// Create a new order
app.post('/orders/create', async (req, res) => {
    const {userIDNumber, items, status} = req.body;

    if (!userIDNumber || !items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({error: 'Missing required order data'});
    }

    try {
        // Calculate total price server-side
        const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

        // Find last order to generate incremental ID
        const lastOrder = await Order.findOne({}, {}, {sort: {orderID: -1}});

        let nextNumber = 1;
        if (lastOrder && lastOrder.orderID) {
            // Extract numeric part from last orderID, e.g., "O123" -> 123
            const lastNumber = parseInt(lastOrder.orderID.replace(/^O/, ''), 10);
            if (!isNaN(lastNumber)) nextNumber = lastNumber + 1;
        }

        const orderID = 'O' + nextNumber;

        const order = await Order.create({
            orderID,
            userIDNumber,
            orderDate: new Date(),
            status: status || 'Processing',
            totalPrice,
            items
        });

        res.status(201).json(order);
    } catch (err) {
        console.error('Error creating order:', err);
        res.status(500).json({error: 'Failed to create order'});
    }
});

// Get all orders
app.get('/orders', async (req, res) => {
    try {
        const orders = await Order.find().sort({orderDate: -1}); // latest orders first
        res.json(orders);
    } catch (err) {
        console.error('Error fetching orders:', err);
        res.status(500).json({error: 'Failed to fetch orders'});
    }
});

// Get orders by user ID
app.get('/orders/user/:userIDNumber', async (req, res) => {
    const userIDNumber = parseInt(req.params.userIDNumber, 10);

    if (isNaN(userIDNumber)) {
        return res.status(400).json({error: 'Invalid userIDNumber format'});
    }

    try {
        const userOrders = await Order.find({userIDNumber}).sort({orderDate: -1});

        if (!userOrders || userOrders.length === 0) {
            return res.status(404).json({message: 'No orders found for this user'});
        }

        res.json(userOrders);
    } catch (err) {
        console.error('Error fetching user orders:', err);
        res.status(500).json({error: 'Failed to fetch user orders'});
    }
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});

