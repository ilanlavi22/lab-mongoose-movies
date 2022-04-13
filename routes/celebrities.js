const express = require('express');
const Celebrity = require('../models/celebrity');
const router = new express.Router();


// get all celebrities

router.get('/celebrities', (req, res, next) => {
  Celebrity.find().sort({ createdAt: -1 })
    .then(celebrities => {
      res.render('celebrities/', { pageCeleb: true, celebrities });
    })
    .catch(error => {
      next(error)
    })
})

// create celebrity GET

router.get('/celebrities/create', (req, res, next) => {
  res.render('celebrities/create', { pageCreate: true });
})

// create celebrity POST

router.post('/celebrities/create/', (req, res, next) => {
  const data = req.body;
  Celebrity.create(data)
    .then(() => {
      res.status(302).redirect('/celebrities');
    })
    .catch((error) => {
      res.render('celebrities/create', { pageCreate: true });
      next(error);
    })
})

// find celebrity GET

router.get('/celebrities/:id', (req, res, next) => {
  const { id } = req.params;
  Celebrity.findById(id)
    .then(celebrity => {
      res.render('celebrities/show', { pageCeleb: true, celebrity })
    })
    .catch(error => {
      next(error)
    })
})

// edit celebrity GET
router.get('/celebrities/:id/edit', (req, res, next) => {
  const { id } = req.params;
  Celebrity.findOne({ _id: id })
    .then(celebrity => {
      res.render('celebrities/edit', { celebrity });
    })
})

// edit celebrity POST
router.post('/celebrities/:id/edit', (req, res, next) => {
  const { id } = req.params;
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.findByIdAndUpdate(id, { name, occupation, catchPhrase })
    .then(() => {
      res.status(302).redirect('/celebrities');
    })
})

// delete celebrity POST

router.post('/celebrities/:id/delete', (req, res, next) => {
  const { id } = req.params;
  const { data } = req.body;
  Celebrity.updateOne({ _id: id, data })
    .then(() => {
      res.status(302).redirect('/celebrities');
    })
    .catch((error) => {
      next(error);
    })
})

module.exports = router