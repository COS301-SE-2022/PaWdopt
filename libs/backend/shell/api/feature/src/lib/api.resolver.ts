import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ApiService } from './api.service';
import { DogType, OrganisationType, LocationType, PicType, ContactInfoType, DocType, AdopterType, OrgMemberType } from './api.dto';
import { Dog, Pic, Organisation, Location, ContactInfo, Doc, Adopter} from './api.schema';


@Resolver()
export class ApiResolver {
    constructor(private readonly DogService: ApiService) {}

    @Mutation(() => OrganisationType)
    async createOrg(@Args('org') org: OrganisationType) : Promise<OrganisationType> {
        return this.DogService.createOrg(org);
    }

    @Mutation(()  => OrganisationType)
    async updateOrg(@Args ('name') name: string, @Args('org') org: OrganisationType) : Promise<OrganisationType> {
        return this.DogService.updateOrg(name, org);
    }

    @Mutation(() => OrganisationType)
    async deleteOrg(@Args('name') name: string) : Promise<OrganisationType> {
        return this.DogService.deleteOrg(name);
    }

    @Mutation(() => OrgMemberType)
    async createOrgMember(@Args('member') member: OrgMemberType) : Promise<OrgMemberType> {
        return this.DogService.createOrgMember(member);
    }

    @Mutation(() => OrgMemberType)
    async updateOrgMember(@Args('email') email: string, @Args('member') member: OrgMemberType) : Promise<OrgMemberType> {
        return this.DogService.updateOrgMember(email, member);
    }

    @Mutation(() => OrgMemberType)
    async deleteOrgMember(@Args('email') email: string) : Promise<OrgMemberType> {
        return this.DogService.deleteOrgMember(email);
    }

    @Mutation(() => DogType)
    async createDog(@Args('dog') dog: DogType) : Promise<DogType> {
        return this.DogService.createDog(dog);
    }

    @Mutation(() => DogType)
    async updateDog(@Args('id') id: string, @Args('dog') dog: DogType) : Promise<DogType> {
        return this.DogService.updateDog(id, dog);
    }

    @Mutation(() => DogType)
    async deleteDog(@Args('id') id: string) : Promise<DogType> {
        return this.DogService.deleteDog(id);
    }

    @Mutation(() => PicType)
    async createPic(@Args('pic') pic: PicType) : Promise<PicType> {
        return this.DogService.createPic(pic);
    }

    @Mutation(() => PicType)
    async updatePic(@Args('id') id: string, @Args('pic') pic: PicType) : Promise<PicType> {
        return this.DogService.updatePic(id, pic);
    }

    @Mutation(() => PicType)
    async deletePic(@Args('id') id: string) : Promise<PicType> {
        return this.DogService.deletePic(id);
    }

    @Mutation(() => LocationType)
    async createLocation(@Args('location') location: LocationType) : Promise<LocationType> {
        return this.DogService.createLocation(location);
    }

    @Mutation(() => LocationType)
    async updateLocation(@Args('id') id: string, @Args('location') location: LocationType) : Promise<LocationType> {
        return this.DogService.updateLocation(id, location);
    }

    @Mutation(() => LocationType)
    async deleteLocation(@Args('id') id: string) : Promise<LocationType> {
        return this.DogService.deleteLocation(id);
    }

    @Mutation(() => ContactInfoType)
    async createContactInfo(@Args('contactInfo') contactInfo: ContactInfoType) : Promise<ContactInfoType> {
        return this.DogService.createContactInfo(contactInfo);
    }

    @Mutation(() => ContactInfoType)
    async updateContactInfo(@Args('id') id: string, @Args('contactInfo') contactInfo: ContactInfoType) : Promise<ContactInfoType> {
        return this.DogService.updateContactInfo(id, contactInfo);
    }

    @Mutation(() => ContactInfoType)
    async deleteContactInfo(@Args('id') id: string) : Promise<ContactInfoType> {
        return this.DogService.deleteContactInfo(id);
    }

    @Mutation(() => DocType)
    async createDoc(@Args('doc') doc: DocType) : Promise<DocType> {
        return this.DogService.createDoc(doc);
    }

    @Mutation(() => DocType)
    async updateDoc(@Args('id') id: string, @Args('doc') doc: DocType) : Promise<DocType> {
        return this.DogService.updateDoc(id, doc);
    }

    @Mutation(() => DocType)
    async deleteDoc(@Args('id') id: string) : Promise<DocType> {
        return this.DogService.deleteDoc(id);
    }

    @Mutation(() => AdopterType)
    async createAdopter(@Args('adopter') adopter: AdopterType) : Promise<AdopterType> {
        return this.DogService.createAdopter(adopter);
    }

    @Mutation(() => AdopterType)
    async updateAdopter(@Args('email') email: string, @Args('adopter') adopter: AdopterType) : Promise<AdopterType> {
        return this.DogService.updateAdopter(email, adopter);
    }

    @Mutation(() => AdopterType)
    async deleteAdopter(@Args('email') email: string) : Promise<AdopterType> {
        return this.DogService.deleteAdopter(email);
    }

    @Query(() => PicType)
    async findPic(@Args('id') id: string) : Promise<PicType> {
        return this.DogService.findPic(id);
    }

    @Query(() => DogType)
    async findDog(@Args('name') name: string) : Promise<DogType> {
        return this.DogService.findDog(name);
    }

    @Query(() => [DogType])
    async findDogsByName(@Args('name') name: string) : Promise<DogType[]> {
        return this.DogService.findDogsByName(name);
    }

    @Query(() => [DogType])
    async findDogsByBreed(@Args('breed') breed: string) : Promise<DogType[]> {
        return this.DogService.findDogsByBreed(breed);
    }

    @Query(() => [DogType])
    async findDogs() : Promise<DogType[]> {
        return this.DogService.findDogs();
    }

    @Query(() => [DogType])
    async findDogsByOrg(@Args('org') org: OrganisationType) : Promise<DogType[]> {
        return this.DogService.findDogsByOrganisation(org);
    }

    @Query(() => [OrgMemberType])
    async findOrgMembersByOrganisation(@Args('org') org: string) : Promise<OrgMemberType[]> {
        return this.DogService.findOrgMembersByOrganisation(org);
    }

    @Query(() => [Boolean])
    async emailExists(@Args('email') email: string) : Promise<boolean> {
        return this.DogService.adopterEmailExists(email) || this.DogService.orgMemberEmailExists(email);
    }

    @Mutation(() => DogType)
    async UserSwipesRightOnDog(@Args('userName') userName: string, @Args('dogName') dogName: string) : Promise<DogType | null> {
        const user = await this.DogService.findAdopterByName(userName)
        console.log(user);
        const ret = await this.DogService.addUserToUserLikes(dogName, user);
        console.log(ret);
        return ret;
    }

    @Query(() => DogType)
    async UpdateDogBreed(@Args('dogName') dogName: string, @Args('breed') breed: string) : Promise<DogType> {
        return this.DogService.updateDogBreed(dogName, breed);
    }

    @Query(() => DogType)
    async UpdateDogGender(@Args('dogName') dogName: string, @Args('gender') gender: string) : Promise<DogType> {
        return this.DogService.updateDogGender(dogName, gender);
    }

    @Query(() => DogType)
    async UpdateDogFurlength(@Args('dogName') dogName: string, @Args('furlength') furlength: string) : Promise<DogType> {
        return this.DogService.updateDogFurLength(dogName, furlength);
    }

    @Query(() => DogType)
    async UpdateDogAbout(@Args('dogName') dogName: string, @Args('about') about: string) : Promise<DogType> {
        return this.DogService.updateDogAbout(dogName, about);
    }

    @Query(() => DogType)
    async UpdateDogWeight(@Args('dogName') dogName: string, @Args('weight') weight: number) : Promise<DogType> {
        return this.DogService.updateDogWeight(dogName, weight);
    }

    @Query(() => DogType)
    async UpdateDogHeight(@Args('dogName') dogName: string, @Args('height') height: number) : Promise<DogType> {
        return this.DogService.updateDogHeight(dogName, height);
    }

    //query to update temperament of dog
    /*@Query(() => DogType)
    async UpdateDogTemperament(@Args('dogName') dogName: string, @Args('temperament') temperament: string[]) : Promise<DogType> {
        const ret = temperament;
        return this.DogService.updateDogTemperament(dogName, ret);
    }*/

    //query to update dogs dob
    @Query(() => DogType)
    async UpdateDogDob(@Args('dogName') dogName: string, @Args('dob') dob: Date) : Promise<DogType> {
        return this.DogService.updateDogDob(dogName, dob);
    }

    @Query(() => OrgMemberType, {nullable: true})
    async loginOrg(@Args('email') email: string, @Args('password') password: string) : Promise<OrgMemberType> {
        
        return this.DogService.loginOrgMember(email, password);
         
    }

    @Query(() => AdopterType, {nullable: true})
    async loginAdopter(@Args('email') email: string, @Args('password') password: string) : Promise<AdopterType> {
        return this.DogService.loginAdopter(email, password);
          
    }





}