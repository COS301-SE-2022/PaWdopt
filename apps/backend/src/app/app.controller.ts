import { Body, Controller, Get, Post } from '@nestjs/common';

import { AppService } from './app.service';

import { SharedMlFeatureModule } from '@pawdopt/shared/ml/feature';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly mlService: SharedMlFeatureModule) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Post('predict')
  async postToML(@Body() imageFile) {
    return this.mlService.postToML(imageFile);
  }
}
