const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

// Access the API key
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.error("❌ Error: GEMINI_API_KEY is not set in .env file");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

async function listModels() {
    try {
        // For creating a model manager to list models
        // Note: In some SDK versions, listing models is done via a different path or not exposed directly in the main class
        // Let's try to infer if we can get it via the genAI instance or just brute force check common ones if the list method isn't obvious.
        // However, usually it's genAI.getGenerativeModel... 
        // There is no direct list method on GoogleGenerativeAI instance in the node SDK (checking docs memory).
        // Wait, there is a `model.listModels`? No.
        // The error message said: "Call ListModels to see the list of available models". 
        // This might refer to the REST API or a specific SDK method.

        // Let's try a direct REST call to be sure, as the SDK might wrap it or I might have the syntax slightly off for this specific version.

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const data = await response.json();

        if (data.models) {
            console.log("Found models:");
            data.models.forEach(m => {
                if (m.supportedGenerationMethods && m.supportedGenerationMethods.includes("generateContent")) {
                    console.log(`- ${m.name} (${m.displayName})`);
                }
            });
        } else {
            console.log("No models found or error structure:", data);
        }

    } catch (error) {
        console.error("Error listing models:", error);
    }
}

listModels();
