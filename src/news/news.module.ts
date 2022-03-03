import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { News } from './news.model';

@Module({
  controllers: [NewsController],
  imports: [
    SequelizeModule.forFeature([News]),
  ],
  providers: [NewsService],

})
export class NewsModule {}
