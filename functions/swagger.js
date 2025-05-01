import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'ecommerce-api',
    description: 'API de um ecommerce - curso'
  },
  host: '127.0.0.1:5001/e-commerce-curso-434a3/us-central1', //link da api
  basePath: '/api', //final do link da api
  schemes: ['http'] //começo do link da api
};

const outputFile = './src/docs/swagger-output.json';
const routes = ['./src/routes/index.ts'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen()(outputFile, routes, doc);