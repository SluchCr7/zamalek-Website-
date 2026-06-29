const express = require('express');
const router = express.Router();
const { getFixtures, getFixtureStats } = require('../Controllers/FixturesController');

router.get('/', getFixtures);
router.get('/stats/:id', getFixtureStats);

module.exports = router;
