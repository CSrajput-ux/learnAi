const axios = require('axios');

const API_KEY = process.env.GEMINI_API_KEY || '';

async function generateText(prompt) {
	// ...existing code...
	// Replace this stub with real Gemini call. For now return prompt echo.
	return `Generated content for prompt: ${prompt}`;
}

module.exports = { generateText };