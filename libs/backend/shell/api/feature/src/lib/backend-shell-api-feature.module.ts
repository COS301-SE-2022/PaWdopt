import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { ApiResolver } from './api.resolver';
import { MongooseModule } from '@nestjs/mongoose';

import { Cat, CatSchema } from './api.schema';



@Module({
  imports: [MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }])],
  controllers: [],
  providers: [ApiService, ApiResolver],
  exports: [],
})
export class BackendShellApiFeatureModule {}
