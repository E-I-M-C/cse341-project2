const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
//#swagger.tags=['Welcome'];
  res.send('Welcome to this API');
});

router.use('/contacts', require('./contacts'));
router.use('/users', require('./users'));

module.exports = router;