import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { ApiResolver } from './api.resolver';
import { MongooseModule } from '@nestjs/mongoose';

import { Dog, DogSchema } from './api.schema';



@Module({
  imports: [MongooseModule.forFeature([{ name: Dog.name, schema: DogSchema }])],
  controllers: [],
  providers: [ApiService, ApiResolver],
  exports: [],
})
export class BackendShellApiFeatureModule {}
