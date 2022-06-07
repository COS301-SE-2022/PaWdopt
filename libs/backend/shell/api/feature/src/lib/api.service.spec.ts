import { Test, TestingModule } from '@nestjs/testing';
import { ApiService} from './api.service';
import { Dog, Pic, Organisation, Location, User, OrgMember, ContactInfo, Doc, Adopter, DogDocument, PicDocument, OrgMemberDocument, OrganisationDocument, UserDocument, AdopterDocument, DocDocument, ContactInfoDocument, LocationDocument } from './api.schema';
import { DogType, OrganisationType, LocationType, UserType ,PicType, ContactInfoType, DocType, AdopterType } from './api.dto';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';

describe('ApiService', () => {
  let service: ApiService;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [ApiService,{
                provide: getModelToken(Dog.name),
                useValue: Dog,
            },{
                provide: getModelToken(Pic.name),
                useValue: Pic,
            },{
                provide: getModelToken(Organisation.name),
                useValue: Organisation,
            },{
                provide: getModelToken(OrgMember.name),
                useValue: OrgMember,
            },{
                provide: getModelToken(User.name),
                useValue: User,
            },{
                provide: getModelToken(Adopter.name),
                useValue: Adopter,
            },{
                provide: getModelToken(Doc.name),
                useValue: Doc,
            },{
                provide: getModelToken(ContactInfo.name),
                useValue: ContactInfo,
            },{
                provide: getModelToken(Location.name),
                useValue: Location,
            }],
          }).compile();
          
        service = await moduleRef.resolve(ApiService);
  });

  it('should be defined', async () => {
    expect(service).toBeDefined();
  });
  
  // describe('findUser', () =>{
  //     it('should return a single user', ()=>{
  //       const result = service.findUser('tester@testing.test');
  //       expect(result).toBeDefined();
  //     });
  // });
});