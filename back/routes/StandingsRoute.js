const express = require('express');
const router = express.Router();
const { getStandings } = require('../Controllers/StandingsController');

router.get('/', getStandings);

module.exports = router;
