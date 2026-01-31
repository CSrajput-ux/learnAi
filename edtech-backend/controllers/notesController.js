require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const Note = require('../models/Note');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.generateNotes = async (req, res) => {
	try {
		const { topic } = req.body;
		if (!topic) return res.status(400).json({ success: false, message: "Topic is required" });

		const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

		const prompt = `
      Act as an expert teacher. Create detailed, exam-oriented notes for the topic: "${topic}".

      CRITICAL: Return the response ONLY as a valid JSON object with this exact structure:
      {
        "title": "Topic Name",
        "intro": "A comprehensive introduction paragraph...",
        "definition": "Formal definition of the concept...",
        "chemicalEquation": "Chemical equation if applicable (e.g., for Photosynthesis), otherwise null",
        "keyPoints": [
            { "icon": "check", "title": "Key Point Title", "text": "Detail about this point..." },
            { "icon": "check", "title": "Key Point Title", "text": "Detail about this point..." }
        ],
        "mainStages": [
            { "title": "Stage 1 Name", "points": ["Detail 1", "Detail 2"] },
            { "title": "Stage 2 Name", "points": ["Detail 1", "Detail 2"] }
        ],
        "realWorldExamples": [
            { "title": "Example Name", "text": "How it applies in real life..." }
        ],
        "examTips": ["Tip 1", "Tip 2", "Tip 3"]
      }

      Do not add markdown formatting like \`\`\`json. Just raw JSON.
    `;

		const result = await model.generateContent(prompt);
		const response = await result.response;
		const text = response.text().replace(/```json|```/g, "").trim();
		const notesData = JSON.parse(text);

		const savedNote = await Note.create({
			topic,
			content: notesData
		});

		return res.status(201).json({
			success: true,
			message: "Notes Generated Successfully",
			data: savedNote
		});
	} catch (error) {
		console.error("AI Notes Error:", error);
		return res.status(500).json({
			success: false,
			message: "Failed to generate notes. Please try again.",
			error: error.message
		});
	}
};