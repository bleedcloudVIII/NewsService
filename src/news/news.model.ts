import { Column, DataType, Model, Table } from "sequelize-typescript";

interface NewsCreationAtts {
    UserID: number;
    GroupID: number;
    title: string;
    content: string;
}

@Table({tableName: 'news', updatedAt: false})
export class News extends Model<News, NewsCreationAtts> {   
    
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    NewsID: number;

    @Column({type: DataType.INTEGER, allowNull: true})
    UserID: number;

    @Column({type: DataType.INTEGER})
    GroupID: number;

    @Column({type: DataType.STRING, allowNull: true})
    title: string;

    @Column({type: DataType.STRING, allowNull: true})
    content: string;

}