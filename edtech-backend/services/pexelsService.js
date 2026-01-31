const axios = require('axios');

const PEXELS_KEY = process.env.PEXELS_API_KEY || '';

async function fetchImages(query, perPage = 3) {
	// Replace with real Pexels API call. Return placeholders for now.
	return Array.from({ length: perPage }).map((_, i) => ({
		url: `https://images.example.com/${encodeURIComponent(query)}/${i + 1}.jpg`,
		caption: `${query} image ${i + 1}`,
	}));
}

module.exports = { fetchImages };