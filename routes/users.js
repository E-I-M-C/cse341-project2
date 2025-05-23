const router = require('express').Router();
const userCont = require('../controllers/users');
const userValidate = require('../utilities/validation');

router.get('/', userCont.getAll);

router.get('/:id', userCont.getSingle);

router.post(
  '/',
  userValidate.userRules(),
  userValidate.validate,
  userCont.createUser
);

router.put(
  '/:id',
  userValidate.userRules(),
  userValidate.validate,
  userCont.updateUser
);

router.delete('/:id', userCont.deleteUser);

module.exports = router;