const router = require('express').Router();
const oauth = require('express-openid-connect');
require('dotenv').config();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
};

router.use(oauth.auth(config));

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
//#swagger.tags=['Welcome'];
  res.send(req.oidc.isAuthenticated() ? 'Welcome: Logged in' : 'Welcome: Logged out');
});

router.use('/contacts', oauth.requiresAuth(), require('./contacts'));
router.use('/users', oauth.requiresAuth(), require('./users'));

router.use('/login', (req, res) => {
  //#swagger.tags=['Authentication'];
});

router.use('/logout', (req, res) => {
  //#swagger.tags=['Authentication'];
});

router.get('/profile', oauth.requiresAuth(), (req, res) => {
//#swagger.tags=['Authentication'];
/* #swagger.security = [{
  "OAuth2": [
    'read'
  ]
}] */
  res.send(JSON.stringify(req.oidc.user));
});

module.exports = router;