import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ApiService } from './api.service';
import { DogType, OrganisationType, LocationType, ContactInfoType, AdopterType, OrgMemberType } from './api.dto';
import { Dog,  Organisation, Location, ContactInfo, Adopter} from './api.schema';

import { Types } from 'mongoose';

@Resolver()
export class ApiResolver {
    constructor(private readonly DogService: ApiService) {}

    @Mutation(()  => OrganisationType)
    async updateOrg(@Args ('_id') _id: string, @Args('org') org: OrganisationType) : Promise<OrganisationType> {
        return this.DogService.updateOrg(_id, org);
    }

    @Mutation(() => OrganisationType)
    async deleteOrg(@Args('_id') _id: string) : Promise<OrganisationType> {
        return this.DogService.deleteOrg(_id);
    }

    @Mutation(() => OrgMemberType)
    async createOrgMember(@Args('member') member: OrgMemberType) : Promise<OrgMemberType> {
        return this.DogService.createOrgMember(member);
    }

    @Mutation(() => OrgMemberType)
    async updateOrgMember(@Args('_id') _id: string, @Args('member') member: OrgMemberType) : Promise<OrgMemberType> {
        return this.DogService.updateOrgMember(_id, member);
    }

    @Mutation(() => OrgMemberType)
    async deleteOrgMember(@Args('_id') _id: string) : Promise<OrgMemberType> {
        return this.DogService.deleteOrgMember(_id);
    }

    @Mutation(() => ContactInfoType)
    async createContactInfo(@Args('contactInfo') contactInfo: ContactInfoType) : Promise<ContactInfoType> {
        const ret = await this.DogService.createContactInfo(contactInfo);
        ret._id = (new Types.ObjectId()).toHexString();
        return 
    }

    @Mutation(() => ContactInfoType)
    async updateContactInfo(@Args('_id') _id: string, @Args('contactInfo') contactInfo: ContactInfoType) : Promise<ContactInfoType> {
        return this.DogService.updateContactInfo(_id, contactInfo);
    }

    @Mutation(() => ContactInfoType)
    async deleteContactInfo(@Args('_id') _id: string) : Promise<ContactInfoType> {
        return this.DogService.deleteContactInfo(_id);
    }

    @Mutation(() => AdopterType)
    async createAdopter(@Args('adopter') adopter: AdopterType) : Promise<AdopterType> {
        return this.DogService.createAdopter(adopter);
    }

    @Mutation(() => AdopterType)
    async updateAdopter(@Args('_id') _id: string, @Args('adopter') adopter: AdopterType) : Promise<AdopterType> {
        return this.DogService.updateAdopter(_id, adopter);
    }

    @Mutation(() => AdopterType)
    async deleteAdopter(@Args('_id') _id: string) : Promise<AdopterType> {
        return this.DogService.deleteAdopter(_id);
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

    @Mutation(() => DogType)
    async userSwipesRightOnDog(@Args('_id') _id: string, @Args('dogName') dogName: string) : Promise<DogType | null> {
        const user = await this.DogService.findAdopterBy_Id(_id);
        if(user != null){
            await this.DogService.addDogToDogsLiked(user, dogName);
            const ret = await this.DogService.addUserToUserLikes(dogName, user._id);
            return ret;
        }
        else{
            return null;
        }
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
     * find dogs liked by adopter
     * @param _id
     * @returns dogs
     */
    @Query(() => [DogType])
    async findDogsLikedByAdopter(@Args('_id') _id: string) : Promise<DogType[]> {
        return this.DogService.findDogsLikedByAdopter(_id);
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
     * @param orgId
     * @returns dog
     */
    @Mutation(() => DogType)
    async createDog(@Args('dog') dog: DogType, @Args('orgId') orgId: string) : Promise<DogType> {
        const org = await this.DogService.findOrgById(orgId);
        dog._id = (new Types.ObjectId()).toHexString();
        dog.organisation = org;
        return this.DogService.createDog(dog);
    }

    /**
     * used in AddDog Page
     * used in orgProfile Page
     * find org by id
     * @param _id
     * @returns organisation
     */
    @Query(() => OrganisationType)
    async findOrgById(@Args('_id') _id: string) : Promise<OrganisationType> {
        return this.DogService.findOrgById(_id);
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
        await this.DogService.addDogToAdopterDogsDisliked(userId, dogId);
        await  this.DogService.removeDogFromAdopterDogsLiked(userId, dogId);
        return await this.DogService.removeAdopterFromDogsUsersLiked(dogId, userId);
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
        org.contactInfo._id = (new Types.ObjectId()).toHexString();
        org.contactInfo = await this.DogService.createContactInfo(org.contactInfo);
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
        const user = await this.DogService.addDogToAdopterDogsLiked(userId, dogId);
        return user;
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
    @Mutation(() => DogType)
    async updateDog(@Args('dogId') dogId: string, 
                    @Args('breed') breed: string, 
                    @Args('gender') gender: string,
                    @Args('dob') dob: Date,
                    @Args('about') about: string,
                    @Args('height') height: number,
                    @Args('weight') weight: number, 
                    @Args('furlength') furlength: string,
                    @Args({ name: "temperament", type: () => [String] }) temperament: [string] ) : Promise<DogType> {
        await this.DogService.updateDogBreed(dogId, breed);
        await this.DogService.updateDogGender(dogId, gender);
        await this.DogService.updateDogdob(dogId, dob);
        await this.DogService.updateDogabout(dogId, about);
        await this.DogService.updateDogheight(dogId, height);
        await this.DogService.updateDogweight(dogId, weight);
        await this.DogService.updateDogfurLength(dogId, furlength);
        await this.DogService.updateDogtemperament(dogId, temperament);
        return this.DogService.findDogById(dogId);
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

    /**
     * getUserType
     * @param id
     * @returns string
     */
    @Query(() => String)
    async getUserType(@Args('id') id: string) : Promise<string> {
        return this.DogService.getUserType(id);
    }

    /**
     * used in ownnedDogs page
     * find orgMember by id
     * @param _id
     * @returns orgMember
     */
    @Query(() => OrgMemberType)
    async findOrgMemberById(@Args('_id') _id: string) : Promise<OrgMemberType> {
        return this.DogService.findOrgMemberById(_id);
    }

    /**
     * used in owenedDogs page
     * find dogs by org id
     * @param _id
     * @returns dogs
     */
    @Query(() => [DogType])
    async findDogsByOrgId(@Args('_id') _id: string) : Promise<DogType[]> {
        return this.DogService.findDogsByOrgId(_id);
    }

    
}