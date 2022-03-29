const express = require('express');
const path = require('path');
const router = require('./router');
const app = express();

app.set('view engine', 'ejs');

app.listen(3000);

app.use('/static', express.static(path.join(__dirname, 'static')))
app.use('/assets', express.static(path.join(__dirname, 'assets')))

app.use('/route', router);


app.get('/', (req, res) => {
    res.render('homepage');
});

app.get('/bbcourses', (req, res) => {
    res.render('bbCourses');
});

app.get('/chessCourses',(req, res)=>{
    res.render('chessCourses');
});

app.get('/contact',(req,res)=>{
    res.sendFile(path.join(__dirname, 'views', 'contactus.html'));
});

app.get('/guitarCourses',(req,res)=>{
    res.render('guitarCourses');
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




