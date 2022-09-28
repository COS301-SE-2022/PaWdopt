import { Module } from '@nestjs/common';
import { SharedMlFeatureService } from './shared-ml-feature.service';
import { HttpModule } from '@nestjs/axios';


@Module({
  controllers: [],
  imports: [HttpModule],
  providers: [SharedMlFeatureService],
  exports: [SharedMlFeatureService],
})
export class SharedMlFeatureModule {
  constructor(private mlService: SharedMlFeatureService){}
  
  async postToML(imageFile){
    return this.mlService.postToML(imageFile);
  }
}
