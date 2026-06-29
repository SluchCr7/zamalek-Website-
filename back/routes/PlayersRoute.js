const express = require('express');
const route = express.Router();
const {
    getPlayers,
    getPlayerById
} = require('../Controllers/PlayersController');

route.route('/')
    .get(getPlayers);

route.route('/:id')
    .get(getPlayerById);

module.exports = route;
