const express = require('express');
const router = express.Router();
const userRouter = require('./user.route');
const newsStandRouter = require('./newsStand.route');

router.use(userRouter, newsStandRouter);

module.exports = router;