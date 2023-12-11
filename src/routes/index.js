const express = require('express');
const router = express.Router();
const userRouter = require('./user.route');
const newsStandRouter = require('./newsStand.route');
const newRouter = require("./new.route")
const pageRouter = require("./page.route")

router.use(userRouter, newsStandRouter, newRouter, pageRouter);

module.exports = router;