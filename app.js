const express = require('express');
const path = require('path');
const bodyparser = require("body-parser");
const session = require("express-session");
const router = require('./router');
const { v4: uuidv4 } = require("uuid");
const app = express();

app.set('view engine', 'ejs');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }))

app.listen(3000);

app.use('/static', express.static(path.join(__dirname, 'static')))
app.use('/assets', express.static(path.join(__dirname, 'assets')))

app.use('/route', router);

app.use(session({
    secret: uuidv4(), 
    resave: false,
    saveUninitialized: true
}));

app.get('/', (req, res) => {

    res.render('login');

});