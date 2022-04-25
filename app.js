const express = require('express');
const path = require('path');
const app = express();
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const morgan = require('morgan');
const mongoose = require('mongoose');
const user = require('./models/user');

let sessionuser

const uri = 'mongodb+srv://admin:admin123@howtobasic.xhoei.mongodb.net/HowToBasic?retryWrites=true&w=majority'

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000))
  .catch(err => console.log(err));

let index = 0;

let credentials ={
    "username": "admin",
    "password": "admin12345"
}

let db = new sqlite3.Database('userdetails.db');
const bodyparser = require('body-parser');


app.use(bodyparser.urlencoded({extended: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use('/static', express.static(path.join(__dirname, 'static')))
app.use('/assests', express.static(path.join(__dirname, 'assests')))
app.use('/js', express.static(path.join(__dirname, 'js')))

app.use('/route', router);

app.get('/', (req, res) => {
    res.render('homepage');
});

app.get('/bbCourses', (req, res) => {
    res.render('bbCourses');
});

app.get('/bbExaminer', (req, res) => {
    res.render('bbExaminer');
});

app.get('/chessCourses',(req, res)=>{
    res.render('chessCourses');
});

app.get('/chessExaminer',(req, res)=>{
    res.render('chessExaminer');
});

app.get('/contact',(req,res)=>{
    res.render("contactus");
});

app.get('/guitarCourses',(req,res)=>{
    res.render('guitarCourses');
});

app.get('/guitarExaminer',(req,res)=>{
    res.render('guitarExaminer');
});

app.get('/login',(req,res)=>{
    res.render('login');
});

app.get('/signup',(req,res)=>{
    res.render('signup');
});

app.get('/profile',(req,res)=>{
    res.render('profile');
});

app.get('/my_courses',(req,res)=>{
    res.render('my_courses');
});

app.get('/sudokuCourses',(req,res)=>{
    res.render('sudokuCourses');
});

app.get('/examiner_dashboard',(req,res)=>{
    res.render('examiner_dashboard');
});
app.get('/sudokuExaminer',(req,res)=>{
    res.render('sudokuExaminer');
});

app.get('/about',(req,res)=>{
    res.render('about');
});

app.get('*',(req,res)=>{
    res.render('Error404');
});

router.post('/login', (req, res)=>{

    let username = req.body.name;
    let password = req.body.password;

    if(username === credentials.username && password === credentials.password){
        auth=true;
        res.redirect('/examiner_dashboard');
    }
    else{
        user.findOne({username: username, password: password}, function(err, user){
            if(err){
                console.log(err);
            }
            else{
                if(!user){
                    res.redirect('/login');
                }
                else{
                    sessionuser = user;
                    res.render('profile', {user: user});
                }
            }
        });
    }
});

router.post('/signup',(req, res)=>{
    const User = new user({
        username: req.body.user,
        password: req.body.password1,
        email: req.body.email
    })

    User.save()
    .then(
        sessionuser = User,
        res.redirect('/profile',{user: sessionuser})
    )
    .catch(err => {console.log(err)})
})

module.exports = router;





