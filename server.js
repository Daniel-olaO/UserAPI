const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/users');

const app = express();

app.use(express.json());
app.use(cors('*'));

app.use('/api/users', userRouter);   // user api routes

app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome to the API'
    });
});

module.exports = app;