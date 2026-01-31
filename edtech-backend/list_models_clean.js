const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');
require('dotenv').config();

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    console.error("No API KEY");
    process.exit(1);
}

async function listModels() {
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();

        let output = "Available Models:\n";
        if (data.models) {
            data.models.forEach(m => {
                if (m.supportedGenerationMethods && m.supportedGenerationMethods.includes("generateContent")) {
                    output += `- ${m.name}\n`;
                }
            });
        } else {
            output += "No models found in response.\n";
            output += JSON.stringify(data, null, 2);
        }

        fs.writeFileSync('models_clean.txt', output, 'utf8');
        console.log("Written to models_clean.txt");

    } catch (error) {
        console.error("Error listing models:", error);
        fs.writeFileSync('models_clean.txt', `Error: ${error.message}`, 'utf8');
    }
}

listModels();
