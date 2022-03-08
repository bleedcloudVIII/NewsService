import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Image } from 'src/images/images.model';
import { CreateNewsDto } from './dto/create-news.dto';
import { DeleteNewsDto } from './dto/delete-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { News } from './news.model';
import fetch, { FetchError } from 'node-fetch';

@Injectable()
export class NewsService {

    constructor(@InjectModel(News) private newsRepository: typeof News,
                @InjectModel(Image) private imageRepository: typeof Image) {}

    async createNews(dto: CreateNewsDto) {
        return this.newsRepository.create(dto);
    }

    async findById(id: number) {
        return this.newsRepository.findOne({where:{NewsID: id}});
    }

    async findAll() {
        return this.newsRepository.findAll();
    }

    async deleteNews(dto: DeleteNewsDto) {
        if(dto.groupId && dto.userDeleteId && dto.newsId) {
            const userCreate = await this.newsRepository.findOne({where:{NewsID: dto.newsId}});
            console.log(dto.userDeleteId);
            console.log(userCreate.UserID);
            if(dto.userDeleteId === userCreate.UserID) {
                await this.newsRepository.destroy({where:{NewsID: dto.newsId}});
                await this.imageRepository.destroy({where:{NewsID: dto.newsId}});
                return HttpStatus.OK;
            }
            else {
                return '4343';
                // fetch('').then(async response => {
                //     if(response.status === 200) {
                //         await this.newsRepository.destroy({where:{NewsID: dto.newsId}});
                //         await this.imageRepository.destroy({where:{NewsID: dto.newsId}});
                //         return HttpStatus.OK;  
                //     }
                // });
            }
        }
        else {
            throw new HttpException('Отсутствует id пользователя или id группы или id новости',HttpStatus.NO_CONTENT);
        }
    }

    async updateNews(id: number, dto: UpdateNewsDto) {
        await this.newsRepository.update(dto, {where: {NewsID: id}});
        const user = await this.newsRepository.findOne({where: {NewsID: id}});
        return user;
    }

}
