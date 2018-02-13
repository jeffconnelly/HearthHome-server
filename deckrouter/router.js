'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const {Deck, User} = require('../users/models');

const router = express.Router();

const jsonParser = bodyParser.json();


router.post('/', jsonParser, (req, res) => {
  console.log(req.body);
  let { deck, id } = req.body;
  console.log(deck);
  User.findOneAndUpdate(
    {_id: id}, 
    {'$push':{'decks': {cards:deck}}})
    .then(res => res.status(201).json);
});

module.exports = {router};
