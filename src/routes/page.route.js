const express = require('express');
const router = express.Router();
const page = require('../controllers/page.controller');
const verifyToken = require('../middlewares/verifyToken');

router.post('/page', verifyToken, page.createPage);

router.put('/page/update', verifyToken, page.updatePage);

router.get('/page/:id', verifyToken, page.getPage);
router.get('/pages', verifyToken, page.getPages);
router.get('/page/delete/:id', verifyToken, page.deletePage);

module.exports = router;