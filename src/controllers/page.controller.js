const Page = require("../models/page.model");

const moment = require("moment");

exports.createPage = (req, res) => {
  const createDate = moment();

  const page = new Page({
    number: req.body.number,
    title: req.body.title,
    content: req.body.content,
    createDate: createDate.format("DD-MM-YYYY HH:mm:ss"),
    updateDate: createDate.format("DD-MM-YYYY HH:mm:ss"),
  });

  page
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

exports.getPage = (req, res) => {
  Page.findById(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: `Your page ${req.params.id} was not found`,
        });
      }
      return res.status(200).send({
        data: data,
      });
    })
    .catch((err) => res.send(err));
};

exports.getPages = (req, res) => {
  Page.find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.updatePage = (req, res) => {
  const updateDate = moment();

  req.body.updateDate = updateDate.format("DD-MM-YYYY HH:mm:ss");
  
  Page.findByIdAndUpdate(req.body.id, req.body, {
    new: true,
  })
    .then((data) => {
      res.status(200).json({ data: data });
    })
    .catch((err) => res.status(500).json({ err: err }));
};

exports.deletePage = (req, res) => {
  Page.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        message: "Page deleted successfully !",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
