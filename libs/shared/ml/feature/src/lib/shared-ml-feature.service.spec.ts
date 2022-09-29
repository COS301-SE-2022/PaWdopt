import { Test } from '@nestjs/testing';
import { SharedMlFeatureService } from './shared-ml-feature.service';
import { HttpModule } from '@nestjs/axios';

describe('SharedMlFeatureService', () => {
  let service: SharedMlFeatureService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [SharedMlFeatureService],
    }).compile();

    service = module.get(SharedMlFeatureService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
