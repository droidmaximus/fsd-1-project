var express = require("express");
var router = express.Router();

const  credential = {
    email : "admin@gmail.com",
    password : "admin123"
}

router.post('/login', (req, res)=>{
    if(req.body.email == credential.email && req.body.password == credential.password){
        req.session.user = req.body.email;
        res.redirect('/route/profile');

    }else{
        res.end("Invalid Username or password")
    }
});

router.get('/profile', (req, res) => {
    if(req.session.user){
        res.render('profile', {user : req.session.user})
    }else{
        res.send("Unauthorize User")
    }
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