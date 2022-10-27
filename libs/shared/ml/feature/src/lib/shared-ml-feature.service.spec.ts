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

  it('should post to ML', async () => {
    const response = await service.postToML({
      image: 'iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX___-_v7-jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD_aNpbtEAAAAASUVORK5CYII',
      extension: 'jpg',
    });
    expect(response).toBeTruthy();
  });

});
