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

    //Test if updateOrg(name: string, org: Organisation) works and returns an Organisation
    describe('updateOrg', () => {
        it('should return a Organisation', async () => {
          jest
            .spyOn(service, 'updateOrg')
            .mockImplementation((): Promise<Organisation> => Promise.resolve(org));
    
          expect(await service.updateOrg('name', org)).toMatchObject(org);
        });
    
        it('should return null', async () => {
          jest.spyOn(service, 'updateOrg').mockResolvedValue(null);
    
          expect(await service.updateOrg('name', org)).toEqual(null);
        });
      });

    //Test if updateDog(name: string, dog: Dog) works and returns a Dog
    describe('updateDog', () => {
        it('should return a Dog', async () => {
            jest
                .spyOn(service, 'updateDog')
                .mockImplementation((): Promise<Dog> => Promise.resolve(dog));

            expect(await service.updateDog('name', dog)).toMatchObject(dog);
        });

        it('should return null', async () => {
            jest.spyOn(service, 'updateDog').mockResolvedValue(null);

            expect(await service.updateDog('name', dog)).toEqual(null);
        });
    });

    //Test if updateAdopter(name: string, adopter: Adopter) works and returns an Adopter
    describe('updateAdopter', () => {
        it('should return an Adopter', async () => {
            jest
                .spyOn(service, 'updateAdopter')
                .mockImplementation((): Promise<Adopter> => Promise.resolve(adopter));

            expect(await service.updateAdopter('name', adopter)).toMatchObject(adopter);
        });

        it('should return null', async () => {
            jest.spyOn(service, 'updateAdopter').mockResolvedValue(null);

            expect(await service.updateAdopter('name', adopter)).toEqual(null);
        });
    });

    //Test if updatePic(name: string, pic: Pic) works and returns a Pic
    describe('updatePic', () => {
        it('should return a Pic', async () => {
            jest
                .spyOn(service, 'updatePic')
                .mockImplementation((): Promise<Pic> => Promise.resolve(pic));

            expect(await service.updatePic('name', pic)).toMatchObject(pic);
        });

        it('should return null', async () => {
            jest.spyOn(service, 'updatePic').mockResolvedValue(null);

            expect(await service.updatePic('name', pic)).toEqual(null);
        });
    }
    );

    //Test if updateDoc(name: string, doc: Doc) works and returns a Doc
    describe('updateDoc', () => {
        it('should return a Doc', async () => {
            jest
                .spyOn(service, 'updateDoc')
                .mockImplementation((): Promise<Doc> => Promise.resolve(doc));

            expect(await service.updateDoc('name', doc)).toMatchObject(doc);
        });

        it('should return null', async () => {
            jest.spyOn(service, 'updateDoc').mockResolvedValue(null);

            expect(await service.updateDoc('name', doc)).toEqual(null);
        });
    }
    );

    //Test if updateContactInfo(name: string, contInfo: ContactInfo) works and returns a ContactInfo
    describe('updateContactInfo', () => {
        it('should return a ContactInfo', async () => {
            jest
                .spyOn(service, 'updateContactInfo')
                .mockImplementation((): Promise<ContactInfo> => Promise.resolve(contInfo));

            expect(await service.updateContactInfo('name', contInfo)).toMatchObject(contInfo);
        });

        it('should return null', async () => {
            jest.spyOn(service, 'updateContactInfo').mockResolvedValue(null);

            expect(await service.updateContactInfo('name', contInfo)).toEqual(null);
        });
    }
    );

    //Test if updateLocation(name: string, loc: Location) works and returns a Location
    describe('updateLocation', () => {
        it('should return a Location', async () => {
            jest
                .spyOn(service, 'updateLocation')
                .mockImplementation((): Promise<Location> => Promise.resolve(loc));

            expect(await service.updateLocation('name', loc)).toMatchObject(loc);
        });

        it('should return null', async () => {
            jest.spyOn(service, 'updateLocation').mockResolvedValue(null);

            expect(await service.updateLocation('name', loc)).toEqual(null);
        });
    }
    );

    //Test if updateOrgMember(name: string, orgMem: OrgMember) works and returns an OrgMember
    describe('updateOrgMember', () => {
        it('should return an OrgMember', async () => {
            jest
                .spyOn(service, 'updateOrgMember')
                .mockImplementation((): Promise<OrgMember> => Promise.resolve(orgMem));

            expect(await service.updateOrgMember('name', orgMem)).toMatchObject(orgMem);
        });

        it('should return null', async () => {
            jest.spyOn(service, 'updateOrgMember').mockResolvedValue(null);

            expect(await service.updateOrgMember('name', orgMem)).toEqual(null);
        });
    }
    );

    //Test if deleteOrg(name: string) works and returns an Organisation
    describe('deleteOrg', () => {
        it('should return a Organisation', async () => {
            jest
                .spyOn(service, 'deleteOrg')
                .mockImplementation((): Promise<Organisation> => Promise.resolve(org));

            expect(await service.deleteOrg('name')).toMatchObject(org);
        });

        it('should return null', async () => {
            jest.spyOn(service, 'deleteOrg').mockResolvedValue(null);

            expect(await service.deleteOrg('name')).toEqual(null);
        });
    }
    );

    //Test if deleteDog(name: string) works and returns a Dog
    describe('deleteDog', () => {
        it('should return a Dog', async () => {
            jest
                .spyOn(service, 'deleteDog')
                .mockImplementation((): Promise<Dog> => Promise.resolve(dog));

            expect(await service.deleteDog('name')).toMatchObject(dog);
        });

        it('should return null', async () => {
            jest.spyOn(service, 'deleteDog').mockResolvedValue(null);

            expect(await service.deleteDog('name')).toEqual(null);
        });
    }
    );

    //Test if deleteAdopter(name: string) works and returns an Adopter
    describe('deleteAdopter', () => {
        it('should return an Adopter', async () => {
            jest
                .spyOn(service, 'deleteAdopter')
                .mockImplementation((): Promise<Adopter> => Promise.resolve(adopter));

            expect(await service.deleteAdopter('name')).toMatchObject(adopter);
        });

        it('should return null', async () => {
            jest.spyOn(service, 'deleteAdopter').mockResolvedValue(null);

            expect(await service.deleteAdopter('name')).toEqual(null);
        });
    }
    );

    //Test if deletePic(name: string) works and returns a Pic
    describe('deletePic', () => {
        it('should return a Pic', async () => {
            jest
                .spyOn(service, 'deletePic')
                .mockImplementation((): Promise<Pic> => Promise.resolve(pic));

            expect(await service.deletePic('name')).toMatchObject(pic);
        });

        it('should return null', async () => {
            jest.spyOn(service, 'deletePic').mockResolvedValue(null);

            expect(await service.deletePic('name')).toEqual(null);
        });
    }
    );

    //Test if deleteDoc(name: string) works and returns a Doc
    describe('deleteDoc', () => {
        it('should return a Doc', async () => {
            jest
                .spyOn(service, 'deleteDoc')
                .mockImplementation((): Promise<Doc> => Promise.resolve(doc));

            expect(await service.deleteDoc('name')).toMatchObject(doc);
        });

        it('should return null', async () => {
            jest.spyOn(service, 'deleteDoc').mockResolvedValue(null);

            expect(await service.deleteDoc('name')).toEqual(null);
        });
    }
    );

    //Test if deleteContactInfo(name: string) works and returns a ContactInfo
    describe('deleteContactInfo', () => {
        it('should return a ContactInfo', async () => {
            jest
                .spyOn(service, 'deleteContactInfo')
                .mockImplementation((): Promise<ContactInfo> => Promise.resolve(contInfo));

            expect(await service.deleteContactInfo('name')).toMatchObject(contInfo);
        });

        it('should return null', async () => {
            jest.spyOn(service, 'deleteContactInfo').mockResolvedValue(null);

            expect(await service.deleteContactInfo('name')).toEqual(null);
        });
    }
    );

    //Test if deleteLocation(name: string) works and returns a Location
    describe('deleteLocation', () => {
        it('should return a Location', async () => {
            jest
                .spyOn(service, 'deleteLocation')
                .mockImplementation((): Promise<Location> => Promise.resolve(loc));

            expect(await service.deleteLocation('name')).toMatchObject(loc);
        });

        it('should return null', async () => {
            jest.spyOn(service, 'deleteLocation').mockResolvedValue(null);

            expect(await service.deleteLocation('name')).toEqual(null);
        });
    }
    );

    //Test if deleteOrgMember(name: string) works and returns an OrgMember
    describe('deleteOrgMember', () => {
        it('should return an OrgMember', async () => {
            jest
                .spyOn(service, 'deleteOrgMember')
                .mockImplementation((): Promise<OrgMember> => Promise.resolve(orgMem));

            expect(await service.deleteOrgMember('name')).toMatchObject(orgMem);
        });

        it('should return null', async () => {
            jest.spyOn(service, 'deleteOrgMember').mockResolvedValue(null);

            expect(await service.deleteOrgMember('name')).toEqual(null);
        });
    }
    );
});
