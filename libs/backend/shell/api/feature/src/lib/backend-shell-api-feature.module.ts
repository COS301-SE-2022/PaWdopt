import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { ApiResolver } from './api.resolver';



@Module({
  controllers: [],
  providers: [ApiService, ApiResolver],
  exports: [],
})
export class BackendShellApiFeatureModule {}
