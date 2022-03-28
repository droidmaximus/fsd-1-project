var express = require("express");
var router = express.Router();
//include sqlite
var sqlite3 = require("sqlite3").verbose();
//include body parser
var bodyParser = require("body-parser");

//initialize a database
var db = new sqlite3.Database("../db/database.db");
//create a table for storing login credentials
db.run("CREATE TABLE IF NOT EXISTS login (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)");

const  credential = {
    email : "admin@gmail.com",
    password : "admin123"
}

router.post('/login', (req, res)=>{
    if(req.body.email == credential.email && req.body.password == credential.password){
        res.redirect('/route/profile');

    }else{
        res.end("Invalid Username or password")
    }
});

router.get('/profile', (req, res) => {
        res.render('profile')
})

router.post('/signup',(req, res)=>{

    db.run("INSERT INTO login (username, password) VALUES (?, ?)", [req.body.username, req.body.password], function(err){
        if(err){
            console.log(err);
            res.send("Error");
        }
    });
    
    res.redirect('/route/profile');
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