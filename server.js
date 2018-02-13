'use strict';
//Initialize express, mongoose & middleware.
const bodyParser = require('body-parser');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');

const { router: deckRouter } = require('./deckrouter');
const { router: usersRouter } = require('./users');
const { router: authRouter, localStrategy, jwtStrategy } = require('./auth');

mongoose.Promise = global.Promise;

const {PORT, TEST_DATABASE_URL, CLIENT_ORIGIN} = require('./config');
const app = express();

//Send static files to client
app.use(express.static('public'));

//Logging with Morgan
app.use(morgan('common'));

//CORS function
app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

// Passport import
passport.use(localStrategy);
passport.use(jwtStrategy);

//Router re-route
app.use('/api/users/', usersRouter);
app.use('/api/auth/', authRouter);
app.use('/api/deck/', deckRouter);

const jwtAuth = passport.authenticate('jwt', { session: false });

app.get('/api/protected', jwtAuth, (req, res) => {
  return res.json({
    data: 'rosebud'
  });
});

app.use('*', (req, res) => {
  return res.status(404).json({ message: 'Not Found' });
});

//Server functions
let server;

function runServer() {
  return new Promise((resolve, reject) => {
    mongoose.connect(TEST_DATABASE_URL, err => {
      if (err) {
        return reject(err);
      }
      server = app
        .listen(PORT, () => {
          console.log(`Your app is listening on port ${PORT}`);
          resolve();
        })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };

