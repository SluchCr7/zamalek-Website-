const asyncHandler = require('express-async-handler');
const axios = require('axios');
const NodeCache = require('node-cache');

// Cache for 1 hour (3600 seconds)
const cache = new NodeCache({ stdTTL: 3600 });

const API_BASE_URL = 'https://v3.football.api-sports.io';

const getHeaders = () => {
    return {
        'x-apisports-key': process.env.X_APISPORTS_KEY,
    };
};

/**
 * @route   GET /api/fixtures
 * @desc    Get team fixtures with full statistics
 * @access  Public
 */
const getFixtures = asyncHandler(async (req, res) => {
    const team = req.query.team || '1040'; // Default: Zamalek
    const season = req.query.season || '2024';

    const cacheKey = `fixtures_${team}_${season}`;
    const cachedFixtures = cache.get(cacheKey);

    if (cachedFixtures) {
        return res.status(200).json(cachedFixtures);
    }

    try {
        const response = await axios.get(`${API_BASE_URL}/fixtures`, {
            headers: getHeaders(),
            params: {
                team,
                season
            }
        });

        if (response.data.errors && Object.keys(response.data.errors).length > 0) {
            return res.status(400).json({ message: "API Error", errors: response.data.errors });
        }

        const data = response.data.response;
        cache.set(cacheKey, data);

        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

/**
 * @route   GET /api/fixtures/stats/:id
 * @desc    Get match statistics for a fixture
 * @access  Public
 */
const getFixtureStats = asyncHandler(async (req, res) => {
    const fixtureId = req.params.id;

    const cacheKey = `fixture_stats_${fixtureId}`;
    const cachedStats = cache.get(cacheKey);

    if (cachedStats) {
        return res.status(200).json(cachedStats);
    }

    try {
        const response = await axios.get(`${API_BASE_URL}/fixtures/statistics`, {
            headers: getHeaders(),
            params: {
                fixture: fixtureId
            }
        });

        if (response.data.errors && Object.keys(response.data.errors).length > 0) {
            return res.status(400).json({ message: "API Error", errors: response.data.errors });
        }

        const data = response.data.response;
        cache.set(cacheKey, data);

        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

module.exports = {
    getFixtures,
    getFixtureStats
};
