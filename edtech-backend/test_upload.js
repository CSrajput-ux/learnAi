const axios = require('axios');

async function testUpload() {
    try {
        const noteData = {
            title: "Test Note from Script",
            description: "Testing backend upload functionality",
            subject: "Physics",
            classLevel: "Class 12",
            authorName: "DebugBot"
        };

        console.log("Attempting upload...");
        const res = await axios.post('http://localhost:5000/api/community/upload', noteData);
        console.log("✅ Upload Success:", res.data);
    } catch (error) {
        console.error("❌ Upload Failed:", error.message);
        if (error.response) {
            console.error("Response Data:", error.response.data);
        }
    }
}

testUpload();
