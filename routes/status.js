const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Bot en ligne 🚀');
});

router.get('/status', (req, res) => {
  res.json({ status: 'online' });
});

module.exports = router;
