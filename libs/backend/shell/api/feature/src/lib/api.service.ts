import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Dog, DogDocument } from './api.schema';

@Injectable()
export class ApiService {
    constructor(@InjectModel(Dog.name) private DogModel: Model<DogDocument>) {}

    async findAll(): Promise<Dog[]> {
        return this.DogModel.find().exec();
    }
}
