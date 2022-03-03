import { Module } from '@nestjs/common'
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { Image } from './images.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  controllers: [ImagesController],
  imports: [
    SequelizeModule.forFeature([Image]),
  ],
  providers: [ImagesService],
  
})
export class ImagesModule {}
