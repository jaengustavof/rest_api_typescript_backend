import swaggerJSDoc from 'swagger-jsdoc';
import { SwaggerOptions } from 'swagger-ui-express';

const options: swaggerJSDoc.Options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        tags: [
            {
                name: 'Products', // Define the tag for each endpoint in the router
                description: 'API operations related to products'
            }
        ],
        info: {
            title: 'REST API Node.js / Express / TypeScript',
            version: '1.0.0',
            description: 'API Docs for Products'
        }
    },
    apis: ['./src/router.ts']
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerUiOptions: SwaggerOptions = {
    customCss: `
    .topbar-wrapper .link { 
            content: url('https://www.clickandgo.com/static/img/click-and-go-holidays-logo.svg');
            height: 80px;
            width: auto; 
        }
        .swagger-ui .topbar {
            background-color: #f5f5f5;
        }
    `,
    customSiteTitle: 'Click & Go API Docs',
    
};

export default swaggerSpec;
export {
    swaggerUiOptions
};