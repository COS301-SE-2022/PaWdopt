import { Test, TestingModule } from '@nestjs/testing';
import { ApiService} from './api.service';
import { ApiResolver} from './api.resolver';
import { Dog, Pic, Organisation, Location, User, ContactInfo, Doc, Adopter, DogDocument, PicDocument, OrgMemberDocument, OrganisationDocument, UserDocument, AdopterDocument, DocDocument, ContactInfoDocument, LocationDocument } from './api.schema';
import { DogType, OrganisationType, LocationType, UserType ,PicType, ContactInfoType, DocType, AdopterType } from './api.dto';
import { Model } from 'mongoose';

describe('ApiService', () => {
  let service: ApiService;
  let resolver: ApiResolver;
  let DogModel: Model<DogDocument>;
  let PicModel : Model<PicDocument>;
  let OrganisationModel : Model<OrganisationDocument>;
  let OrgMemberModel : Model<OrgMemberDocument>;
  let UserModel : Model<UserDocument>;
  let AdopterModel : Model<AdopterDocument>;
  let DocModel : Model<DocDocument>;
  let ContactInfoModel : Model<ContactInfoDocument>;
  let LocationModel : Model<LocationDocument>;

//   beforeEach(() => {
//     service = new ApiService(
//         DogModel,
//         PicModel,
//         OrganisationModel,
//         OrgMemberModel,
//         UserModel,
//         AdopterModel,
//         DocModel,
//         ContactInfoModel,
//         LocationModel
//     );

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [ApiResolver],
            providers: [ApiService],
          }).compile();
          
        service = moduleRef.get<ApiService>(ApiService);
        // resolver = moduleRef.get<ApiResolver>(ApiResolver);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  
//   describe('findUser', () =>{
//       it('should return a single user', ()=>{
//         const result = service.findUser('tester@testing.test');
//         expect(result).toBeDefined();
//       });
//   });
});