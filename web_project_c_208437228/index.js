//Import
const express = require ("express");
const bodyParser = require ("body-parser");
const path = require ("path");
const PORT = 3000;
const sql = require('./DB/db.js');
const CreateDB = require('./DB/CreateDB');
const fs = require('fs');
const apiRoute = require('./routes/apiRoutes');

//Setups
const { nextTick } = require("process");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/static', express.static('static'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine' , 'pug');

//Routs
app.get('/', (req, res) => {
    res.render('signUp')
});

app.get('/contact-us', (req, res) => {
    res.render('contactUs')
});

app.get('/map', (req, res) => {
    res.render('map')
});

app.get('/leave', (req, res) => {
    res.render('leave')
});

app.get('/signIn', (req, res) => {
    res.render('signIn')
});

app.get('/homepage', (req, res) => {
    res.render('homepage')
});

app.get('/updatePassword', (req, res) => {
    res.render('updatePassword')
});

app.get('/findParkingLot', (req, res) => {
    res.render('findParkingLot');
});

app.get('/signUp', (req, res) => {
    res.render('signUp')
});

app.get('/ThankYou', (req, res) => {
    res.render('ThankYou')
});

app.get('/CreateUsersTable',CreateDB.CreateUsersTable);
app.get('/CreateParkingLotTable',CreateDB.CreateParkingLotTable);

app.get('/InsertUsersData', CreateDB.InsertUsersData);
app.get('/InsertParkingLotData', CreateDB.InsertParkingLotData);

app.get('/ShowUsersTable', CreateDB.ShowUsersTable);
app.get('/ShowParkingLotTable', CreateDB.ShowParkingLotTable);

app.get('/DropUsersTable', CreateDB.DropUsersTable);
app.get('/DropParkingLotTable', CreateDB.DropParkingLotTable);

app.use('/api', apiRoute);

//Listen
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));