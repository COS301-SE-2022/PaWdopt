import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ApiService } from './api.service';
import { DogType, OrganisationType, LocationType, ContactInfoType, AdopterType, OrgMemberType } from './api.dto';
import { Dog,  Organisation, Location, ContactInfo, Adopter} from './api.schema';

import { Types } from 'mongoose';

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
    async deleteDog(@Args('id') id: string) : Promise<DogType> {
        return this.DogService.deleteDog(id);
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


    @Query(() => DogType, {nullable: true})
    async findDog(@Args('name') name: string) : Promise<DogType | null> {
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

    @Query(() => Boolean)
    async emailExists(@Args('email') email: string) : Promise<boolean> {
        const temp1 = await this.DogService.adopterEmailExists(email);
        const temp2 = await this.DogService.orgMemberEmailExists(email);
        const temp3 = temp1 || temp2;
        return temp3;
    }

    @Query(() => Boolean)
    async organisationNameExists(@Args('name') name: string) : Promise<boolean> {
        return this.DogService.organisationNameExists(name);
    }

    @Mutation(() => DogType)
    async userSwipesRightOnDog(@Args('userName') userName: string, @Args('dogName') dogName: string) : Promise<DogType | null> {
        const user = await this.DogService.findAdopterByName(userName);
        if(user != null){
            await this.DogService.addDogToDogsLiked(user, dogName);
            const ret = await this.DogService.addUserToUserLikes(dogName, user);
            return ret;
        }
        else{
            return null;
        }
    }

    @Mutation(() => DogType)
    async updateDogBreed(@Args('dogName') dogName: string, @Args('breed') breed: string) : Promise<DogType> {
        const dog = await this.DogService.findDog(dogName);
        if(breed == dog.breed){
            return dog;
        }
        else {
            return this.DogService.updateDogBreed(dogName, breed);
        }
    }

    @Mutation(() => DogType)
    async updateDogGender(@Args('dogName') dogName: string, @Args('gender') gender: string) : Promise<DogType> {
        const dog = await this.DogService.findDog(dogName);
        if(gender == dog.gender){
            return dog;
        }
        else{
            return this.DogService.updateDogGender(dogName, gender);
        }
    }

    @Mutation(() => DogType)
    async updateDogFurlength(@Args('dogName') dogName: string, @Args('furLength') furLength: string) : Promise<DogType> {
        const dog = await this.DogService.findDog(dogName);
        if(furLength == dog.furLength){
            return dog;
        }
        else {
            return this.DogService.updateDogFurLength(dogName, furLength);
        }
    }

    @Mutation(() => DogType)
    async updateDogAbout(@Args('dogName') dogName: string, @Args('about') about: string) : Promise<DogType> {
        const dog = await this.DogService.findDog(dogName);
        if(about == dog.about){
            return dog;
        }
        else {
            return this.DogService.updateDogAbout(dogName, about);
        }
    }

    @Mutation(() => DogType)
    async updateDogWeight(@Args('dogName') dogName: string, @Args('weight') weight: number) : Promise<DogType> {
        const dog = await this.DogService.findDog(dogName);
        if(weight == dog.weight){
            return dog;
        }
        else {
            return this.DogService.updateDogWeight(dogName, weight);
        }
    }

    @Mutation(() => DogType)
    async updateDogHeight(@Args('dogName') dogName: string, @Args('height') height: number) : Promise<DogType> {
        const dog = await this.DogService.findDog(dogName);
        if(height == dog.height){
            return dog;
        }
        else {
            return this.DogService.updateDogHeight(dogName, height);
        }
    }

    //query to update temperament of dog
    /*@Query(() => DogType)
    async UpdateDogTemperament(@Args('dogName') dogName: string, @Args('temperament') temperament: string[]) : Promise<DogType> {
        const ret = temperament;
        return this.DogService.updateDogTemperament(dogName, ret);
    }*/

    //query to update dogs dob
    @Query(() => DogType)
    async updateDogDob(@Args('dogName') dogName: string, @Args('dob') dob: Date) : Promise<DogType> {
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
    /**
     * find adopter by email
     * @param email
     * @returns adopter
     * 
     */
    @Query(() => AdopterType, {nullable: true})
    async findAdopterByEmail(@Args('email') email: string) : Promise<AdopterType> {
        return this.DogService.findAdopter(email);
    }

    /**
     * find adopter by _id
     * @param _id
     * @returns adopter
     * 
     */
    @Query(() => AdopterType, {nullable: true})
    async findAdopterBy_Id(@Args('_id') _id: string) : Promise<AdopterType> {
        return this.DogService.findAdopterBy_Id(_id);
    }

    /**
     * find dogs by org name
     * @param orgName
     * @returns dogs
     * 
     */
    @Query(() => [DogType])
    async findDogsByOrgName(@Args('orgName') orgName: string) : Promise<DogType[]> {
        return this.DogService.findDogsByOrg(orgName);
    }

    /**
     * delete dog by name
     * @param name
     * @returns dog
     * 
     */
    @Mutation(() => DogType)
    async deleteDogbyName(@Args('name') name: string) : Promise<DogType> {
        return this.DogService.deleteDogByName(name);
    }

    /**
     * find dogs liked by adopter
     * @param adopterName
     * @returns dogs
     */
    @Query(() => [DogType])
    async findDogsLikedByAdopter(@Args('adopterName') adopterName: string) : Promise<DogType[]> {
        return this.DogService.findDogsLikedByAdopter(adopterName);
    }

    //=========================================================================================================================================================
    //=========================================================================================================================================================
    //=========================================================================================================================================================
    //=========================================================================================================================================================
    //=========================================================================================================================================================
    //=========================================================================================================================================================
    //=========================================================================================================================================================
    //new queries

    /**
     * used in AddDog Page
     * create a dog
     * @param dog
     * @param orgName
     * @returns dog
     */
    @Mutation(() => DogType)
    async createDog(@Args('dog') dog: DogType, @Args('orgName') orgName: string) : Promise<DogType> {
        const org = await this.DogService.findOrgByName(orgName);
        dog._id = (new Types.ObjectId()).toHexString();
        dog.organisation = org;
        return this.DogService.createDog(dog);
    }

    /**
     * used in AddDog Page
     * find org by name
     * @param name
     * @returns organisation
     */
    @Query(() => OrganisationType)
    async findOrgByName(@Args('name') name: string) : Promise<OrganisationType> {
        return this.DogService.findOrgByName(name);
    }

    /**
     * used in AddDog Page
     * find orgMember by email
     * @param email
     * @returns orgMember
     */
    @Query(() => OrgMemberType)
    async findOrgMemberByEmail(@Args('email') email: string) : Promise<OrgMemberType> {
        return this.DogService.findOrgMemberByEmail(email);
    }

    /**
     * used in dashboard page
     * find dog by _id
     * @param _id
     * @returns dog
     */
    @Query(() => DogType)
    async findDogById(@Args('_id') _id: string) : Promise<DogType> {
        return this.DogService.findDogById(_id);
    }

    /**
     * used in dashboard page
     * mutation for a user clicking the trash icon
     * @param userId
     * @param dogId
     * @returns dog
     */
    @Mutation(() => DogType)
    async clickedTrashIcon(@Args('userId') userId: string, @Args('dogId') dogId: string) : Promise<DogType> {
        //remove adopter from dogs usersLiked
        this.DogService.addDogToAdopterDogsDisliked(dogId, userId);
        this.DogService.removeDogFromAdopterDogsLiked(dogId, userId);
        return this.DogService.removeAdopterFromDogsUsersLiked(dogId, userId);
    }

    /**
     * used in dashboard page
     * mutation for a user clicking the heart icon
     * @param userId
     * @param dogId
     * @returns dog
     */
    @Mutation(() => DogType)
    async clickedHeartIcon(@Args('userId') userId: string, @Args('dogId') dogId: string) : Promise<DogType> {
        this.DogService.addAdopterToOrgPotentialAdopters(dogId, userId);
        return this.DogService.removeAdopterFromDogsUsersLiked(dogId, userId);
         
    }
    

    
}