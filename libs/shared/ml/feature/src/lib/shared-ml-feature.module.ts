import { Module } from '@nestjs/common';
import { SharedMlFeatureService } from './shared-ml-feature.service';
import { HttpModule } from '@nestjs/axios';

import { PredictionServiceClient } from '@google-cloud/aiplatform'

@Module({
  controllers: [],
  imports: [HttpModule],
  providers: [SharedMlFeatureService, PredictionServiceClient],
  exports: [SharedMlFeatureService],
})
export class SharedMlFeatureModule {
  constructor(private mlService: SharedMlFeatureService){}
  
  async postToML(imageFile){
    return this.mlService.postToML(imageFile);
  }

}
