const express = require('express')
const app = express()
var bcrypt = require('bcryptjs')
const saltRounds = 10;
var jwt = require('jsonwebtoken')
const cors = require('cors')
var mongoose = require('mongoose')
const User = require('./schemas/user')

app.use(cors())
app.use(express.json())

// Register users
app.post('/register', (req,res) => {
    const username = req.body.username
    const hash = bcrypt.hashSync(req.body.password, saltRounds);

    let user = new User({
        username: username,
        password: hash
    })

    user.save((error) => {
        if(error) {
            res.json({error: 'Unable to save new user'})
        } else {
            res.json({success: true, message: 'Saved new user!'})
        }
    })
})

// Login users
app.post('/login', async (req,res) => {
    const username = req.body.username
    const password = req.body.password

    const user = await User.findOne({ username })
    console.log(user)
    bcrypt.compare(password, user.password, (error, result) => {
        if(result) { // credentials are valid
            var token = jwt.sign({ username: username }, 'someprivatekey');
            res.json({token: token})
        } else {
            // Credentials are not valid
            res.status(401).json({error: 'Invalid credentials'})
        }
    })    
})

// MIDDLEWARE IMPLEMENTATION
app.all('/api/*', (req,res,next) => {
    // Middleware
    console.log('Middleware called...')
    let headers = req.headers['authorization']

    if(headers) {
        const token = headers.split(' ')[1]
        var decoded = jwt.verify(token, 'someprivatekey')
        if(decoded) {
            const username = decoded.username
            // Check in the database if the user exists
            const persistedUser = Users.find(u => u.username == username)
            if(persistedUser) {
                next()
            } else {
                res.json({error: 'Invalid credentials'})
            }
        } else {
            res.json({error: 'Unauthorized access'})
        }
    } else {
        res.json({error: 'Unauthorized access'})
    }
})

// Connect to MongoDB
mongoose.connect('mongodb://localhost/React-Quote-Scramble-Game', {useNewUrlParser: true}, (error) => {
    if(!error) {
        console.log('Successfully connected to MongoDB database!')
    }
});

app.get('/api/home', (req,res) => {
    res.json({message: 'Quotes added...'})
})

app.get('/api/my-quotes', (req,res) => {
    res.json([])
})

app.post('/save', (req,res) => {
    let quote = req.body.quote
    let author = req.body.author
})

app.listen(8888, () => {
    console.log('Server is running...')
})