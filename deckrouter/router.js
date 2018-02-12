'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const {Deck, User} = require('../users/models');

const router = express.Router();

const jsonParser = bodyParser.json();


router.post('/', jsonParser, (req, res) => {
  console.log(req.body);
});


module.exports = {router};
