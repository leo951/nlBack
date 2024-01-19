const Joi = require("joi");

const userValidation = (req, res, next) => {
  const userValidationSchema = Joi.object({
    firstName: req.body.firstName ? Joi.string() : Joi.any().forbidden(),
    lastName: req.body.lastName ? Joi.string() : Joi.any().forbidden(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "fr"] },
    }),
    isAdmin: Joi.boolean(),
    password: req.body.password
      ? Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      : Joi.any().forbidden(),
    profilePicture: req.body.profilePicture ? Joi.string() : Joi.any().forbidden(),
    isGoogle: req.body.isGoogle ? Joi.boolean() : Joi.any().forbidden()
  })

  const validation = userValidationSchema.validate(req.body);

  if (validation.error) {
    res.status(500).json({
      success: 0,
      message: validation.error.details[0].message,
    });
  } else {
    next();
  }
};
module.exports = userValidation;
