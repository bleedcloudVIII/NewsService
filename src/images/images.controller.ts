import { Body, Controller, Delete, Get, Param, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { CreateImageDto } from "./dto/create-image.dto";
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagesService } from "./images.service";

@Controller('/api/v1/images') 
export class ImagesController {

    constructor(private imageService: ImagesService) {}

    @Post()
    @UseInterceptors(FileInterceptor('image'))
    createImage(@Body() dto: CreateImageDto, @UploadedFile() image) {
        return this.imageService.create(dto, image);
    }

    @Get('/byNewsId/:id')
    findAllByNewsId(@Param('id') id: number) {
        return this.imageService.findAllByNewsId(id);
    }

    @Get('/byImageId/:id')
    findOneByImageId(@Param('id') id: number) {
        return this.imageService.findOneByImageId(id);
    }

    @Get()
    findAll() {
        return this.imageService.findAll();
    }

    @Delete(':id')
    deleteImage(@Param('id') id: number) {
        return this.imageService.deleteImage(id);
    }

}
