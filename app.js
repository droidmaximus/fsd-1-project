const express = require('express');
const path = require('path');
const app = express();
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();
const validate = require('./signup.js');
let db = new sqlite3.Database('userdetails.db');
const bodyparser = require('body-parser');


app.use(bodyparser.urlencoded({extended: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.get('/chessCourses',(req, res)=>{
    res.render('chessCourses');
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








db.run("CREATE TABLE IF NOT EXISTS login (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)");


router.post('/login', (req, res)=>{

    let email = req.body.email;
    let password = req.body.password;

    db.get("SELECT * FROM login WHERE username = ? AND password = ?", [username, password], (err, row)=>{
        if(err){
            res.status(500).send("Error logging in");
        }
        else{
            if(row){
                res.redirect('/profile');
            }
            else{
                res.status(404).send("Invalid username or password");
            }
        }
    });
});

// router.get('/profile', (req, res) => {

//     res.render('profile', {
//         username: req.session.ame
//     });
// })

router.post('/signup',(req, res)=>{
console.log(req.body);

    db.run("INSERT INTO login (username, password) VALUES (?, ?)", [req.body.email, req.body.password1], function(err){
        if(err){
            console.log(err);
            res.send("Error");
        }
    });
    
    res.redirect('/profile');
})

router.get('/logout', (req ,res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send("Error")
        }else{
            res.render('base', { title: "Express", logout : "logout Successfully...!"})
        }
    })
})

module.exports = router;





