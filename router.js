var express = require("express");
var router = express.Router();
//include sqlite
var sqlite3 = require("sqlite3").verbose();
//include body parser
var bodyParser = require("body-parser");

//initialize a database
let db = new sqlite3.Database(':memory:');
//create a table for storing login credentials
db.run("CREATE TABLE IF NOT EXISTS login (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)");


router.post('/login', (req, res)=>{

    let username = req.body.username;
    let password = req.body.password;

    db.get("SELECT * FROM login WHERE username = ? AND password = ?", [username, password], (err, row)=>{
        if(err){
            res.status(500).send("Error logging in");
        }
        else{
            if(row){
                res.redirect('/route/profile');
            }
            else{
                res.status(404).send("Invalid username or password");
            }
        }
    });
});

router.get('/profile', (req, res) => {

    res.render('profile', {
        username: req.session.username
    });
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
db.close();