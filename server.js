const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')


const User = require('./models/User')

const UserRoute = require('./routes/user')
const AuthRoute = require('./routes/auth')

mongoose.connect('mongodb://localhost:27017/Duc', {useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection

db.on('error',(err) => {
    console.log (err)
})

db.once('open', () => {
    console.log('Database Connection!')
})

var app = express()
app.set('view engine', 'ejs')
app.set('views', './views')

app.use(express.static(path.join(__dirname, 'public')))
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.get('/', function(req, res){
    res.render('index')
})

app.get('/register', function( req, res){
    res.render('register')
})

app.get('/login', function( req, res){
    res.render('home')
})

app.get('/changepassword', function(req, res){
    res.render('changepassword')
})
app.get('/listUser', function(req, res){
    res.render('listUser')
})

app.get('/add', function(req, res){ 
    res.render('add')
})

app.get('/edit/:id',async function(req, res){
    userId = req.params.id ;
    let updateData = {
        username: req.body.username,
        password: req.body.password
    }
    user = await User.findOne({_id: userId}).exec() // xem lại câu lệnh
    console.log(user); // thaas lay duoc chua 
    res.render('edit',{id:userId,
                       user: user}) //đéo truyền gì xuống thì gọi được à ? // vãi cak
})


app.get('/delete/:id', function(req,res){
    userId = req.params.id;
    console.log(userId)
    res.render('delete',{id: userId})
})

app.use('/api/user', UserRoute)
app.use('/api', AuthRoute)


const PORT = process.env.PORT || 3000


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})

