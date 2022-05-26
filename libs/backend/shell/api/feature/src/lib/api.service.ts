import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat, CatDocument } from './api.schema';

@Injectable()
export class ApiService {
    constructor(@InjectModel(Cat.name) private catModel: Model<CatDocument>) {}

    async findAll(): Promise<Cat[]> {
        return this.catModel.find().exec();
    }
}
