const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('../swagger.json');
/*const SwaggerUIBundle = require('swagger-ui-dist').SwaggerUIBundle;

const ui = SwaggerUIBundle({
  url: "localhost:3000/swagger.json",
  dom_id: '#swagger-ui',
  presets: [
    SwaggerUIBundle.presets.apis,
    SwaggerUIBundle.SwaggerUIStandalonePreset
  ],
  layout: "StandaloneLayout"
});

ui.initOAuth({
  clientId: process.env.CLIENT_ID,
  appName: "My-App",
  scopeSeparator: " ",
  scopes: "openid profile",
  useBasicAuthenticationWithAccessCodeGrant: true,
  usePkceWithAuthorizationCodeGrant: true
});*/

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDoc));

module.exports = router;