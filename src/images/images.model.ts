import { Column, DataType, Model, Table } from "sequelize-typescript";

interface CreateImageAtts {
    image: string;
    NewsID: number;
}

@Table({tableName: 'images', updatedAt: false})
export class Image extends Model<Image, CreateImageAtts> {

    @Column({type: DataType.INTEGER, autoIncrement: true, unique: true, primaryKey: true})
    ImageID: number;

    @Column({type: DataType.STRING})
    image: string;

    @Column({type: DataType.INTEGER})
    NewsID: number;
}