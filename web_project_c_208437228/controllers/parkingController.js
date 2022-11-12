const sql = require("../DB/db");

//Find a parkingLot by parkingLot name function
const findParkingLot = (req, res) => {

    if(!req.body){
        res.status(400).send({message:"search can not be empty"});
        return;
    };
    const parkingLot = req.query.searchName;

    sql.query("SELECT * FROM ParkingLot WHERE name like ?", "%" + parkingLot + "%", (err, results, fields)=>{
        if(err){
            console.log("ERROR IS:" + err);
            res.status(400).send("Somthing is wrong with query" + err);
            return;
        }
        if(!results.length) {
            
            return res.status(404).json({message: "Not Found"})
        }
        res.status(200).json({result: results[0].Address});
    });
};

//Function that shows all of the parkinglots
const getAllParkinglot = (req, res) => {
    if(!req.query){
        res.status(400).send({message:"search can not be empty"});
        return;
    };
    const radius = req.query.radius;
    const lat = req.query.lat;
    const long = req.query.long;
    console.log(radius, lat, long);

    const query = `SELECT * FROM ParkingLot `;
    sql.query(query,   (err, results, fields)=>{
        if(err){
            console.log("ERROR IS:" + err);
            res.status(400).send("Somthing is wrong with query" + err);
            return;
        }
        if(!results.length) {
            
            return res.status(404).json({message: "Not Found"})
        }
        console.log(results);
        res.status(200).json({result: results});
    });
}

//Function that check if parking available in the parkinglot and update the specific parking lot data if there is a new user in the parking 
const userParking = (req, res) => {
    if(!req.body) {
        res.status(400).send({message:"Invalid request"});
        return;
    };
    console.log(req.body );
    let emptyParkingNum = `numOf${toTitleCase(req.body.carType)}EmptyParkings`;
    const query = `SELECT ${emptyParkingNum} FROM ParkingLot WHERE Name = ?`;
    sql.query(query, [req.body.parkinglotName],  (err, results, fields)=>{
        if(err){
            console.log("ERROR IS:" + err);
            res.status(400).send("Somthing is wrong with query" + err);
            return;
        };
        if(results[0][emptyParkingNum] == 0) {
            return res.status(404).json({message: "Not Parking Available", success: false})
        } else {
            const updateQuery = `Update ParkingLot Set ${emptyParkingNum} = ${emptyParkingNum} - 1 WHERE Name = ?`;
            sql.query(updateQuery, [req.body.parkinglotName], (updateErr, updateResult) => {
                if(updateErr){
                    console.log("ERROR IS:" + err);
                    res.status(400).send("Somthing is wrong with query" + err);
                    return;
                } else {
                    console.log(results);
                    res.status(200).json({message: "You can park", success: true});
                };
            });
        };
    });
};

//Function that update the specific parking lot data if there is a user that leave the parking and there is a new empty parking 
const leaveParking = (req, res) => {
    if(!req.body) {
        res.status(400).send({message:"Invalid request"});
        return;
    };

    let emptyParkingNum = `numOf${toTitleCase(req.body.carType)}EmptyParkings`;
    
    console.log(req.body.parkinglotName);
    const updateQuery = `Update ParkingLot Set ${emptyParkingNum} = ${emptyParkingNum} + 1 WHERE Name = ?`;
            sql.query(updateQuery, [req.body.parkinglotName], (updateErr, updateResult) => {
                if(updateErr){
                    console.log("ERROR IS:" + err);
                    res.status(400).send("Somthing is wrong with query" + err);
                    return;
                } else {
                    console.log(updateResult);
                    res.status(200).json({message: "You can park", success: true});
                }
            })
}

function toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  };

module.exports = {findParkingLot, getAllParkinglot, userParking, leaveParking}