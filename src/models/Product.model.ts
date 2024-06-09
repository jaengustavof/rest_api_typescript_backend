import { Table, Column, Model, DataType, Default } from "sequelize-typescript";
import { Col } from "sequelize/types/utils";

@Table({
    tableName: 'products'
})

class Product extends Model {

    @Column({
        type: DataType.STRING(100)
    })
    declare name:string

    @Column({
        type: DataType.FLOAT
        
    })
    declare price:number

    @Default(true) //No debo pasarlo en el request, por default va a ser true
    @Column({
        type: DataType.BOOLEAN
    })
    declare availability:boolean
}

export default Product;
