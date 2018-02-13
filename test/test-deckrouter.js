'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const {app, runServer, closeServer} = require('../server');
const {Deck} = require('../deckrouter');

const expect = chai.expect;
chai.use(chaiHttp);


//Insert tests here.
