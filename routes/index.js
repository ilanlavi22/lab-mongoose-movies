const express = require('express');
const router = new express.Router()

// Handle GET request for website root
router.get('/', (req, res) => {
  res.render('index', { pageHome: true });
})

module.exports = router;
