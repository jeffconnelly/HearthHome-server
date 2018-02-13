'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const {Deck, User} = require('../users/models');
const router = express.Router();
const jsonParser = bodyParser.json();


//Sends user saved decks when they login
router.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => res.status(200).send(user))
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'something went wrong' });
    });
});

//Saves user deck to that specific user
router.post('/', jsonParser, (req, res) => {
  console.log(req.body);
  let { deck, id } = req.body;
  console.log(deck);
  User.findOneAndUpdate(
    {_id: id}, 
    {'$push':{'decks': {cards:deck}}})
    .then(res => res.status(201).json);
});


//Update user deck



//Delete user deck
//We will have to find user by id, then match the associated deck id,
//then delete that property!
router.delete('/:id', (req, res) => {
  console.log('DELETE:', req.param.id);
  User
    .findByIdAndRemove(req.params.id)
    .then(() => res.status(204).end())
    .catch(err => res.status(500).json({ message: 'Internal server error' }));
});

module.exports = {router};
