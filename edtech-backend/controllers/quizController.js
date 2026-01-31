const { GoogleGenerativeAI } = require("@google/generative-ai");
const Quiz = require('../models/Quiz');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.generateQuiz = async (req, res) => {
	try {
		const { topic } = req.body;
		if (!topic) return res.status(400).json({ success: false, message: "Topic is required" });

		const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

		const prompt = `
      Create a 5-question MCQ quiz for the topic: "${topic}".
      Return ONLY a JSON Array with this structure:
      [
        {
          "question": "Question text?",
          "options": ["Option A", "Option B", "Option C", "Option D"],
          "correctAnswer": "Option A",
          "explanation": "Brief explanation why A is correct."
        }
      ]
      Do not add markdown formatting like \`\`\`json.
    `;

		const result = await model.generateContent(prompt);
		const response = await result.response;
		const text = response.text().replace(/```json|```/g, "").trim();
		const quizData = JSON.parse(text);

		const savedQuiz = await Quiz.create({
			topic: topic,
			questions: quizData
		});

		return res.status(201).json({
			success: true,
			message: "Quiz Generated Successfully",
			data: savedQuiz
		});
	} catch (error) {
		console.error("Quiz Error:", error);
		return res.status(500).json({ success: false, error: "Failed to generate quiz" });
	}
};