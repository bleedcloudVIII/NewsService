import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ImagesService } from 'src/images/images.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { News } from './news.model';

@Injectable()
export class NewsService {

    constructor(@InjectModel(News) private newsRepository: typeof News) {}

    async createNews(dto: CreateNewsDto) {
        return this.newsRepository.create(dto);
    }

    async findById(id: number) {
        return this.newsRepository.findOne({where:{NewsID: id}});
    }

    async findAll() {
        return this.newsRepository.findAll();
    }

    async deleteNews(id: number) {
        await this.newsRepository.destroy({where: {NewsID: id}});
        return HttpStatus.OK;
    }

    async updateNews(id: number, dto: UpdateNewsDto) {
        await this.newsRepository.update(dto, {where: {NewsID: id}});
        const user = await this.newsRepository.findOne({where: {NewsID: id}});
        return user;
    }

}
