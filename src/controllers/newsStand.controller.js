const NewsStand = require("../models/newsStand.model");

const moment = require("moment");

exports.createNewsStand = (req, res) => {
  const createDate = moment();

  const newsStand = new NewsStand({
    title: req.body.title,
    news: req.body.news,
    icon: req.body.icon,
    color: req.body.color,
    createDate: createDate.format("DD-MM-YYYY HH:mm:ss"),
    updateDate: createDate.format("DD-MM-YYYY HH:mm:ss"),
  });

  newsStand
    .save()
    .then((data) => {
      res.status(201).send({
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Vous avez une erreur",
      });
    });
};

exports.getNewsStands = (req, res) => {
  NewsStand.find()
    .populate("news")
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: `Your newsStand ${req.newsStand.id} was not found`,
        });
      }
      return res.status(200).send({
        data: data,
      });
    })
    .catch((err) => res.send(err));
};

exports.getNewsStand = (req, res) => {
  NewsStand.findById(req.params.id)
    .populate("news")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.updateNewsStand = (req, res) => {
  const updateDate = moment();

  req.body.updateDate = updateDate.format("DD-MM-YYYY HH:mm:ss");

  NewsStand.findByIdAndUpdate(req.body.id, req.body, {
    new: true,
  })
    .then((data) => {
      res.status(200).json({ data: data });
    })
    .catch((err) => res.status(500).json({ err: err }));
};

exports.deleteNewsStand = (req, res) => {
  NewsStand.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        message: "NewsStand deleted successfully !",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
