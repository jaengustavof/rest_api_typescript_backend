import express from 'express';
import colors from 'colors';
import cors, { CorsOptions } from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec, { swaggerUiOptions } from './config/seagger';
import router from './router';
import db from './config/db';

//conectar a base de datos

export async function connectDB() {
    try {
        await db.authenticate();
        db.sync(); // actualiza la base de datos
        //console.log(colors.blue('Conexion exitosa a la base de datos'))
    } catch (error) {
        //console.log(error)
        console.log(colors.red.bold('Error en connectDB. Conexion con Base de Datos'))
    }
}

connectDB();

//instancia de express
const server = express();

// Premitir conexiones
const corsOptions : CorsOptions = {
    origin: function (origin, callback) {
        if(origin === process.env.FRONTEND_URL) {
            callback(null, true) // permitir la conexion
        }else {
            callback(new Error('No permitido por CORS')) // bloquear la conexion
        }
    }
}

server.use(cors(corsOptions));

//leer datos de formularios
server.use(express.json());

//morgan es un middleware que nos permite ver las peticiones que llegan al servidor
server.use(morgan('dev'));

//SWAGGER
server.use('/api/products', router);

// Docs - http://localhost:4000/docs/
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions));


export default server;