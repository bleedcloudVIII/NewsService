import { Controller, Delete, Get, Post, Put, Body, Param, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { NewsService } from './news.service';

@Controller('/api/v1/news/')
export class NewsController {

    constructor(private newsService: NewsService) {}

    @Post()
    createNews(@Body() dto: CreateNewsDto) {
        console.log(dto);
        return this.newsService.createNews(dto);
    }

    @Get(':id')
    findById(@Param('id') id: number) {
        return this.newsService.findById(id);
    }

    @Get()
    findAll() {
        return this.newsService.findAll();
    }

    @Delete(':id')
    deleteNews(@Param('id') id: number) {
        return this.newsService.deleteNews(id);
    }

    @Put(':id')
    updateNews(@Body() dto: UpdateNewsDto, @Param('id') id: number) {
        return this.newsService.updateNews(id, dto);
    }
}
