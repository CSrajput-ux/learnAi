require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

// Import Database & Models
const { sequelize } = require('./models/index'); // New index file
const aiRoutes = require('./routes/aiRoutes');
const communityRoutes = require('./routes/communityRoutes');

const app = express();

app.use(express.json());
app.use(cors());

// Debug Middleware: Log all requests
app.use((req, res, next) => {
	console.log(`📡 [${req.method}] ${req.path}`);
	next();
});

// Test Route
app.get('/api/test', (req, res) => {
	res.json({ status: "Backend is Active and connected to SQLite!" });
});

// Public folder ko static banao taaki videos access ho sakein
app.use(express.static(path.join(__dirname, 'public')));

// Use Routes
app.use('/api/generate', aiRoutes);
app.use('/api/community', communityRoutes);

const PORT = process.env.PORT || 5000;

// Database Sync & Server Start
sequelize.sync({ alter: true }) // 'alter: true' se purane data ko delete kiye bina new columns add ho jayenge
	.then(() => {
		console.log("✅ All Tables Synced Successfully!");
		app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
	})
	.catch((err) => {
		console.error("❌ Database Sync Error:", err);
	});