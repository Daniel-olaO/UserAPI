//user controllers
const multer = require("multer");
const jwt = require("jsonwebtoken");
const passportJWT = require("passport-jwt");
const { GridFsStorage } = require("multer-gridfs-storage");
const  UserRepository = require('../repositories/userRepository.js');
const dbConfig = require('../models/config.js');
/**
 * Controllers functions that handle user related requests
 * @param {Request} req - Request object
 * @param {Response} res - Response object
 * @param {Function} next - Callback function
 * @returns {Object} - Response object
 */


//middleware for profile image upload
const storage = new GridFsStorage({
    url: dbConfig.url + dbConfig.database,
    file: (req, file) => {
        const match = ["image/png", "image/jpeg"];
        if (match.indexOf(file.mimetype) === -1) {
            const filename = `${Date.now()}-${file.originalname}`;
            return filename;
        }
    }
});
//mddleware for JWT
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}

var strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
    console.log('payload received', jwt_payload);
    
    if (jwt_payload.id) {
        next(null, { id: jwt_payload.id, name: jwt_payload.name });
    } else {
        next(null, false);
    }
});

var upload = multer({ storage: storage });
const uerRepository = new UserRepository(); 


module.exports = {
    createUser: async(req, res, next) => {
        try {
            const user = await uerRepository.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            next(error);
        }
    },
    getAllUsers: async(req, res, next) => {
        try {
            const users = await uerRepository.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    },
    loginUser: async(req, res, next) => {
        try {
            const user = await uerRepository.loginUser(req.body);
            
            if (user) {
                let payload = {
                    _id: user._id,
                    username: user.username,
                }
                let token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });           
                res.json({
                    success: true,
                    message: 'Authentication successful!',
                    token: token
                });
            } else {
                res.status(401).json({
                    success: false,
                    message: 'Incorrect username or password'
                });
            }
        } catch (error) {
            next(error);
        }
    },
    updateUserProfile: async(req, res, next) => {
        try {
            await upload(req, res);
            if(req.file === undefined) {
                throw new Error('No file uploaded');
            }
            res.status(200).json({"message": "File uploaded successfully"});
        } catch (error) {
            next(error);
        }
    },
    deleteUser: async(req, res, next) => {
        try {
            await uerRepository.deleteUser(req.params.id);
            res.status(200).json({"message": "User deleted successfully"});
        } catch (error) {
            next(error);
        }
    }
}