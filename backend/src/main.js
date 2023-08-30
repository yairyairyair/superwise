const express = require('express');
const cors = require('cors');
const recallRouter = require('./recall-router');

const FRONTEND_ORIGIN = 'http://localhost:5173';

const app = express().set('etag', false).set('x-powered-by', false);


// set cors here to allow frontend requests
app.use(cors({ origin: FRONTEND_ORIGIN }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/recall', recallRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Unknown server error');
});


app.listen(3000);