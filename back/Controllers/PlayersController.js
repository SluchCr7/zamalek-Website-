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
 * @route   GET /api/players
 * @desc    Get team players (paginated aggregation)
 * @access  Public
 */
const getPlayers = asyncHandler(async (req, res) => {
    const team = req.query.team || '1040'; // Default: 1040 (Zamalek)
    const season = req.query.season || '2024'; // Default: 2024

    const cacheKey = `players_${team}_${season}`;
    const cachedPlayers = cache.get(cacheKey);

    if (cachedPlayers) {
        return res.status(200).json(cachedPlayers);
    }

    try {
        let allPlayers = [];
        let currentPage = 1;
        let totalPages = 1;

        do {
            const response = await axios.get(`${API_BASE_URL}/players`, {
                headers: getHeaders(),
                params: {
                    team,
                    season,
                    page: currentPage
                }
            });

            if (response.data.errors && Object.keys(response.data.errors).length > 0) {
                return res.status(400).json({ message: "API Error", errors: response.data.errors });
            }

            const pageData = response.data.response;
            if (!pageData) break;

            // Map clean data
            const mappedPageData = pageData.map(item => {
                const p = item.player;
                const stats = item.statistics[0] || {};
                return {
                    id: p.id,
                    name: p.name,
                    age: p.age,
                    photo: p.photo,
                    nationality: p.nationality,
                    position: stats.games?.position || 'Unknown',
                    appearances: stats.games?.appearences || 0,
                    goals: stats.goals?.total || 0,
                    assists: stats.passes?.accuracy || stats.goals?.assists || 0 // Sometimes assists are in goals, sometimes empty
                };
            });

            allPlayers = [...allPlayers, ...mappedPageData];

            const paging = response.data.paging;
            totalPages = paging.total;
            currentPage++;

            // To avoid hitting rate limits too quickly, we might want a small delay but APISports allows a burst

        } while (currentPage <= totalPages);

        cache.set(cacheKey, allPlayers);

        res.status(200).json(allPlayers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

/**
 * @route   GET /api/players/:id
 * @desc    Get Single Player Details
 * @access  Public
 */
const getPlayerById = asyncHandler(async (req, res) => {
    const playerId = req.params.id;
    const season = req.query.season || '2024';

    const cacheKey = `player_${playerId}_${season}`;
    const cachedPlayer = cache.get(cacheKey);

    if (cachedPlayer) {
        return res.status(200).json(cachedPlayer);
    }

    try {
        const response = await axios.get(`${API_BASE_URL}/players`, {
            headers: getHeaders(),
            params: {
                id: playerId,
                season
            }
        });

        if (response.data.errors && Object.keys(response.data.errors).length > 0) {
            return res.status(400).json({ message: "API Error", errors: response.data.errors });
        }

        const data = response.data.response;

        if (!data || data.length === 0) {
            return res.status(404).json({ message: 'Player not found' });
        }

        const playerInfo = data[0];

        cache.set(cacheKey, playerInfo);

        res.status(200).json(playerInfo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

module.exports = {
    getPlayers,
    getPlayerById
};
