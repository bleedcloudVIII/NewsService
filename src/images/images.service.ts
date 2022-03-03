import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from '@nestjs/sequelize';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';
import { Image } from "./images.model";
import { CreateImageDto } from "./dto/create-image.dto";


@Injectable()
export class ImagesService {

    constructor(@InjectModel(Image)private imageRepository: typeof Image) {}

    async createImage(image): Promise<string> {
        try {
            const imageName = uuid.v4() + '.jpg';
            const imagePath = path.resolve(__dirname,'..','..', 'images')
            if (!fs.existsSync(imagePath)) {
                fs.mkdirSync(imagePath, {recursive: true})
            }
            fs.writeFileSync(path.join(imagePath, imageName), image.buffer)
            return imageName;
        } catch (e) {
            throw new HttpException('Произошла ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async create(dto: CreateImageDto, image: any) {
        const imageName = await this.createImage(image);
        const _image = await this.imageRepository.create({...dto, image: imageName});
        return _image;
    }

    async findAllByNewsId(id: number) {
        return this.imageRepository.findAll({where:{NewsID: id}});
    }

    async findOneByImageId(id: number) {
        return this.imageRepository.findOne({where:{ImageID: id}})
    }

    async findAll() {
        return this.imageRepository.findAll();
    }

    async deleteImage(id: number) {
        return this.imageRepository.destroy({where:{ImageID: id}});
    }
}