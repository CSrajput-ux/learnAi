const express = require('express');
const router = express.Router();
const notesCtrl = require('../controllers/notesController');
const quizCtrl = require('../controllers/quizController');
const videoCtrl = require('../controllers/videoController');

router.post('/notes', notesCtrl.generateNotes);
router.post('/quiz', quizCtrl.generateQuiz);
router.post('/video', videoCtrl.generateVideo);

module.exports = router;