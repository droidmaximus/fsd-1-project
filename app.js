const express = require('express');
const path = require('path');
const app = express();
const router = express.Router();
const sqlite3 = require("sqlite3").verbose();

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

app.listen(3000);

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
app.get('/bquiz', (req, res) => {
    res.render('bquiz');
});
app.get('/cquiz', (req, res) => {
    res.render('cquiz');
});
app.get('/gquiz', (req, res) => {
    res.render('gquiz');
});
app.get('/squiz', (req, res) => {
    res.render('squiz');
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






db.run("CREATE TABLE IF NOT EXISTS login (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)");


router.post('/login', (req, res)=>{

    let username = req.body.name;
    let password = req.body.password;

    if(username === credentials.username && password === credentials.password){
        auth=true;
        res.redirect('/examiner_dashboard');
    }
    else{
    db.get("SELECT * FROM login WHERE username = ? AND password = ?", [username, password], (err, row)=>{
        if(err){
            res.status(500).send("Error logging in");
        }
        else{
            if(row){
                index = row.id;
                res.redirect('/profile');
            }
            else{
                res.status(404).send("Invalid username or password");
            }
        }
    });
    }
});

router.get('/profile', (req, res) => {

    db.get("SELECT * FROM login WHERE id = ?", [index], (err, row)=>{
        if(err){
            res.status(500).send("Error logging in");
        }
        else{
            if(row){
                res.render('profile', {username: row.username});
            }
            else{
                res.status(404).send("Invalid username or password");
            }
        }
    });
})

router.post('/signup',(req, res)=>{
console.log(req.body);

    db.run("INSERT INTO login (username, password) VALUES (?, ?)", [req.body.user, req.body.password1], function(err){
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





