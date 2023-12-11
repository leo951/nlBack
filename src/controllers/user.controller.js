const User = require("../models/user.model");
const configs = require("../configs/jwt.config");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.createUser = (req, res) => {
  const hasedPassword = bcrypt.hashSync(req.body.password, 10);

  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hasedPassword,
    profilePicture: req.body.profilePicture,
    mindSet: req.body.mindSet,
    dayNote: req.body.dayNote,
    newsStands: req.body.newsStands,
    isAdmin: req.body.isAdmin || false,
  });

  user
    .save()
    .then((data) => {
      let userToken = jwt.sign(
        {
          id: data._id,
          isAdmin: data.isAdmin,
          auth: true,
        },
        configs.jwt.secret,
        {
          expiresIn: 86400,
        }
      );
      res.send({
        token: userToken,
        auth: true,
      });
    })
    .catch((err) => {
      res.status(500).send({
        code: 500,
        message: err.message || "Vous avez une erreur",
      });
    });
};

exports.login = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          message: "password not valid",
          auth: false,
          token: null,
        });
      } else {
        let userToken = jwt.sign(
          {
            id: user._id,
            isAdmin: user.isAdmin,
          },
          configs.jwt.secret,
          {
            expiresIn: 86400,
          }
        );
        res.status(200).send({
          auth: true,
          token: userToken,
          isAdmin: user.isAdmin,
        });
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
  })
    .then((data) => {
      res.send({ user: data });
    })
    .catch((err) => res.status(500).json({ err: err }));
};

exports.deleteUser = (req, res) => {
  User.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        message: "User deleted successfully !",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};
