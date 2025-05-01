import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'ecommerce-api',
    description: 'API de um ecommerce - curso'
  },
  servers: [
    {
      url: 'http//127.0.0.1:5001/e-commerce-curso-434a3/us-central1/api',
      description: 'Dev'
    },
  ],
  tags: [
    {
      "name": "Auth",
      "description": "Autenticação de usuários"
    },
    {
      "name": "Users",
      "description": "Gestão de usuários"
    },
    {
      "name": "Products",
      "description": "Gestão de produtos"
    },
    {
      "name": "Categories",
      "description": "Categorias dos produtos"
    },
    {
      "name": "Companies",
      "description": "Gestão de empresas"
    },
    {
      "name": "Orders",
      "description": "Gestão de pedidos"
    },
    {
      "name": "PaymentMethods",
      "description": "Metódos de pagamento"
    }
  ]
};

const outputFile = './src/docs/swagger-output.json';
const routes = ['./src/routes/index.ts'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen({openapi: '3.0.0'})(outputFile, routes, doc);