//link: https://daniel-user-api.herokuapp.com/api
const dotenv = require('dotenv').config();
const HTTP_PORT = process.env.PORT || 8080;
const server = require('./server');

server.listen(HTTP_PORT, () => {
    console.log('Server running on port: ' + HTTP_PORT);
});
