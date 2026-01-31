const { GoogleGenerativeAI } = require("@google/generative-ai");
const { AiVideo } = require('../models/index'); // SQL Model import
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

exports.generateVideo = async (req, res) => {
	try {
		const { topic, userId, duration } = req.body; // Frontend se Topic aur UserID aayega

		// Simple validation
		if (!topic || !userId) {
			return res.status(400).json({ error: "Topic and UserID are required" });
		}

		const durationVal = duration || '5';

		console.log(`🎬 Generating Video Logic for: ${topic}`);

		// --- 1. AI Model se Python Script likhwana ---
		const model = genAI.getGenerativeModel({ model: "models/gemini-2.5-pro" });
		// ya "models/gemini-pro-latest" jo tumhe stable lage

		// ya phir "models/gemini-pro-latest"


		// Prompt mein hum strict rules denge taaki error na aaye
		const prompt = `
			Act as a Manim expert. Write a Python script to explain: "${topic}".
      
			RULES:
			1. Class name must be 'EduScene'.
			2. Inherit from 'Scene'.
			3. Use minimal text and simple geometric shapes (Square, Circle) or Text.
			4. EXTREMELY IMPORTANT: Keep 'run_time' strictly around ${durationVal} seconds.
			5. Do NOT use external images or complex LaTeX. Use Text() instead of MathTex().
			6. Output ONLY raw Python code. No markdown.

			Example structure:
			from manim import *
			class EduScene(Scene):
					def construct(self):
							title = Text("${topic}", font_size=40)
							self.play(Write(title))
							self.wait(1)
		`;

		const result = await model.generateContent(prompt);
		const pythonCode = result.response.text().replace(/```python|```/g, "").trim();

		// --- 2. Temporary File Setup ---
		const timestamp = Date.now();

		// Temp folder create karo agar nahi hai
		const tempDir = path.join(__dirname, '../temp');
		if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

		// Python code ko file mein save karo
		const scriptName = `script_${timestamp}`;
		const pythonFilePath = path.join(tempDir, `${scriptName}.py`);
		fs.writeFileSync(pythonFilePath, pythonCode);

		// --- 3. Manim Execute karna ---
		// Output folder: backend/public/videos
		const publicDir = path.join(__dirname, '../public');
		const outputDir = path.join(publicDir, 'videos');

		if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

		// Video ka naam
		const videoFileName = `video_${timestamp}.mp4`;

		// Command: manim -ql (low quality = fast) -o filename --media_dir output_folder script.py ClassName
		// Note: Manim ka folder structure thoda complex hota hai, wo automatically subfolders banata hai.
		const command = `manim -ql -o "${videoFileName}" --media_dir "${publicDir}" "${pythonFilePath}" EduScene`;

		console.log("⚙️  Running Manim... (Isme thoda time lagega)");

		// Child Process run karna
		exec(command, async (error, stdout, stderr) => {
			// Cleanup: Python file delete kar do
			try { fs.unlinkSync(pythonFilePath); } catch (e) { }

			if (error) {
				console.error(`❌ Manim Error: ${error.message}`);
				// Agar Manim fail ho jaye toh user ko batao
				return res.status(500).json({ error: "Video generation failed. Check server logs." });
			}

			console.log("✅ Manim Render Complete!");

			// --- 4. File Path Set Karna ---
			// Manim usually yahan file banata hai: /public/videos/{script_name}/480p15/{video_name}.mp4
			// Hamein ye URL frontend ko dena hai.

			// Path logic (Windows/Linux compatible)
			const relativePath = `/videos/${scriptName}/480p15/${videoFileName}`;

			// --- 5. Database mein Save karna ---
			try {
				const savedVideo = await AiVideo.create({
					topic: topic,
					videoUrl: relativePath, // Frontend is URL ko play karega
					duration: `${durationVal} sec`,
					userId: userId,
					script: { code: pythonCode } // Future reference ke liye script bhi save kar li
				});

				// Success Response
				res.json({
					success: true,
					message: "Video Generated Successfully!",
					data: savedVideo
				});

			} catch (dbError) {
				console.error("Database Save Error:", dbError);
				res.status(500).json({ error: "Video bani par DB mein save nahi hui." });
			}
		});

	} catch (error) {
		console.error("Server Error:", error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};