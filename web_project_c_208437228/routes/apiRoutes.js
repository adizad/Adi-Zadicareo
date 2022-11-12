const router = require('express').Router();
const authController = require('../controllers/authController');
const parkingController = require('../controllers/parkingController');
const CreateDB = require('../DB/CreateDB');
const fs = require('fs');

router.post('/createNewUser', authController.createNewUser);
router.post('/updatePassword', authController.updatePassword);
router.post('/signin', authController.signIn);

router.get('/findParkingLot', parkingController.findParkingLot);
router.get('/getAllParkinglot', parkingController.getAllParkinglot);
router.put('/userParking', parkingController.userParking);
router.put('/leaveParking', parkingController.leaveParking);

module.exports = router