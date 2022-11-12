const sql = require("../DB/db");
const passwordRegex=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;

// SignIn function, check in the DB that there is a user with the userName and password that added
const signIn = (req, res) => {
    if(!req.body){
        res.status(400).send({message: "Content can not be empty"});
        return;
    };
    if(!req.body.userName || !passwordRegex.test(req.body.password)) {
        res.status(400).send({message: 'The password must be between 8 to 20 characters which contain at least one lowercase letter, one uppercase letter and one numeric digit'} );
        return;
    };
    const userData = [
        req.body.userName,
        req.body.password
    ];
    const Q1 = "SELECT * FROM users WHERE userName = ? AND password = ?";
    sql.query(Q1, userData, (err, mysqlres) => {
        if(!mysqlres.length){
            res.status(400).send("error in finding user" + err);
            console.log("error on finding user" +err);
            return;
        };
        console.log("error",err, 'res', mysqlres);
        res.status(200).json(mysqlres)
    });
};

//Create new user function, insert into DB
const createNewUser = (req, res) =>{
    console.log(req.body.userName);
    if(!req.body){
        res.status(400).send({message: "content can not be empty"});
        return;
    };
    if(!req.body.userName || !passwordRegex.test(req.body.password)) {
        res.status(400).send({message: 'The password must be between 8 to 20 characters which contain at least one lowercase letter, one uppercase letter and one numeric digit'} );
        return;
    };
    const newUser = {
        "userName": req.body.userName,
        "password": req.body.password
    };
    const Q1 = "INSERT INTO users SET ?";
    sql.query(Q1, newUser, (err, mysqlres)=>{
        if(err){
            res.status(400).send("error in creating user" + err);
            console.log("error on creating user" +err);
            return;
        };
        console.log("created new user succesfully "+ newUser.userName +" "+ newUser.password);
        res.status(201).json(mysqlres);
        return;
    });
};

//Update user password function in the DB
const updatePassword = function (req, res) {
    if(!req.body){
        console.log("Body was empty");
        res.status(400).send({message: "content can not be empty"});
        return;
    };
    var updateUserPassword = {
        "userName": req.body.userName,
        "password": req.body.newPassword
    };
    let updateQuery = "UPDATE users SET password = ? WHERE userName = ?";
    let data = [updateUserPassword.password, updateUserPassword.userName];
    sql.query(updateQuery, data, (err,results, fields)=>{
        if(err){
            console.log("error is:" + err);
            res.status(400).send({message:"error in updating user password " + err});
            return;
        };
        console.log("row affected " + results.affectedRows);
        console.log("password updated "+ updateUserPassword.userName + " "+ updateUserPassword.password);
        res.status(201).json({message: "password changed"});
    });
};

module.exports = {createNewUser, updatePassword, signIn};