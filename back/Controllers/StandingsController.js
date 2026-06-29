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
 * @route   GET /api/standings
 * @desc    Get league standings
 * @access  Public
 */
const getStandings = asyncHandler(async (req, res) => {
    const league = req.query.league || '1040'; // Default: Egyptian Premier League
    const season = req.query.season || '2024';

    const cacheKey = `standings_${league}_${season}`;
    const cachedStandings = cache.get(cacheKey);

    if (cachedStandings) {
        return res.status(200).json(cachedStandings);
    }

    try {
        const response = await axios.get(`${API_BASE_URL}/standings`, {
            headers: getHeaders(),
            params: {
                league,
                season
            }
        });

        if (response.data.errors && Object.keys(response.data.errors).length > 0) {
            return res.status(400).json({ message: "API Error", errors: response.data.errors });
        }

        const standings = response.data.response[0]?.league?.standings[0] || [];
        cache.set(cacheKey, standings);

        res.status(200).json(standings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

module.exports = {
    getStandings
};
