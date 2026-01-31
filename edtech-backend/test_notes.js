const axios = require('axios');

async function testNotes() {
    try {
        const data = {
            topic: "Photosynthesis"
        };

        console.log("Attempting to generate notes for:", data.topic);
        console.log("Endpoint: http://localhost:5000/api/generate/notes");

        // Note: server.js mounts aiRoutes at /api/generate
        // aiRoutes.js has router.post('/notes', ...)
        // So full URL is http://localhost:5000/api/generate/notes

        const res = await axios.post('http://localhost:5000/api/generate/notes', data);
        console.log("✅ Notes Generation Success!");
        // console.log("Data:", JSON.stringify(res.data, null, 2));
    } catch (error) {
        console.error("❌ Notes Generation Failed!");
        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Response Data:", JSON.stringify(error.response.data, null, 2));
        } else {
            console.error("Error Message:", error.message);
        }
    }
}

testNotes();
