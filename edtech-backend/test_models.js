const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

async function listModels() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    try {
        // There isn't a direct listModels method on the client instance in some versions, 
        // but usually it's available via a specific manager or we just try a known model.
        // Actually, checking the docs or source code would be better, but let's try a simple generation test 
        // with a few common model names if listing isn't straightforward.
        // Wait, the error message said: "Call ListModels to see the list of available models"
        // This implies there is an API for it. 
        // In @google/generative-ai, it might not be directly exposed in the high-level helper, 
        // but the error message comes from the backend.

        // Let's try to just use 'gemini-pro' as a fallback test if flash fails.
        console.log("Testing model: gemini-1.5-flash");
        const modelFlash = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        try {
            const resultFlash = await modelFlash.generateContent("Hello");
            console.log("✅ gemini-1.5-flash works!");
        } catch (e) {
            console.error("❌ gemini-1.5-flash failed:", e.message);
        }

        console.log("\nTesting model: gemini-pro");
        const modelPro = genAI.getGenerativeModel({ model: "gemini-pro" });
        try {
            const resultPro = await modelPro.generateContent("Hello");
            console.log("✅ gemini-pro works!");
        } catch (e) {
            console.error("❌ gemini-pro failed:", e.message);
        }

    } catch (error) {
        console.error("Error:", error);
    }
}

listModels();
