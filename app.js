const express = require('express');
const path = require('path');
const app = express();
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const validate = require('./signup.js');
let db = new sqlite3.Database('userdetails.db');

app.set('view engine', 'ejs');

app.listen(3000);

app.use('/static', express.static(path.join(__dirname, 'static')))
app.use('/assests', express.static(path.join(__dirname, 'assests')))

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
    res.sendFile(path.join(__dirname, 'views', 'contactus.html'));
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

app.get('/sudokuExaminer',(req,res)=>{
    res.render('sudokuExaminer');
});

app.get('/examiner_dashboard',(req,res)=>{
    res.render('examiner_dashboard');
});

app.get('/Error404',(req,res)=>{
    res.render('Error404');
});










// db.run("CREATE TABLE IF NOT EXISTS login (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)");


// router.post('/login', (req, res)=>{

//     let username = req.body.username;
//     let password = req.body.password;

//     db.get("SELECT * FROM login WHERE username = ? AND password = ?", [username, password], (err, row)=>{
//         if(err){
//             res.status(500).send("Error logging in");
//         }
//         else{
//             if(row){
//                 res.redirect('/route/profile');
//             }
//             else{
//                 res.status(404).send("Invalid username or password");
//             }
//         }
//     });
// });

// router.get('/profile', (req, res) => {

//     res.render('profile', {
//         username: req.session.username
//     });
// })

// router.post('/signup',(req, res)=>{

// if(validate.validate(req.body.email, req.body.password1, req.body.password2)){
//     db.run("INSERT INTO login (username, password) VALUES (?, ?)", [req.body.username, req.body.password], function(err){
//         if(err){
//             console.log(err);
//             res.send("Error");
//         }
//     });
    
//     res.redirect('/route/profile');
// }
// })

// router.get('/logout', (req ,res)=>{
//     req.session.destroy(function(err){
//         if(err){
//             console.log(err);
//             res.send("Error")
//         }else{
//             res.render('base', { title: "Express", logout : "logout Successfully...!"})
//         }
//     })
// })

// module.exports = router;
// db.close();




