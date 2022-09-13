import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

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
  @UseInterceptors(FileInterceptor('image'))
  async postToML(@UploadedFile() imageFile) {
    const data = imageFile.buffer.toString('base64');
    const mimetype = imageFile.mimetype;
    return this.mlService.postToML({data, mimetype});
  }
}
