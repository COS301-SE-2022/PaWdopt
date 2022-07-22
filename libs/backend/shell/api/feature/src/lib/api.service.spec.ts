import { Test, TestingModule } from '@nestjs/testing';
import { ApiService} from './api.service';
import { Dog, Organisation, Location, OrgMember, ContactInfo,  Adopter, DogDocument,  OrgMemberDocument, OrganisationDocument, AdopterDocument,  ContactInfoDocument, LocationDocument } from './api.schema';
import { DogType, OrganisationType, LocationType,  ContactInfoType,  AdopterType, OrgMemberType } from './api.dto';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';

/*describe('ApiService', () => {
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
        usersLiked: null,
        orgName: 'orgName',
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
        temperament: ["temp1"],
        orgName: 'orgName'
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

    //Test if findPic(id: string) works and returns a Pic or null
    describe('findPic', () => {
        it('should return a Pic', async () => {
            jest
                .spyOn(service, 'findPic')
                .mockImplementation((): Promise<Pic> => Promise.resolve(pic));

            expect(await service.findPic('id')).toMatchObject(pic);
        });

        it('should return null', async () => {
            jest.spyOn(service, 'findPic').mockResolvedValue(null);

            expect(await service.findPic('id')).toEqual(null);
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

    //Test if adopterEmailExists(email: string) works and returns true or false
    describe('adopterEmailExists', () => {
        it('should return true', async () => {
            jest
                .spyOn(service, 'adopterEmailExists')
                .mockImplementation((): Promise<boolean> => Promise.resolve(true));

            expect(await service.adopterEmailExists('email')).toEqual(true);
        });

        it('should return false', async () => {
            jest.spyOn(service, 'adopterEmailExists').mockResolvedValue(false);

            expect(await service.adopterEmailExists('email')).toEqual(false);
        });
    }
    );

    //Test if orgMemberEmailExists(email: string) works and returns true or false
    describe('orgMemberEmailExists', () => {
        it('should return true', async () => {
            jest
                .spyOn(service, 'orgMemberEmailExists')
                .mockImplementation((): Promise<boolean> => Promise.resolve(true));

            expect(await service.orgMemberEmailExists('email')).toEqual(true);
        });

        it('should return false', async () => {
            jest.spyOn(service, 'orgMemberEmailExists').mockResolvedValue(false);

            expect(await service.orgMemberEmailExists('email')).toEqual(false);
        });
    }
    );

    //Test if organisationNameExists(name: string) works and returns true or false
    describe('organisationNameExists', () => {
        it('should return true', async () => {
            jest
                .spyOn(service, 'organisationNameExists')
                .mockImplementation((): Promise<boolean> => Promise.resolve(true));

            expect(await service.organisationNameExists('name')).toEqual(true);
        });

        it('should return false', async () => {
            jest.spyOn(service, 'organisationNameExists').mockResolvedValue(false);

            expect(await service.organisationNameExists('name')).toEqual(false);
        });
    }
    );

    //Test if addUserToUserLikes(dogName: string, userName: Adopter) works and returns a Dog or null
    describe('addUserToUserLikes', () => {
        it('should return a Dog', async () => {
            jest
                .spyOn(service, 'addUserToUserLikes')
                .mockImplementation((): Promise<Dog> => Promise.resolve(dog));

            expect(await service.addUserToUserLikes('name', adopter)).toMatchObject(dog);
        });

        it('should return null', async () => {
            jest.spyOn(service, 'addUserToUserLikes').mockResolvedValue(null);

            expect(await service.addUserToUserLikes('name', adopter)).toEqual(null);
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

    //Test if updateDogBreed(name: string, breed: string) works and returns a Dog or null
    describe('updateDogBreed', () => {
        it('should return a Dog', async () => {
            jest
                .spyOn(service, 'updateDogBreed')
                .mockImplementation((): Promise<Dog> => Promise.resolve(dog));

            expect(await service.updateDogBreed('name', 'breed')).toMatchObject(dog);
        });

        it('should return null', async () => {
            jest.spyOn(service, 'updateDogBreed').mockResolvedValue(null);

            expect(await service.updateDogBreed('name', 'breed')).toEqual(null);
        });
    }
    );

    //Test if updateDogGender(name: string, gender: string) works and returns a Dog or null
    describe('updateDogGender', () => {
        it('should return a Dog', async () => {
            jest
                .spyOn(service, 'updateDogGender')
                .mockImplementation((): Promise<Dog> => Promise.resolve(dog));

            expect(await service.updateDogGender('name', 'gender')).toMatchObject(dog);
        });

        it('should return null', async () => {
            jest.spyOn(service, 'updateDogGender').mockResolvedValue(null);

            expect(await service.updateDogGender('name', 'gender')).toEqual(null);
        });
    }
    );

    //Test if updateDogAbout(name: string, about: string) works and returns a Dog or null
    describe('updateDogAbout', () => {
        it('should return a Dog', async () => {
            jest
                .spyOn(service, 'updateDogAbout')
                .mockImplementation((): Promise<Dog> => Promise.resolve(dog));

            expect(await service.updateDogAbout('name', 'about')).toMatchObject(dog);
        });

        it('should return null', async () => {
            jest.spyOn(service, 'updateDogAbout').mockResolvedValue(null);

            expect(await service.updateDogAbout('name', 'about')).toEqual(null);
        });
    }
    );

    //Test if updateDogFurLength(name: string, furLength: string) works and returns a Dog or null
    describe('updateDogFurLength', () => {
        it('should return a Dog', async () => {
            jest
                .spyOn(service, 'updateDogFurLength')
                .mockImplementation((): Promise<Dog> => Promise.resolve(dog));

            expect(await service.updateDogFurLength('name', 'furLength')).toMatchObject(dog);
        });

        it('should return null', async () => {
            jest.spyOn(service, 'updateDogFurLength').mockResolvedValue(null);

            expect(await service.updateDogFurLength('name', 'furLength')).toEqual(null);
        });
    }
    );

    //Test if updateDogDob(name: string, dob: Date) works and returns a Dog or null
    describe('updateDogDob', () => {
        it('should return a Dog', async () => {
            jest
                .spyOn(service, 'updateDogDob')
                .mockImplementation((): Promise<Dog> => Promise.resolve(dog));

            expect(await service.updateDogDob('name', new Date())).toMatchObject(dog);
        });

        it('should return null', async () => {
            jest.spyOn(service, 'updateDogDob').mockResolvedValue(null);

            expect(await service.updateDogDob('name', new Date())).toEqual(null);
        });
    }
    );

    //Test if updateDogWeight(name: string, weight: number) works and returns a Dog or null
    describe('updateDogWeight', () => {
        it('should return a Dog', async () => {
            jest
                .spyOn(service, 'updateDogWeight')
                .mockImplementation((): Promise<Dog> => Promise.resolve(dog));

            expect(await service.updateDogWeight('name', 1)).toMatchObject(dog);
        });

        it('should return null', async () => {
            jest.spyOn(service, 'updateDogWeight').mockResolvedValue(null);

            expect(await service.updateDogWeight('name', 1)).toEqual(null);
        });
    }
    );

    //Test if updateDogHeight(name: string, height: number) works and returns a Dog or null
    describe('updateDogHeight', () => {
        it('should return a Dog', async () => {
            jest
                .spyOn(service, 'updateDogHeight')
                .mockImplementation((): Promise<Dog> => Promise.resolve(dog));

            expect(await service.updateDogHeight('name', 1)).toMatchObject(dog);
        });

        it('should return null', async () => {
            jest.spyOn(service, 'updateDogHeight').mockResolvedValue(null);

            expect(await service.updateDogHeight('name', 1)).toEqual(null);
        });
    }
    );

    //Test if loginAdopter(email: string, password: string) works and returns an Adopter or null
    describe('loginAdopter', () => {
        it('should return an Adopter', async () => {
            jest
                .spyOn(service, 'loginAdopter')
                .mockImplementation((): Promise<Adopter> => Promise.resolve(adopter));

            expect(await service.loginAdopter('email', 'password')).toMatchObject(adopter);
        });

        it('should return null', async () => {
            jest.spyOn(service, 'loginAdopter').mockResolvedValue(null);

            expect(await service.loginAdopter('email', 'password')).toEqual(null);
        });
    }
    );

    //Test if loginOrgMember(email: string, password: string) works and returns a OrgMember or null
    describe('loginOrgMember', () => {
        it('should return a OrgMember', async () => {
            jest
                .spyOn(service, 'loginOrgMember')
                .mockImplementation((): Promise<OrgMember> => Promise.resolve(orgMem));

            expect(await service.loginOrgMember('email', 'password')).toMatchObject(orgMem);
        });

        it('should return null', async () => {
            jest.spyOn(service, 'loginOrgMember').mockResolvedValue(null);

            expect(await service.loginOrgMember('email', 'password')).toEqual(null);
        });
    }
    );

    //Test if findOrgByName(name: string) works and returns an Organisation or null
    describe('findOrgByName', () => {
        it('should return an Organisation', async () => {
            jest
                .spyOn(service, 'findOrgByName')
                .mockImplementation((): Promise<Organisation> => Promise.resolve(org));

            expect(await service.findOrgByName('name')).toMatchObject(org);
        });

        it('should return null', async () => {
            jest.spyOn(service, 'findOrgByName').mockResolvedValue(null);

            expect(await service.findOrgByName('name')).toEqual(null);
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

    //Test if deleteDogByName(name: string) works and returns a Dog or null
    describe('deleteDogByName', () => {
        it('should return a Dog', async () => {
            jest
                .spyOn(service, 'deleteDogByName')
                .mockImplementation((): Promise<Dog> => Promise.resolve(dog));

            expect(await service.deleteDogByName('name')).toMatchObject(dog);
        });

        it('should return null', async () => {
            jest.spyOn(service, 'deleteDogByName').mockResolvedValue(null);

            expect(await service.deleteDogByName('name')).toEqual(null);
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
});*/