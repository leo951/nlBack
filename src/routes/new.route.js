const express = require('express');
const router = express.Router();
const isNew = require('../controllers/new.controller');
const verifyToken = require('../middlewares/verifyToken');

router.post('/new', verifyToken, isNew.createNew);

router.put('/new/update', verifyToken, isNew.updateNew);

router.get('/new/:id', verifyToken, isNew.getNew);
router.get('/news', verifyToken, isNew.getNews);
router.get('/new/delete/:id', verifyToken, isNew.deleteNew);

module.exports = router;