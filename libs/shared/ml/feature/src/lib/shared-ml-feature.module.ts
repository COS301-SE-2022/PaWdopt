import { Module } from '@nestjs/common';
import { SharedMlFeatureService } from './shared-ml-feature.service';

@Module({
  controllers: [],
  providers: [SharedMlFeatureService],
  exports: [SharedMlFeatureService],
})
export class SharedMlFeatureModule {
  mlService: SharedMlFeatureService;
  
  async postToML(data: string){
    return this.mlService.postToML(data);
  }
}
