var SQL = require('./db');
const path = require('path');
const csv=require('csvtojson');

//Create users table
const CreateUsersTable = (req,res)=> {
    var Q1 = "CREATE TABLE users (userName VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, PRIMARY KEY (userName, password) )";
    SQL.query(Q1,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating table"});
            return;
        };
        console.log('created userd table');
        res.send("table created");
        return;
    });      
};

//Create ParkingLot table
const CreateParkingLotTable = (req,res)=> {
    var Q1 = "CREATE TABLE ParkingLot (parkingLotID INT NOT NULL,Name VARCHAR(255) NOT NULL, Address VARCHAR(255) NOT NULL,numOfParkings INT NOT NULL,numOfNormalParkings INT NOT NULL,numOfNormalEmptyParkings INT NOT NULL, numOfDisableParkings INT NOT NULL, numOfDisableEmptyParkings INT NOT NULL,numOfElectricParkings INT NOT NULL,numOfElectricEmptyParkings INT NOT NULL, numOfMemberParkings INT NOT NULL, numOfMemberEmptyParkings INT NOT NULL, X DECIMAL (9,2) NOT NULL, Y DECIMAL (9,2) NOT NULL, PRIMARY KEY (parkingLotID))";
    SQL.query(Q1,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating table"});
            return;
        };
        console.log('created parkingLot table');
        res.send("table created");
        return;
    });      
};

//insert data to users table
const InsertUsersData = (req,res)=>{
    var Q2 = "INSERT INTO users SET ?";
    const csvFilePath= path.join(__dirname, "users.csv");
    csv().fromFile(csvFilePath).then((jsonObj)=>{
        console.log(jsonObj);
        jsonObj.forEach(element => {
            var NewEntry = {
                "userName": element.userName,
                "password": element.password
            };
            SQL.query(Q2, NewEntry, (err,mysqlres)=>{
                if (err) {
                    console.log("error in inserting data", err);
                };
                console.log("created row sucssefuly ");
            });
        });
    });
    res.send("data read");
};

//insert data to ParkingLot table
const InsertParkingLotData = (req,res)=>{
    var Q2 = "INSERT INTO ParkingLot SET ?";
    const csvFilePath= path.join(__dirname, "ParkingLot.csv");
    csv().fromFile(csvFilePath).then((jsonObj)=>{
        console.log(jsonObj);
        jsonObj.forEach(element => {
            var NewEntry = {
                "parkingLotID": element.parkingLotID,
                "Name": element.Name,
                "Address": element.Address,
                "numOfParkings": element.numOfParkings,
                "numOfNormalParkings": element.numOfNormalParkings,
                "numOfNormalEmptyParkings": element.numOfNormalEmptyParkings,
                "numOfDisableParkings": element.numOfDisableParkings,
                "numOfDisableEmptyParkings": element.numOfDisableEmptyParkings,
                "numOfElectricParkings": element.numOfElectricParkings,
                "numOfElectricEmptyParkings": element.numOfElectricEmptyParkings,
                "numOfMemberParkings": element.numOfMemberParkings,
                "numOfMemberEmptyParkings": element.numOfMemberEmptyParkings,
                "X": element.X,
                "Y": element.Y,
            };
            SQL.query(Q2, NewEntry, (err,mysqlres)=>{
                if (err) {
                    console.log("error in inserting data", err);
                };
                console.log("created row sucssefuly ");
            });
        });
    });
    res.send("data read");
};

//show users table
const ShowUsersTable = (req,res)=>{
    var Q3 = "SELECT * FROM users";
    SQL.query(Q3, (err, mySQLres)=>{
        if (err) {
            console.log("error in showing table ", err);
            res.send("error in showing table ");
            return;
        };
        console.log("showing users table");
        res.send(mySQLres);
        return;
    });
};

//show ParkingLot table
const ShowParkingLotTable = (req,res)=>{
    var Q3 = "SELECT * FROM ParkingLot";
    SQL.query(Q3, (err, mySQLres)=>{
        if (err) {
            console.log("error in showing table ", err);
            res.send("error in showing table ");
            return;
        };
        console.log("showing ParkingLot table");
        res.send(mySQLres);
        return;
    });
};

//drop users table
const DropUsersTable = (req, res)=>{
    var Q4 = "DROP TABLE users";
    SQL.query(Q4, (err, mySQLres)=>{
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({message: "error om dropping table" + err});
            return;
        };
        console.log("table drpped");
        res.send("table drpped");
        return;
    });
};

//drop ParkingLot table
const DropParkingLotTable = (req, res)=>{
    var Q4 = "DROP TABLE ParkingLot";
    SQL.query(Q4, (err, mySQLres)=>{
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({message: "error on dropping table" + err});
            return;
        };
        console.log("table dropped");
        res.send("table dropped");
        return;
    });
};


module.exports = {CreateUsersTable, CreateParkingLotTable, InsertUsersData, InsertParkingLotData, ShowUsersTable, ShowParkingLotTable, DropUsersTable, DropParkingLotTable};