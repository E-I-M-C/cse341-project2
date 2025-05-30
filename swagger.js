const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Project 2 Api',
        description: 'Project 2 Api'
    },
    host: 'localhost:3000',
    schemes: ['http', 'https'],
    components: {
        securitySchemes:{
            OAuth2: {
                type: 'oauth2',
                flows: {
                    authorizationCode: {
                        authorizationUrl: 'localhost:3000/login',
                        scopes: {
                            read_contants: 'Allows read access to contacts',
                            write_contacts: 'Allows write access to contacts',
                            read_users: 'Allows read access to users',
                            write_users: 'Allows write access to users',
                            admin: 'Grants access to admin operations'
                        }
                    }
                }
            }
        }
    }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);