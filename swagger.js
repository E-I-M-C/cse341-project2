const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Project 2 Api',
        description: 'Project 2 Api'
    },
    host: 'localhost:3000',
    schemes: ['http', 'https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);