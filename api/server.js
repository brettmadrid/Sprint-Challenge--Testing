const express = require('express');

const hobbits = require('../games/gamesModel.js');

const server = express();

server.use(express.json());