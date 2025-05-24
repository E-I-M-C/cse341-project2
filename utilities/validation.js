const { body, validationResult } = require('express-validator');

const contactRules = () => {
  return [
    body('firstName').isString().notEmpty(),
    body('lastName').isString().notEmpty(),
    body('email').isEmail().notEmpty(),
    body('favoriteColor').isString(),
    body('favoriteFood').isString(),
    body('favoriteNumber').isInt(),
    body('birthday').notEmpty(),
  ];
}

const userRules = () => {
  return [
    body('username').isEmail().notEmpty(),
    body('password').isLength({ min: 5 }).notEmpty(),
  ];
}

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors
  });
}

module.exports = {
  contactRules,
  userRules,
  validate
};