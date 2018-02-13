'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const {Deck, User} = require('../users/models');
const mongoose = require('mongoose');
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

//Delete user deck

router.delete('/:id', (req, res) => {
  User
    .findOne({'decks._id': mongoose.Types.ObjectId(req.params.id)})
    .then((user) => {
      const deck = user.decks.id(req.params.id).remove();
      return user.save();   
    })
    .then(() => res.status(204).end());
});


module.exports = {router};
