'use strict';
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;


const DeckSchema = mongoose.Schema({
  cards: [],
});

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {type: String, default: ''},
  lastName: {type: String, default: ''},
  decks: [DeckSchema]
});

UserSchema.methods.serialize = function() {
  return {
    username: this.username || '',
    firstName: this.firstName || '',
    lastName: this.lastName || '',
    id: this._id
  };
};

DeckSchema.methods.serialize = function() {
  return {
    cards: this.cards
  };
};

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};

const Deck = mongoose.model('Deck', DeckSchema);
const User = mongoose.model('User', UserSchema);

module.exports = {Deck, User};


// {username: "bruno", password: "dogdogdogdog"

// "username" : "jconnelly2", "password" : "$2a$10$Xtic3Ut.vHXpYjE14eQnAONVy5vdOYWnt/kFQYrXd.kU0Lvu7irPW", "lastName" : "Connelly", "firstName"

//Post with array of ID's
//Get after log in -- populate that property.
