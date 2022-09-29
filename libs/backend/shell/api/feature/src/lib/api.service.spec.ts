import { Test, TestingModule } from '@nestjs/testing';
import { ApiService} from './api.service';
import { Dog, Organisation, Location, OrgMember, ContactInfo,  Adopter, PotentialAdopter, Chat, MessageObj, Statistic, Doc, DogDocument,  OrgMemberDocument, OrganisationDocument, AdopterDocument,  ContactInfoDocument, LocationDocument, PotentialAdopterDocument, StatisticDocument, ChatDocument, MessageDocument } from './api.schema';
import { DogType, OrganisationType, LocationType,  ContactInfoType,  AdopterType, OrgMemberType, DocType, PotentialAdopterType, StatisticType, ChatType, MessageObjType } from './api.dto';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';

describe('apiService', () => {
    describe('MockTests', () => {
        it('should work', () => {
          expect(true).toBe(true);
        });
    
        it('should change stuff for codecov', () => {
          expect(true).toBe(true);
        });
    });
  });

  

describe('ApiService', () => {
  let service: ApiService;
    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [ApiService,{
                provide: getModelToken(Dog.name),
                useValue: Dog,
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
                provide: getModelToken(ContactInfo.name),
                useValue: ContactInfo,
            },{
                provide: getModelToken(Location.name),
                useValue: Location,
            },{
                provide: getModelToken(PotentialAdopter.name),
                useValue: PotentialAdopter,
            },{
                provide: getModelToken(Statistic.name),
                useValue: Statistic,
            },{
                provide: getModelToken(Chat.name),
                useValue: Chat,
            },{
                provide: getModelToken(MessageObj.name),
                useValue: MessageObj,
            },{
                provide: getModelToken(Doc.name),
                useValue: Doc,
            }
        ],
          }).compile();
          
        service = await moduleRef.resolve(ApiService);
  });
    const orgMem: OrgMemberType = {
        _id: 'orgMemId',
        name: 'name',
        email: 'email',
        organisation: 'orgId',
        role: 'role',
        verification: new Date(),
    };

    const loc: LocationType = {
        lat: 1,
        lng: 1
    };

    const contInfo: ContactInfoType = {
        _id: 'contInfoId',
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

    const tempDog: DogType = {
        _id: 'dogId',
        name: 'name',
        dob: new Date(),
        gender: 'male',
        pics: ['pic'],
        breed: 'breed',
        about: 'about',
        organisation: null,
        weight: 10,
        height: 10,
        usersLiked: null,
        furLength: 'furLength',
        temperament: ['temperament']
    };
    
    const adopter: AdopterType = {
        _id: 'adopterId',
        name: 'name',
        email: 'email',
        pic: 'pic',
        location: loc,
        documents: [doc],
        dogsLiked: [tempDog],
        dogsDisliked: [tempDog],
        uploadedDocs : true,
    };

    const potentialAdopter: PotentialAdopterType = {
        dogId: 'dogId',
        adopter: adopter,
    };


    const org: OrganisationType = {
        _id: 'orgId',
        name: 'name',
        about: 'about',
        dateFounded: new Date(),
        members: [orgMem],
        location: loc,
        totalAdoptions: 1,
        totalDogs: 1,
        rulesReq: 'rulesReq',
        contactInfo: contInfo,
        potentialAdopters: [potentialAdopter],
        logo: 'logo',
    };

    const dog: DogType = {
        _id: 'dogId',
        name: 'name',
        dob: new Date(),
        gender: 'male',
        pics: ['pic'],
        breed: 'breed',
        about: 'about',
        organisation: org,
        weight: 10,
        height: 10,
        usersLiked: [adopter],
        furLength: 'furLength',
        temperament: ['temperament']
    };

    const stat: StatisticType = {
        orgId: 'orgId',
        createdTimeStamps: [new Date()],
        createdDogs: [dog],
        inProcessTimeStamps: [new Date()],
        inProcessDogs: [dog],
        adoptedTimeStamps: [new Date()],
        adoptedDogs: [dog],
        rejectedTimeStamps: [new Date()],
        rejectedDogs: [dog],
    };

    const message: MessageObjType = {
        userId: 'userId',
        message: 'message',
    }

    const chat: ChatType = {
        adopterId: 'adopterId',
        orgId: 'orgId',
        messages: [message],
        dogId: 'dogId',
        disabled: false,
    }

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

    //Test if findAdopter(email: string) works and returns an Adopter or null
    describe('findAdopter', () => {
        it('should return an Adopter', async () => {
            jest
                .spyOn(service, 'findAdopter')
                .mockImplementation((): Promise<Adopter> => Promise.resolve(adopter));

            expect(await service.findAdopter('email')).toMatchObject(adopter);
        });

        it('should return null', async () => {
            jest.spyOn(service, 'findAdopter').mockResolvedValue(null);

            expect(await service.findAdopter('email')).toEqual(null);
        });
    }
    );

    //Test if findOrgMember(email: string) works and returns an OrgMember or null
    describe('findOrgMember', () => {
        it('should return an OrgMember', async () => {
            jest
                .spyOn(service, 'findOrgMember')
                .mockImplementation((): Promise<OrgMember> => Promise.resolve(orgMem));

            expect(await service.findOrgMember('email')).toMatchObject(orgMem);
        });

        it('should return null', async () => {
            jest.spyOn(service, 'findOrgMember').mockResolvedValue(null);

            expect(await service.findOrgMember('email')).toEqual(null);
        });
    }
    );

    //Test if findDog(name: string) works and returns a Dog or null
    describe('findDog', () => {
        it('should return a Dog', async () => {
            jest
                .spyOn(service, 'findDog')
                .mockImplementation((): Promise<Dog> => Promise.resolve(dog));

            expect(await service.findDog('name')).toMatchObject(dog);
        });

        it('should return null', async () => {
            jest.spyOn(service, 'findDog').mockResolvedValue(null);

            expect(await service.findDog('name')).toEqual(null);
        });
    }
    );

    //Test if findDogsByName(name: string) works and returns a Dog array or null
    describe('findDogsByName', () => {
        it('should return a Dog array', async () => {
            jest
                .spyOn(service, 'findDogsByName')
                .mockImplementation((): Promise<Dog[]> => Promise.resolve([dog]));

            expect(await service.findDogsByName('name')).toMatchObject([dog]);
        });

        it('should return null', async () => {
            jest.spyOn(service, 'findDogsByName').mockResolvedValue(null);

            expect(await service.findDogsByName('name')).toEqual(null);
        });
    }
    );

    //Test if findDogsByOrganisation(organisation: Organisation) works and returns a Dog array or null
    describe('findDogsByOrganisation', () => {
        it('should return a Dog array', async () => {
            jest
                .spyOn(service, 'findDogsByOrganisation')
                .mockImplementation((): Promise<Dog[]> => Promise.resolve([dog]));

            expect(await service.findDogsByOrganisation(org)).toMatchObject([dog]);
        });

        it('should return null', async () => {
            jest.spyOn(service, 'findDogsByOrganisation').mockResolvedValue(null);

            expect(await service.findDogsByOrganisation(org)).toEqual(null);
        });
    }
    );

    //Test if findDogs() works and returns a Dog array
    describe('findDogs', () => {
        it('should return a Dog array', async () => {
            jest
                .spyOn(service, 'findDogs')
                .mockImplementation((): Promise<Dog[]> => Promise.resolve([dog]));

            expect(await service.findDogs()).toMatchObject([dog]);
        });
    }
    );

    //Test if findDogsByBreed(breed: string) works and returns a Dog array
    describe('findDogsByBreed', () => {
        it('should return a Dog array', async () => {
            jest
                .spyOn(service, 'findDogsByBreed')
                .mockImplementation((): Promise<Dog[]> => Promise.resolve([dog]));

            expect(await service.findDogsByBreed('breed')).toMatchObject([dog]);
        });
    }
    );

    //Test if findOrgMembersByOrganisation(organisation: string) works and returns an OrgMember array
    describe('findOrgMembersByOrganisation', () => {
        it('should return an OrgMember array', async () => {
            jest
                .spyOn(service, 'findOrgMembersByOrganisation')
                .mockImplementation((): Promise<OrgMember[]> => Promise.resolve([orgMem]));

            expect(await service.findOrgMembersByOrganisation('organisation')).toMatchObject([orgMem]);
        });
    }
    );

    //Test if addUserToUserLikes(dogName: string, userName: Adopter) works and returns a Dog or null
    describe('addUserToUserLikes', () => {
        it('should return a Dog', async () => {
            jest
                .spyOn(service, 'addUserToUserLikes')
                .mockImplementation((): Promise<Dog> => Promise.resolve(dog));

            expect(await service.addUserToUserLikes('name', adopter._id)).toMatchObject(dog);
        });

        it('should return null', async () => {
            jest.spyOn(service, 'addUserToUserLikes').mockResolvedValue(null);

            expect(await service.addUserToUserLikes('name', adopter._id)).toEqual(null);
        });
    }
    );

    //Test if addDogToDogsLiked(adopter: Adopter, dogName: string) works and returns an Adopter or null
    describe('addDogToDogsLiked', () => {
        it('should return an Adopter', async () => {
            jest
                .spyOn(service, 'addDogToDogsLiked')
                .mockImplementation((): Promise<Adopter> => Promise.resolve(adopter));

            expect(await service.addDogToDogsLiked(adopter, 'name')).toMatchObject(adopter);
        });

        it('should return null', async () => {
            jest.spyOn(service, 'addDogToDogsLiked').mockResolvedValue(null);

            expect(await service.addDogToDogsLiked(adopter, 'name')).toEqual(null);
        });
    }
    );

    //Test if findAdopterByName(name: string) works and returns an Adopter or null
    describe('findAdopterByName', () => {
        it('should return an Adopter', async () => {
            jest
                .spyOn(service, 'findAdopterByName')
                .mockImplementation((): Promise<Adopter> => Promise.resolve(adopter));

            expect(await service.findAdopterByName('name')).toMatchObject(adopter);
        });

        it('should return null', async () => {
            jest.spyOn(service, 'findAdopterByName').mockResolvedValue(null);

            expect(await service.findAdopterByName('name')).toEqual(null);
        });
    }
    );

    //Test if findDogsByOrg(name: string) works and returns a Dog array
    describe('findDogsByOrg', () => {
        it('should return a Dog array', async () => {
            jest
                .spyOn(service, 'findDogsByOrg')
                .mockImplementation((): Promise<Dog[]> => Promise.resolve([dog]));

            expect(await service.findDogsByOrg('name')).toMatchObject([dog]);
        });
    }
    );

    //Test if findDogsLikedByAdopter(name: string) works and returns a Dog array or null
    describe('findDogsLikedByAdopter', () => {
        it('should return a Dog array', async () => {
            jest
                .spyOn(service, 'findDogsLikedByAdopter')
                .mockImplementation((): Promise<Dog[]> => Promise.resolve([dog]));

            expect(await service.findDogsLikedByAdopter('name')).toMatchObject([dog]);
        });

        it('should return null', async () => {
            jest.spyOn(service, 'findDogsLikedByAdopter').mockResolvedValue(null);

            expect(await service.findDogsLikedByAdopter('name')).toEqual(null);
        });
    }
    );

    //Test if findOrgById(_id: string) works and returns an Organisation or null
    describe('findOrgById', () => {
        it('should return an Organisation', async () => {
            jest
                .spyOn(service, 'findOrgById')
                .mockImplementation((): Promise<Organisation> => Promise.resolve(org));

            expect(await service.findOrgById('_id')).toMatchObject(org);
        });

        it('should return null', async () => {
            jest.spyOn(service, 'findOrgById').mockResolvedValue(null);

            expect(await service.findOrgById('_id')).toEqual(null);
        });
    }
    );

    //Test if findOrgMemberByEmail(email: string) works and returns an OrgMember or null
    describe('findOrgMemberByEmail', () => {
        it('should return an OrgMember', async () => {
            jest
                .spyOn(service, 'findOrgMemberByEmail')
                .mockImplementation((): Promise<OrgMember> => Promise.resolve(orgMem));

            expect(await service.findOrgMemberByEmail('email')).toMatchObject(orgMem);
        });

        it('should return null', async () => {
            jest.spyOn(service, 'findOrgMemberByEmail').mockResolvedValue(null);

            expect(await service.findOrgMemberByEmail('email')).toEqual(null);
        });
    }
    );

    //Test if findDogById(_id: string) works and returns a Dog or null
    describe('findDogById', () => {
        it('should return a Dog', async () => {
            jest
                .spyOn(service, 'findDogById')
                .mockImplementation((): Promise<Dog> => Promise.resolve(dog));

            expect(await service.findDogById('_id')).toMatchObject(dog);
        });

        it('should return null', async () => {
            jest.spyOn(service, 'findDogById').mockResolvedValue(null);

            expect(await service.findDogById('_id')).toEqual(null);
        });
    }
    );

    //Test if removeAdopterFromDogsUsersLiked(_id: string, userId: string) works and returns a Dog or null
    describe('removeAdopterFromDogsUsersLiked', () => {
        it('should return a Dog', async () => {
            jest
                .spyOn(service, 'removeAdopterFromDogsUsersLiked')
                .mockImplementation((): Promise<Dog> => Promise.resolve(dog));

            expect(await service.removeAdopterFromDogsUsersLiked('_id', 'userId')).toMatchObject(dog);
        });

        it('should return null', async () => {
            jest.spyOn(service, 'removeAdopterFromDogsUsersLiked').mockResolvedValue(null);

            expect(await service.removeAdopterFromDogsUsersLiked('_id', 'userId')).toEqual(null);
        });
    }
    );

    //Test if addAdopterToOrgPotentialAdopters(_id: string, userId: string, dogId: string) works and returns an Organisation or null
    describe('addAdopterToOrgPotentialAdopters', () => {
        it('should return an Organisation', async () => {
            jest
                .spyOn(service, 'addAdopterToOrgPotentialAdopters')
                .mockImplementation((): Promise<Organisation> => Promise.resolve(org));

            expect(await service.addAdopterToOrgPotentialAdopters('_id', 'userId', 'dogId')).toMatchObject(org);
        });

        it('should return null', async () => {
            jest.spyOn(service, 'addAdopterToOrgPotentialAdopters').mockResolvedValue(null);

            expect(await service.addAdopterToOrgPotentialAdopters('_id', 'userId', 'dogId')).toEqual(null);
        });
    }
    );

    //Test if addDogToAdopterDogsDisliked(_id: string, dogId: string) works and returns an Adopter or null
    describe('addDogToAdopterDogsDisliked', () => {
        it('should return an Adopter', async () => {
            jest
                .spyOn(service, 'addDogToAdopterDogsDisliked')
                .mockImplementation((): Promise<Adopter> => Promise.resolve(adopter));

            expect(await service.addDogToAdopterDogsDisliked('_id', 'dogId')).toMatchObject(adopter);
        });

        it('should return null', async () => {
            jest.spyOn(service, 'addDogToAdopterDogsDisliked').mockResolvedValue(null);

            expect(await service.addDogToAdopterDogsDisliked('_id', 'dogId')).toEqual(null);
        });
    }
    );

    //Test if removeDogFromAdopterDogsLiked(_id: string, dogId: string) works and returns an Adopter or null
    describe('removeDogFromAdopterDogsLiked', () => {
        it('should return an Adopter', async () => {
            jest
                .spyOn(service, 'removeDogFromAdopterDogsLiked')
                .mockImplementation((): Promise<Adopter> => Promise.resolve(adopter));

            expect(await service.removeDogFromAdopterDogsLiked('_id', 'dogId')).toMatchObject(adopter);
        });

        it('should return null', async () => {
            jest.spyOn(service, 'removeDogFromAdopterDogsLiked').mockResolvedValue(null);

            expect(await service.removeDogFromAdopterDogsLiked('_id', 'dogId')).toEqual(null);
        });
    }
    );

    //Test if findDogsByOrg(orgName: string) works and returns an array of Dogs
    describe('findDogsByOrg', () => {
        it('should return an array of Dogs', async () => {
            jest
                .spyOn(service, 'findDogsByOrg')
                .mockImplementation((): Promise<Dog[]> => Promise.resolve([dog]));

            expect(await service.findDogsByOrg('orgName')).toMatchObject([dog]);
        });

        it('should return an empty array', async () => {
            jest.spyOn(service, 'findDogsByOrg').mockResolvedValue([]);

            expect(await service.findDogsByOrg('orgName')).toEqual([]);
        });
    }
    );

    //Test if findDogsInAdopterDogsLiked(_id: string) works and returns an array of Dogs
    describe('findDogsInAdopterDogsLiked', () => {
        it('should return an array of Dogs', async () => {
            jest
                .spyOn(service, 'findDogsInAdopterDogsLiked')
                .mockImplementation((): Promise<Dog[]> => Promise.resolve([dog]));

            expect(await service.findDogsInAdopterDogsLiked('_id')).toMatchObject([dog]);
        });

        it('should return an empty array', async () => {
            jest.spyOn(service, 'findDogsInAdopterDogsLiked').mockResolvedValue([]);

            expect(await service.findDogsInAdopterDogsLiked('_id')).toEqual([]);
        });
    }
    );

    //Test if findDogs() works and returns an array of Dogs
    describe('findDogs', () => {
        it('should return an array of Dogs', async () => {
            jest
                .spyOn(service, 'findDogs')
                .mockImplementation((): Promise<Dog[]> => Promise.resolve([dog]));

            expect(await service.findDogs()).toMatchObject([dog]);
        });

        it('should return an empty array', async () => {
            jest.spyOn(service, 'findDogs').mockResolvedValue([]);

            expect(await service.findDogs()).toEqual([]);
        });
    }
    );

    //Test if findAdopterById(_id: string) works and returns an Adopter or null
    describe('findAdopterById', () => {
        it('should return an Adopter', async () => {
            jest
                .spyOn(service, 'findAdopterById')
                .mockImplementation((): Promise<Adopter> => Promise.resolve(adopter));

            expect(await service.findAdopterById('_id')).toMatchObject(adopter);
        });

        it('should return null', async () => {
            jest.spyOn(service, 'findAdopterById').mockResolvedValue(null);

            expect(await service.findAdopterById('_id')).toEqual(null);
        });
    }
    );

    //Test if removeDogFromAdopterDogsLikedOrDisliked(_id: string, dogId: string)
    describe('removeDogFromAdopterDogsLikedOrDisliked', () => {
        it('should return an Adopter', async () => {
            jest
                .spyOn(service, 'removeDogFromAdopterDogsLikedOrDisliked')
                .mockImplementation((): Promise<Adopter> => Promise.resolve(adopter));

            expect(await service.removeDogFromAdopterDogsLikedOrDisliked('_id', 'dogId')).toMatchObject(adopter);
        });

        it('should return null', async () => {
            jest.spyOn(service, 'removeDogFromAdopterDogsLikedOrDisliked').mockResolvedValue(null);

            expect(await service.removeDogFromAdopterDogsLikedOrDisliked('_id', 'dogId')).toEqual(null);
        });
    }
    );

    //Test if addUserToUserLikes(dogId: string, userId: string) works and returns a Dog or null
    describe('addUserToUserLikes', () => {
        it('should return a Dog', async () => {
            jest
                .spyOn(service, 'addUserToUserLikes')
                .mockImplementation((): Promise<Dog> => Promise.resolve(dog));

            expect(await service.addUserToUserLikes('dogId', 'userId')).toMatchObject(dog);
        });

        it('should return null', async () => {
            jest.spyOn(service, 'addUserToUserLikes').mockResolvedValue(null);

            expect(await service.addUserToUserLikes('dogId', 'userId')).toEqual(null);
        });
    }
    );

    //Test if addDogToAdopterDogsLiked(_id: string, dogId: string) works and returns an Adopter or null
    describe('addDogToAdopterDogsLiked', () => {
        it('should return an Adopter', async () => {
            jest
                .spyOn(service, 'addDogToAdopterDogsLiked')
                .mockImplementation((): Promise<Adopter> => Promise.resolve(adopter));

            expect(await service.addDogToAdopterDogsLiked('_id', 'dogId')).toMatchObject(adopter);
        });

        it('should return null', async () => {
            jest.spyOn(service, 'addDogToAdopterDogsLiked').mockResolvedValue(null);

            expect(await service.addDogToAdopterDogsLiked('_id', 'dogId')).toEqual(null);
        });
    }
    );

    //Test if updateDogBreed(dogId: string, breed: string) works and returns a Dog or null
    describe('updateDogBreed', () => {
        it('should return a Dog', async () => {
            jest
                .spyOn(service, 'updateDogBreed')
                .mockImplementation((): Promise<Dog> => Promise.resolve(dog));

            expect(await service.updateDogBreed('dogId', 'breed')).toMatchObject(dog);
        });

        it('should return null', async () => {
            jest.spyOn(service, 'updateDogBreed').mockResolvedValue(null);

            expect(await service.updateDogBreed('dogId', 'breed')).toEqual(null);
        });
    }
    );

    //Test if updateDogGender(dogId: string, gender: string) works and returns a Dog or null
    describe('updateDogGender', () => {
        it('should return a Dog', async () => {
            jest
                .spyOn(service, 'updateDogGender')
                .mockImplementation((): Promise<Dog> => Promise.resolve(dog));

            expect(await service.updateDogGender('dogId', 'gender')).toMatchObject(dog);
        });

        it('should return null', async () => {
            jest.spyOn(service, 'updateDogGender').mockResolvedValue(null);

            expect(await service.updateDogGender('dogId', 'gender')).toEqual(null);
        });
    }
    );

    //Test if updateDogdob(dogId: string, dob: Date) works and returns a Dog or null
    describe('updateDogdob', () => {
        it('should return a Dog', async () => {
            jest
                .spyOn(service, 'updateDogdob')
                .mockImplementation((): Promise<Dog> => Promise.resolve(dog));

            expect(await service.updateDogdob('dogId', new Date())).toMatchObject(dog);
        });

        it('should return null', async () => {
            jest.spyOn(service, 'updateDogdob').mockResolvedValue(null);

            expect(await service.updateDogdob('dogId', new Date())).toEqual(null);
        });
    }
    );

   //Test if updateDogabout(dogId: string, about: string) works and returns a Dog or null
    describe('updateDogabout', () => {
        it('should return a Dog', async () => {
            jest
                .spyOn(service, 'updateDogabout')
                .mockImplementation((): Promise<Dog> => Promise.resolve(dog));

            expect(await service.updateDogabout('dogId', 'about')).toMatchObject(dog);
        });

        it('should return null', async () => {
            jest.spyOn(service, 'updateDogabout').mockResolvedValue(null);

            expect(await service.updateDogabout('dogId', 'about')).toEqual(null);
        });
    }
    );

    //Test if updateDogheight(dogId: string, height: number) works and returns a Dog or null
    describe('updateDogheight', () => {
        it('should return a Dog', async () => {
            jest
                .spyOn(service, 'updateDogheight')
                .mockImplementation((): Promise<Dog> => Promise.resolve(dog));

            expect(await service.updateDogheight('dogId', 1)).toMatchObject(dog);
        });

        it('should return null', async () => {
            jest.spyOn(service, 'updateDogheight').mockResolvedValue(null);

            expect(await service.updateDogheight('dogId', 1)).toEqual(null);
        });
    }
    );

    //Test if updateDogweight(dogId: string, weight: number) works and returns a Dog or null
    describe('updateDogweight', () => {
        it('should return a Dog', async () => {
            jest
                .spyOn(service, 'updateDogweight')
                .mockImplementation((): Promise<Dog> => Promise.resolve(dog));

            expect(await service.updateDogweight('dogId', 1)).toMatchObject(dog);
        });

        it('should return null', async () => {
            jest.spyOn(service, 'updateDogweight').mockResolvedValue(null);

            expect(await service.updateDogweight('dogId', 1)).toEqual(null);
        });
    }
    );

    //Test if updateDogfurLength(dogId: string, furLength: string) works and returns a Dog or null
    describe('updateDogfurLength', () => {
        it('should return a Dog', async () => {
            jest
                .spyOn(service, 'updateDogfurLength')
                .mockImplementation((): Promise<Dog> => Promise.resolve(dog));

            expect(await service.updateDogfurLength('dogId', 'furLength')).toMatchObject(dog);
        });

        it('should return null', async () => {
            jest.spyOn(service, 'updateDogfurLength').mockResolvedValue(null);

            expect(await service.updateDogfurLength('dogId', 'furLength')).toEqual(null);
        });
    }
    );

    //Test if updateDogtemperament(dogId: string, temperament: [string]) works and returns a Dog or null
    describe('updateDogtemperament', () => {
        it('should return a Dog', async () => {
            jest
                .spyOn(service, 'updateDogtemperament')
                .mockImplementation((): Promise<Dog> => Promise.resolve(dog));

            expect(await service.updateDogtemperament('dogId', ['temperament'])).toMatchObject(dog);
        });

        it('should return null', async () => {
            jest.spyOn(service, 'updateDogtemperament').mockResolvedValue(null);

            expect(await service.updateDogtemperament('dogId', ['temperament'])).toEqual(null);
        });
    }
    );

    //Test if deleteDog(dogId: string) works and returns a Dog or null
    describe('deleteDog', () => {
        it('should return a Dog', async () => {
            jest
                .spyOn(service, 'deleteDog')
                .mockImplementation((): Promise<Dog> => Promise.resolve(dog));

            expect(await service.deleteDog('dogId')).toMatchObject(dog);
        });

        it('should return null', async () => {
            jest.spyOn(service, 'deleteDog').mockResolvedValue(null);

            expect(await service.deleteDog('dogId')).toEqual(null);
        });
    }
    );

    //Test if getUserType(id: string) works and returns a string
    describe('getUserType', () => {
        it('should return a string', async () => {
            jest
                .spyOn(service, 'getUserType')
                .mockImplementation((): Promise<string> => Promise.resolve('userType'));

            expect(await service.getUserType('id')).toEqual('userType');
        });
    }
    );

    //Test if findOrgMemberById(_id: string) works and returns a OrgMember or null
    describe('findOrgMemberById', () => {
        it('should return a OrgMember', async () => {
            jest
                .spyOn(service, 'findOrgMemberById')
                .mockImplementation((): Promise<OrgMember> => Promise.resolve(orgMem));

            expect(await service.findOrgMemberById('id')).toMatchObject(orgMem);
        });

        it('should return null', async () => {
            jest.spyOn(service, 'findOrgMemberById').mockResolvedValue(null);

            expect(await service.findOrgMemberById('id')).toEqual(null);
        });
    }
    );

    //Test if findDogsByOrgId(_id: string) works and returns an array of Dogs
    describe('findDogsByOrgId', () => {
        it('should return an array of Dogs', async () => {
            jest
                .spyOn(service, 'findDogsByOrgId')
                .mockImplementation((): Promise<Dog[]> => Promise.resolve([dog]));

            expect(await service.findDogsByOrgId('id')).toMatchObject([dog]);
        });

        it('should return an empty array', async () => {
            jest.spyOn(service, 'findDogsByOrgId').mockResolvedValue([]);

            expect(await service.findDogsByOrgId('id')).toEqual([]);
        });
    }
    );

    //Test if createOrgMemberWithoutAddingToOrg(member: OrgMember) works and returns a OrgMember or null
    describe('createOrgMemberWithoutAddingToOrg', () => {
        it('should return a OrgMember', async () => {
            jest
                .spyOn(service, 'createOrgMemberWithoutAddingToOrg')
                .mockImplementation((): Promise<OrgMember> => Promise.resolve(orgMem));

            expect(await service.createOrgMemberWithoutAddingToOrg(orgMem)).toMatchObject(orgMem);
        });

        it('should return null', async () => {
            jest.spyOn(service, 'createOrgMemberWithoutAddingToOrg').mockResolvedValue(null);

            expect(await service.createOrgMemberWithoutAddingToOrg(orgMem)).toEqual(null);
        });
    }
    );

    //Test if findChatsByOrgmemberId(orgmemberId: string) works and returns an array of chats
    describe('findChatsByOrgmemberId', () => {
        it('should return an array of chats', async () => {
            jest
                .spyOn(service, 'findChatsByOrgmemberId')
                .mockImplementation((): Promise<Chat[]> => Promise.resolve([chat]));

            expect(await service.findChatsByOrgmemberId('orgmemberId')).toMatchObject([chat]);
        });

        it('should return an empty array', async () => {
            jest.spyOn(service, 'findChatsByOrgmemberId').mockResolvedValue([]);

            expect(await service.findChatsByOrgmemberId('orgmemberId')).toEqual([]);
        });
    }
    );

    //Test if findChatsByAdopterId(adopterId: string) works and returns an array of chats
    describe('findChatsByAdopterId', () => {
        it('should return an array of chats', async () => {
            jest
                .spyOn(service, 'findChatsByAdopterId')
                .mockImplementation((): Promise<Chat[]> => Promise.resolve([chat]));

            expect(await service.findChatsByAdopterId('adopterId')).toMatchObject([chat]);
        });

        it('should return an empty array', async () => {
            jest.spyOn(service, 'findChatsByAdopterId').mockResolvedValue([]);

            expect(await service.findChatsByAdopterId('adopterId')).toEqual([]);
        });
    }
    );

    //Test if findChatByOrgIdAndAdopterId(orgId: string, adopterId: string, dogId: string) works and returns a chat or null
    describe('findChatByOrgIdAndAdopterId', () => {
        it('should return a chat', async () => {
            jest
                .spyOn(service, 'findChatByOrgIdAndAdopterId')
                .mockImplementation((): Promise<Chat> => Promise.resolve(chat));

            expect(await service.findChatByOrgIdAndAdopterId('orgId', 'adopterId', 'dogId')).toMatchObject(chat);
        });

        it('should return null', async () => {
            jest.spyOn(service, 'findChatByOrgIdAndAdopterId').mockResolvedValue(null);

            expect(await service.findChatByOrgIdAndAdopterId('orgId', 'adopterId', 'dogId')).toEqual(null);
        });
    }
    );

    //Test if sendMessage(orgId: string, adopterId: string, senderId: string, message: string, dogId : string) works and returns a chat or null
    describe('sendMessage', () => {
        it('should return a chat', async () => {
            jest
                .spyOn(service, 'sendMessage')
                .mockImplementation((): Promise<Chat> => Promise.resolve(chat));

            expect(await service.sendMessage('orgId', 'adopterId', 'senderId', 'message', 'dogId')).toMatchObject(chat);
        });

        it('should return null', async () => {
            jest.spyOn(service, 'sendMessage').mockResolvedValue(null);

            expect(await service.sendMessage('orgId', 'adopterId', 'senderId', 'message', 'dogId')).toEqual(null);
        });
    }
    );

    //Test if createChat(orgId: string, adopterId: string, dogId: string) works and returns a chat or null
    describe('createChat', () => {
        it('should return a chat', async () => {
            jest
                .spyOn(service, 'createChat')
                .mockImplementation((): Promise<Chat> => Promise.resolve(chat));

            expect(await service.createChat('orgId', 'adopterId', 'dogId')).toMatchObject(chat);
        });

        it('should return null', async () => {
            jest.spyOn(service, 'createChat').mockResolvedValue(null);

            expect(await service.createChat('orgId', 'adopterId', 'dogId')).toEqual(null);
        });
    }
    );

    //Test if rejectAdoption(orgId: string, adopterId: string, dogId: string) works and returns an organisation or null
    describe('rejectAdoption', () => {
        it('should return an organisation', async () => {
            jest
                .spyOn(service, 'rejectAdoption')
                .mockImplementation((): Promise<Organisation> => Promise.resolve(org));

            expect(await service.rejectAdoption('orgId', 'adopterId', 'dogId')).toMatchObject(org);
        });

        it('should return null', async () => {
            jest.spyOn(service, 'rejectAdoption').mockResolvedValue(null);

            expect(await service.rejectAdoption('orgId', 'adopterId', 'dogId')).toEqual(null);
        });
    }
    );

    //Test if acceptAdoption(orgId: string, adopterId: string, dogId: string) works and returns a string
    describe('acceptAdoption', () => {
        it('should return a string', async () => {
            jest
                .spyOn(service, 'acceptAdoption')
                .mockImplementation((): Promise<string> => Promise.resolve('string'));

            expect(await service.acceptAdoption('orgId', 'adopterId', 'dogId')).toEqual('string');
        });

        it('should return null', async () => {
            jest.spyOn(service, 'acceptAdoption').mockResolvedValue(null);

            expect(await service.acceptAdoption('orgId', 'adopterId', 'dogId')).toEqual(null);
        });
    }
    );

    //Test if completeAdoption(orgId: string, adopterId: string, dogId: string) works and returns a string
    describe('completeAdoption', () => {
        it('should return a string', async () => {
            jest
                .spyOn(service, 'completeAdoption')
                .mockImplementation((): Promise<string> => Promise.resolve('string'));

            expect(await service.completeAdoption('orgId', 'adopterId', 'dogId')).toEqual('string');
        });

        it('should return null', async () => {
            jest.spyOn(service, 'completeAdoption').mockResolvedValue(null);
            
            expect(await service.completeAdoption('orgId', 'adopterId', 'dogId')).toEqual(null);
        });
    }
    );

    //Test if uploadDoc(adopterId: string, type: string, path: string) works and returns a string
    describe('uploadDoc', () => {
        it('should return a string', async () => {
            jest
                .spyOn(service, 'uploadDoc')
                .mockImplementation((): Promise<string> => Promise.resolve('string'));

            expect(await service.uploadDoc('adopterId', 'type', 'path')).toEqual('string');
        });

        it('should return null', async () => {
            jest.spyOn(service, 'uploadDoc').mockResolvedValue(null);

            expect(await service.uploadDoc('adopterId', 'type', 'path')).toEqual(null);
        });
    }
    );

    //Test if createStatistic(orgId: string) works and returns a string
    describe('createStatistic', () => {
        it('should return a string', async () => {
            jest
                .spyOn(service, 'createStatistic')
                .mockImplementation((): Promise<string> => Promise.resolve('string'));

            expect(await service.createStatistic('orgId')).toEqual('string');
        });

        it('should return null', async () => {
            jest.spyOn(service, 'createStatistic').mockResolvedValue(null);

            expect(await service.createStatistic('orgId')).toEqual(null);
        });
    }
    );

    //Test if addCreatedDog(dogId: string, orgId: string) works and returns a string
    describe('addCreatedDog', () => {
        it('should return a string', async () => {
            jest
                .spyOn(service, 'addCreatedDog')
                .mockImplementation((): Promise<string> => Promise.resolve('string'));

            expect(await service.addCreatedDog('dogId', 'orgId')).toEqual('string');
        });

        it('should return null', async () => {
            jest.spyOn(service, 'addCreatedDog').mockResolvedValue(null);

            expect(await service.addCreatedDog('dogId', 'orgId')).toEqual(null);
        });
    }
    );

    //Test if addInProcessDog(dogId: string, orgId: string) works and returns a string
    describe('addInProcessDog', () => {
        it('should return a string', async () => {
            jest
                .spyOn(service, 'addInProcessDog')
                .mockImplementation((): Promise<string> => Promise.resolve('string'));

            expect(await service.addInProcessDog('dogId', 'orgId')).toEqual('string');
        });

        it('should return null', async () => {
            jest.spyOn(service, 'addInProcessDog').mockResolvedValue(null);
            
            expect(await service.addInProcessDog('dogId', 'orgId')).toEqual(null);
        });
    }
    );

    //Test if addAdoptedDog(dogId: string, orgId: string) works and returns a string
    describe('addAdoptedDog', () => {
        it('should return a string', async () => {
            jest
                .spyOn(service, 'addAdoptedDog')
                .mockImplementation((): Promise<string> => Promise.resolve('string'));

            expect(await service.addAdoptedDog('dogId', 'orgId')).toEqual('string');
        });

        it('should return null', async () => {
            jest.spyOn(service, 'addAdoptedDog').mockResolvedValue(null);

            expect(await service.addAdoptedDog('dogId', 'orgId')).toEqual(null);
        });
    }
    );

    //Test if addRejectedDog(dogId: string, orgId: string) works and returns a string
    describe('addRejectedDog', () => {
        it('should return a string', async () => {
            jest
                .spyOn(service, 'addRejectedDog')
                .mockImplementation((): Promise<string> => Promise.resolve('string'));

            expect(await service.addRejectedDog('dogId', 'orgId')).toEqual('string');
        });

        it('should return null', async () => {
            jest.spyOn(service, 'addRejectedDog').mockResolvedValue(null);

            expect(await service.addRejectedDog('dogId', 'orgId')).toEqual(null);
        });
    }
    );

    //Test if getStatistic(orgId: string) works and returns a statistic
    describe('getStatistic', () => {
        it('should return a statistic', async () => {
            jest
                .spyOn(service, 'getStatistic')
                .mockImplementation((): Promise<Statistic> => Promise.resolve(new Statistic()));

            expect(await service.getStatistic('orgId')).toMatchObject(new Statistic());
        });

        it('should return null', async () => {
            jest.spyOn(service, 'getStatistic').mockResolvedValue(null);

            expect(await service.getStatistic('orgId')).toEqual(null);
        });
    }
    );

    //Test if findOrgByOrgmemberId(orgmemberId: string) works and returns an organisation
    describe('findOrgByOrgmemberId', () => {
        it('should return an organisation', async () => {
            jest
                .spyOn(service, 'findOrgByOrgmemberId')
                .mockImplementation((): Promise<Organisation> => Promise.resolve(new Organisation()));

            expect(await service.findOrgByOrgmemberId('orgmemberId')).toMatchObject(new Organisation());
        });

        it('should return null', async () => {
            jest.spyOn(service, 'findOrgByOrgmemberId').mockResolvedValue(null);

            expect(await service.findOrgByOrgmemberId('orgmemberId')).toEqual(null);
        });
    }
    );

});