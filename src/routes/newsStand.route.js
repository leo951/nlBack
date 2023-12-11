const express = require('express');
const router = express.Router();
const newsStand = require('../controllers/newsStand.model');
const verifyToken = require('../middlewares/verifyToken');

router.post('/newsStand', verifyToken, newsStand.createNewsStand);

router.put('/newsStand/update', verifyToken, newsStand.updateNewsStand);

router.get('/newsStand/:id', verifyToken, newsStand.getNewsStand);
router.get('/newsStands', verifyToken, newsStand.getNewsStands);
router.get('/newsStand/delete/:id', verifyToken, newsStand.deleteNewsStand);

module.exports = router;