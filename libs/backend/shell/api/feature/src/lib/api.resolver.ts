import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ApiService } from './api.service';
import { DogType, OrganisationType, LocationType, ContactInfoType, AdopterType, OrgMemberType } from './api.dto';
import { Dog,  Organisation, Location, ContactInfo, Adopter} from './api.schema';

import { Types } from 'mongoose';

@Resolver()
export class ApiResolver {
    constructor(private readonly DogService: ApiService) {}

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
     * used in orgProfile Page
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
    
    /**
     * Mutation for creating an organisation
     * @param org
     * @returns org
     */
    @Mutation(() => OrganisationType)
    async createOrg(@Args('org') org: OrganisationType) : Promise<OrganisationType> {
        org._id = (new Types.ObjectId()).toHexString();
        org.members.forEach(member => {
            member.organisation = org._id;
            this.DogService.createOrgMember(member);
        });
        return this.DogService.createOrg(org);
    }

    /**
     * used in ownedDogs page
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
     * used in userLikes page
     * find dogs in adopter's dogsLiked
     * @param userId
     * @returns dogs
     */
    @Query(() => [DogType])
    async findDogsLikedByUser(@Args('userId') userId: string) : Promise<DogType[]> {
        return this.DogService.findDogsInAdopterDogsLiked(userId);
    }
    
    /**
     * used in home swiping page
     * find all dogs
     * @returns dogs
     */
     @Query(() => [DogType])
     async findDogs(@Args('na') na: boolean) : Promise<DogType[]> {
         return this.DogService.findDogs();
     }

     /**
      * used in home swiping page
      * find adopter by _id
      * @param _id
      * @returns adopter
      */
    @Query(() => AdopterType)
    async findAdopterById(@Args('_id') _id: string) : Promise<AdopterType> {
        return this.DogService.findAdopterById(_id);
    }

    /**
     * used in home swiping page
     * call removeDogFromAdopterDogsLikedOrDisliked()
     * @param userId
     * @param dogId
     * @returns adopter
     */
    @Mutation(() => AdopterType)
    async removeDogFromAdopterDogsLikedOrDisliked(@Args('userId') userId: string, @Args('dogId') dogId: string) : Promise<AdopterType> {
        return this.DogService.removeDogFromAdopterDogsLikedOrDisliked(userId, dogId);
    }

    /**
     * used in home swiping page
     * add dog to adopter's dogsLiked and add adopter to dog's usersLiked
     * @param userId
     * @param dogId
     * @returns adopter
     */
    @Mutation(() => AdopterType)
    async userSwipesRight(@Args('userId') userId: string, @Args('dogId') dogId: string) : Promise<AdopterType> {
        await this.DogService.addUserToUserLikes(dogId, userId);
        return this.DogService.addDogToAdopterDogsLiked(userId, dogId);
    }

    /**
     * used in home swiping page
     * add dog to adopter's dogsDisliked 
     * @param userId
     * @param dogId
     * @returns adopter
     */
    @Mutation(() => AdopterType)
    async userSwipesLeft(@Args('userId') userId: string, @Args('dogId') dogId: string) : Promise<AdopterType> {
        return this.DogService.addDogToAdopterDogsDisliked(userId, dogId);
    }

    /**
     * used in updateorremove dog page
     * call the update queries
     * @param dogId
     * @param breed
     * @param gender
     * @param dob
     * @param about
     * @param height
     * @param weight
     * @param furlength
     * @param temperament
     * @returns dog
     */
    async updateDog(@Args('dogId') dogId: string, 
                    @Args('breed') breed: string, 
                    @Args('gender') gender: string,
                    @Args('dob') dob: Date,
                    @Args('about') about: string,
                    @Args('height') height: number,
                    @Args('weight') weight: number,
                    @Args('furlength') furlength: string,
                    @Args('temperament') temperament: [string]) : Promise<DogType> {
        this.DogService.updateDogBreed(dogId, breed);
        this.DogService.updateDogGender(dogId, gender);
        this.DogService.updateDogdob(dogId, dob);
        this.DogService.updateDogabout(dogId, about);
        this.DogService.updateDogheight(dogId, height);
        this.DogService.updateDogweight(dogId, weight);
        this.DogService.updateDogfurLength(dogId, furlength);
        return this.DogService.updateDogtemperament(dogId, temperament);
    }

    /**
     * used in updateorremove dog page
     * call the remove queries
     * @param dogId
     * @returns dog
     * @throws error if dog does not exist
     */
    async deleteDog(@Args('dogId') dogId: string) : Promise<DogType> {
        return this.DogService.deleteDog(dogId);
    }




}