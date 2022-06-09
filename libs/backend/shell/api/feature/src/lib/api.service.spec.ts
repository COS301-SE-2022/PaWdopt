import { Test, TestingModule } from '@nestjs/testing';
import { ApiService} from './api.service';
import { Dog, Pic, Organisation, Location, OrgMember, ContactInfo, Doc, Adopter, DogDocument, PicDocument, OrgMemberDocument, OrganisationDocument, AdopterDocument, DocDocument, ContactInfoDocument, LocationDocument } from './api.schema';
import { DogType, OrganisationType, LocationType, PicType, ContactInfoType, DocType, AdopterType, OrgMemberType } from './api.dto';
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
            },
        ],
          }).compile();
          
        service = await moduleRef.resolve(ApiService);
  });

    const pic: PicType = {
        path: 'path'
    };

    const orgMem: OrgMemberType = {
        name: 'name',
        email: 'email',
        password: 'password',
        organisation: 'organisation'
    };

    const loc: LocationType = {
        lat: 1,
        lng: 1
    };

    const contInfo: ContactInfoType = {
        email: 'email',
        phone: 'phone',
        website: 'website',
        facebook: 'facebook',
        instagram: 'instagram',
        twitter: 'twitter'
    };

    const doc: DocType = {
        type: 'type',
        path: 'path'
    };

    const org: OrganisationType = {
        name: 'name',
        about: 'about',
        dateFounded: new Date(),
        members: [orgMem],
        location: loc,
        rulesReq: ['rulesReq'],
        contactInfo: contInfo,
        logo: pic
    };

    const tempDog: DogType = {
        name: 'dog',
        dob: new Date(),
        gender: 'male',
        pics: [pic],
        breed: 'breed',
        about: 'description',
        organisation: org,
        weight: 1,
        height: 1,
        furLength: 'furlength',
        temperament: ["temp1"],
        usersLiked: null
    };

    const adopter: AdopterType = {
        name: 'name',
        email: 'email',
        password: 'password',
        IDNum: 'IDNum',
        pic: pic,
        location: loc,
        documents: [doc],
        dogsLiked: [tempDog],
        questionnaire: 'questionnaire',
        distance: 1
    };

    const dog: DogType = {
        name: 'dog',
        dob: new Date(),
        gender: 'male',
        pics: [pic],
        breed: 'breed',
        about: 'description',
        organisation: org,
        weight: 1,
        height: 1,
        usersLiked: [adopter],
        furLength: 'furlength',
        temperament: ["temp1"]
    };



    it('should be defined', async () => {
    expect(service).toBeDefined();
    });

    //Test if createOrg(org: Organisation) works and returns an Organisation
    describe('createOrg', () => {
        it('should return an Organisation', async () => {
          jest
            .spyOn(service, 'createOrg')
            .mockImplementation((): Promise<Organisation> => Promise.resolve(org));
    
          expect(
            await service.createOrg(org)
          ).toMatchObject(org);
        });
      });

    //Test if createDog(dog: Dog) works and returns a Dog
    describe('createDog', () => {
        it('should return a Dog', async () => {
            jest
                .spyOn(service, 'createDog')
                .mockImplementation((): Promise<Dog> => Promise.resolve(dog));
        
            expect(
                await service.createDog(dog)
            ).toMatchObject(dog);
            });
        }
    );

    //Test if createAdopter(adopter: Adopter) works and returns an Adopter
    describe('createAdopter', () => {
        it('should return an Adopter', async () => {
            jest
                .spyOn(service, 'createAdopter')
                .mockImplementation((): Promise<Adopter> => Promise.resolve(adopter));
        
            expect(
                await service.createAdopter(adopter)
            ).toMatchObject(adopter);
            }
        );
        }
    );

    //Test if createPic(pic: Pic) works and returns a Pic
    describe('createPic', () => {
        it('should return a Pic', async () => {
            jest
                .spyOn(service, 'createPic')
                .mockImplementation((): Promise<Pic> => Promise.resolve(pic));
        
            expect(
                await service.createPic(pic)
            ).toMatchObject(pic);
            }
        );
        }
    );

    //Test if createDoc(doc: Doc) works and returns a Doc
    describe('createDoc', () => {
        it('should return a Doc', async () => {
            jest
                .spyOn(service, 'createDoc')
                .mockImplementation((): Promise<Doc> => Promise.resolve(doc));
        
            expect(
                await service.createDoc(doc)
            ).toMatchObject(doc);
            }
        );
        }
    );

    //Test if createContactInfo(contInfo: ContactInfo) works and returns a ContactInfo
    describe('createContactInfo', () => {
        it('should return a ContactInfo', async () => {
            jest
                .spyOn(service, 'createContactInfo')
                .mockImplementation((): Promise<ContactInfo> => Promise.resolve(contInfo));
        
            expect(
                await service.createContactInfo(contInfo)
            ).toMatchObject(contInfo);
            }
        );
        }
    );

    //Test if createLocation(loc: Location) works and returns a Location
    describe('createLocation', () => {
        it('should return a Location', async () => {
            jest
                .spyOn(service, 'createLocation')
                .mockImplementation((): Promise<Location> => Promise.resolve(loc));
        
            expect(
                await service.createLocation(loc)
            ).toMatchObject(loc);
            }
        );
        }
    );

    //Test if createOrgMember(orgMem: OrgMember) works and returns an OrgMember
    describe('createOrgMember', () => {
        it('should return an OrgMember', async () => {
            jest
                .spyOn(service, 'createOrgMember')
                .mockImplementation((): Promise<OrgMember> => Promise.resolve(orgMem));
        
            expect(
                await service.createOrgMember(orgMem)
            ).toMatchObject(orgMem);
            }
        );
        }
    );

    
});
