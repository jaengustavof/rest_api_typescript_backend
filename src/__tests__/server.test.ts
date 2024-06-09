
import { connectDB } from "../server";
import db from "../config/db";

//Para forzar el error a la conexion de la base de datos

jest.mock("../config/db") //creamos una conexion a la base de datos

describe('connectDB', () => {
    it('Should handle data base connection error', async () =>{
        //el mismo authenticate del archivo server.ts
        //mockRejectedValueOnce forzamos el error
        jest.spyOn(db, 'authenticate')
            .mockRejectedValueOnce(new Error('Error en connectDB. Conexion con Base de Datos')) 

        const consoleSpy = jest.spyOn(console, 'log');

        //llamamos a la conexion de la base de datos
        await connectDB()

        //al tener el espia en la linea 28, va a reject la conexion
        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('Error en connectDB. Conexion con Base de Datos')
        ) 

    })
})

