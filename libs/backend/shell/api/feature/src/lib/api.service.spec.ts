import { Test, TestingModule } from '@nestjs/testing';
import { ApiService} from './api.service';
import { ApiResolver} from './api.resolver';
import { Dog, Pic, Organisation, Location, User, ContactInfo, Doc, Adopter, DogDocument, PicDocument, OrgMemberDocument, OrganisationDocument, UserDocument, AdopterDocument, DocDocument, ContactInfoDocument, LocationDocument } from './api.schema';
import { DogType, OrganisationType, LocationType, UserType ,PicType, ContactInfoType, DocType, AdopterType } from './api.dto';
import { Model } from 'mongoose';

// describe('ApiService', () => {
//   let service: ApiService;

//     beforeEach(async () => {
//         const moduleRef:TestingModule = await Test.createTestingModule({
//             controllers: [ApiResolver],
//             providers: [ApiService],
//           }).compile();
          
//         service = moduleRef.get<ApiService>(ApiService);
//         // resolver = moduleRef.get<ApiResolver>(ApiResolver);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });
  
//   describe('findUser', () =>{
//       it('should return a single user', ()=>{
//         const result = service.findUser('tester@testing.test');
//         expect(result).toBeDefined();
//       });
//   });
//});