const { Schema } = require('mongoose');
const config = require('./config');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        default: "https://res.cloudinary.com/dzqbzqgjw/image/upload/v1589788981/default_user_image_zqjqjy.png"
    },
});

module.exports = config.database.model('User', userSchema);