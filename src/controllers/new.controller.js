const New = require("../models/new.model");

const moment = require("moment");

exports.createNew = (req, res) => {
  const createDate = moment();

  const isNew = new New({
    title: req.body.title,
    pages: req.body.pages,
    icon: req.body.icon,
    createDate: createDate.format("DD-MM-YYYY HH:mm:ss"),
    updateDate: createDate.format("DD-MM-YYYY HH:mm:ss"),
  });

  isNew
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

exports.getNew = (req, res) => {
  New.findById(req.new.id)
    //   .populate("page")
    .then((data) => {
      if (!data) {
        res.status(500).send({
          message: `Your new ${req.body.id} was not found`,
        });
      }
      return res.status(200).send({
        data: data,
      });
    })
    .catch((err) => res.send(err));
};

exports.getNews = (req, res) => {
  New.find()
    //   .populate("page")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.updateNew = (req, res) => {
  New.findByIdAndUpdate(req.new.id, req.body, {
    new: true,
  })
    .then((data) => {
      res.status(200).json({ data: data });
    })
    .catch((err) => res.status(500).json({ err: err }));
};

exports.deleteNew = (req, res) => {
  New.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        message: "New deleted successfully !",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
