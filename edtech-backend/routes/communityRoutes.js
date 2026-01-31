const express = require('express');
const router = express.Router();
const CommunityNote = require('../models/CommunityNote');

// Upload Note
router.post('/upload', async (req, res) => {
  try {
    const note = await CommunityNote.create(req.body);
    res.json({ success: true, message: "Note Uploaded!", data: note });
  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({ error: "Upload Failed" });
  }
});

// Get All Notes
router.get('/', async (req, res) => {
  try {
    const notes = await CommunityNote.findAll({ order: [['createdAt', 'DESC']] });
    res.json(notes);
  } catch (error) {
    console.error('Fetch Error:', error);
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
});

module.exports = router;
