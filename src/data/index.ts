// Limpia las entradas a la base de datos cuando hacemos pruebas

import { exit } from 'node:process';
import db from '../config/db';

const clearDB = async () => {

    try {
        await db.sync({force:true});
        console.log('Datos eliminados correctamente')
        exit(0)// si esta vacio o con 0 finaliza correctamente
    } catch (error) {
        console.log(error)
        exit(1) // el 1 finaliza con errores
    }

}

if(process.argv[2] === '--clear'){
    clearDB()
}

//console.log(process.argv)