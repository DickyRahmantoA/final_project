const express = require('express');
const multer = require('multer');
const UserController = require('../controllers/UserController');

const userRoute = express.Router();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
});

const upload = multer({ storage: fileStorage });

userRoute.post('/register', upload.single('image'), UserController.register);
userRoute.post('/login', UserController.login);

module.exports = userRoute;
