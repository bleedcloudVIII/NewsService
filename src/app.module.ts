import { Module } from '@nestjs/common';
import { News } from './news/news.model';
import { NewsModule } from './news/news.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ImagesModule } from './images/images.module';
import { Image } from './images/images.model';
import * as path from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '01RFHfcm11@',
      database: 'news',
      models: [News, Image],
      autoLoadModels: true
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve( __dirname,'..', 'images'),
    }),
    NewsModule,
    ImagesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
