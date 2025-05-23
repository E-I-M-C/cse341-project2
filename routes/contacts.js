const router = require('express').Router();
const contactCont = require('../controllers/contacts');
const contactValidate = require('../utilities/validation');

router.get('/', contactCont.getAll);

router.get('/:id', contactCont.getSingle);

router.post(
  '/',
  contactValidate.contactRules(),
  contactValidate.validate,
  contactCont.createContact
);

router.put(
  '/:id',
  contactValidate.contactRules(),
  contactValidate.validate,
  contactCont.updateContact
);

router.delete('/:id', contactCont.deleteContact);

module.exports = router;