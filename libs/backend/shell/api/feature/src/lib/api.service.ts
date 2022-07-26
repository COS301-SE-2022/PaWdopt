import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Dog, DogDocument, Organisation, OrganisationDocument, Adopter, AdopterDocument, OrgMember, OrgMemberDocument, ContactInfo, ContactInfoDocument, Location, LocationDocument } from './api.schema';
import bcrypt from 'bcryptjs';

@Injectable()
export class ApiService {
    constructor(
        @InjectModel(Dog.name) private readonly DogModel: Model<DogDocument>, 
        @InjectModel(Organisation.name) private readonly OrganisationModel : Model<OrganisationDocument>,
        @InjectModel(OrgMember.name) private readonly OrgMemberModel : Model<OrgMemberDocument>,
        @InjectModel(Adopter.name) private readonly AdopterModel : Model<AdopterDocument>,
        @InjectModel(ContactInfo.name) private readonly ContactInfoModel : Model<ContactInfoDocument>,
        @InjectModel(Location.name) private readonly LocationModel : Model<LocationDocument>,
        ) {}

    /**
     * Create a new Organisation
     * @param {Organisation} org The organisation to create
     * @return {Promise<Organisation || null>}

     */
    async createOrg(org: Organisation): Promise<Organisation | null> {
        return this.OrganisationModel.create(org);
    }

    /**
     * Update an Organisation
     * @param {string} name The name of the organisation to update
     * @param {Organisation} updatedOrg The new organisation information
     * @return {Promise<Organisation || null>}

     */
    async updateOrg(name: string, updatedOrg: Organisation): Promise<Organisation | null> {
        return this.OrganisationModel.findOneAndUpdate({ name }, updatedOrg, { new: true }).exec();
    }

    /**
     * Delete an Organisation
     * @param {string} name The name of the organisation to delete
     * @return {Promise<Organisation || null>}

     */
    async deleteOrg(name: string): Promise<Organisation | null> {
        return this.OrganisationModel.findOneAndDelete({ name }).exec();
    }
    
    /**
     * Create a new OrgMember
     * @param {OrgMember} orgMember The orgMember to create
     * @return {Promise<OrgMember || null>}

     */
    async createOrgMember(orgMember: OrgMember): Promise<OrgMember | null> {
        // orgMember.password = await bcrypt.hash(orgMember.password, "cloud5");
        return this.OrgMemberModel.create(orgMember);
    }

    /**
     * Update an OrgMember
     * @param {string} email The email of the orgMember to update
     * @param {OrgMember} updatedOrgMember The new orgMember information
     * @return {Promise<OrgMember || null>}

     */
    async updateOrgMember(email: string, updatedOrgMember: OrgMember): Promise<OrgMember | null> {
        // updatedOrgMember.password = await bcrypt.hash(updatedOrgMember.password, "cloud5");
        return this.OrgMemberModel.findOneAndUpdate({ email }, updatedOrgMember, { new: true }).exec();
    }

    /**
     * Delete an OrgMember
     * @param {string} email The email of the orgMember to delete
     * @return {Promise<OrgMember || null>}

     */
    async deleteOrgMember(email: string): Promise<OrgMember | null> {
        return this.OrgMemberModel.findOneAndDelete({ email }).exec();
    }

    /**
     * Create a new Adopter
     * @param {Adopter} adopter The adopter to create
     * @return {Promise<Adopter || null>}

     */
    async createAdopter(adopter: Adopter): Promise<Adopter | null> {
        // adopter.password = await bcrypt.hash(adopter.password, "cloud5");
        return this.AdopterModel.create(adopter);
    }

    /**
     * Update an Adopter
     * @param {string} email The email of the adopter to update
     * @param {Adopter} updatedAdopter The new adopter information
     * @return {Promise<Adopter || null>}

     */
    async updateAdopter(email: string, updatedAdopter: Adopter): Promise<Adopter | null> {
        // updatedAdopter.password = await bcrypt.hash(updatedAdopter.password, "cloud5");
        return this.AdopterModel.findOneAndUpdate({ email }, updatedAdopter, { new: true }).exec();
    }

    /**
     * Delete an Adopter
     * @param {string} email The email of the adopter to delete
     * @return {Promise<Adopter || null>}

     */
    async deleteAdopter(email: string): Promise<Adopter | null> {
        return this.AdopterModel.findOneAndDelete({ email }).exec();
    }

    /**
     * Update an Dog
     * @param {string} name The name of the dog to update
     * @param {Dog} updatedDog The new dog information
     * @return {Promise<Dog || null>}

     */
    async updateDog(name: string, updatedDog: Dog): Promise<Dog | null> {
        return this.DogModel.findOneAndUpdate({ name }, updatedDog, { new: true }).exec();
    }



    /**
     * Delete an Dog
     * @param {string} id The id of the dog to delete
     * @return {Promise<Dog || null>}

     */
    async deleteDog(id: string): Promise<Dog | null> {
        return this.DogModel.findOneAndDelete({ id }).exec();
    }

    /**
     * Create a new Contact Info
     * @param {ContactInfo} contactInfo The contactInfo to create
     * @return {Promise<ContactInfo || null>}

     */
    async createContactInfo(contactInfo: ContactInfo): Promise<ContactInfo | null> {
        return this.ContactInfoModel.create(contactInfo);
    }

    /**
     * Update an Contact Info
     * @param {string} name The name of the contactInfo to update
     * @param {ContactInfo} updatedContactInfo The new contactInfo information
     * @return {Promise<ContactInfo || null>}

     */
    async updateContactInfo(name: string, updatedContactInfo: ContactInfo): Promise<ContactInfo | null> {
        return this.ContactInfoModel.findOneAndUpdate({ name }, updatedContactInfo, { new: true }).exec();
    }

    /**
     * Delete an Contact Info
     * @param {string} name The name of the contactInfo to delete
     * @return {Promise<ContactInfo || null>}

     */
    async deleteContactInfo(name: string): Promise<ContactInfo | null> {
        return this.ContactInfoModel.findOneAndDelete({ name }).exec();
    }

    /**
     * Update an Location
     * @param {string} name The name of the location to update
     * @param {Location} updatedLocation The new location information
     * @return {Promise<Location || null>}

     */
    async updateLocation(name: string, updatedLocation: Location): Promise<Location | null> {
        return this.LocationModel.findOneAndUpdate({ name }, updatedLocation, { new: true }).exec();
    }

    /**
     * Delete an Location
     * @param {string} name The name of the location to delete
     * @return {Promise<Location || null>}

     */
    async deleteLocation(name: string): Promise<Location | null> {
        return this.LocationModel.findOneAndDelete({ name }).exec();
    }
    /**
     * Find a Adopter by email
     * @param {string} email The email of the adopter to find
     * @return {Promise<Adopter || null>}

     */
    async findAdopter(email: string): Promise<Adopter | null> {
        return this.AdopterModel.findOne({ email }).exec();
    }

    /**
     * Find a OrgMember by email
     * @param {string} email The email of the orgMember to find
     * @return {Promise<OrgMember || null>}

     * 
     */
    async findOrgMember(email: string): Promise<OrgMember | null> {
        return this.OrgMemberModel.findOne({ email }).exec();
    }

    /**
     * Find a Dog by name
     * @param {string} name The name of the dog to find
     * @return {Promise<Dog || null>}

     */
     async findDog(name: string): Promise<Dog | null> {
        return this.DogModel.findOne({ name }).exec();
    }

    /**
     * Find a Dog by name
     * @param {string} name The name of the dog to find
     * @return {Promise<Dog[] || null>}

     */
    async findDogsByName(name: string): Promise<Dog[] | null> {
        return this.DogModel.find({ name }).exec();
    }

    /**
     * Find all Dogs by Organisation
     * @param {Organisation} organisation The organisation to find all dogs for
     * @return {Promise<Dog[]>}

     */
    async findDogsByOrganisation(organisation: Organisation): Promise<Dog[]> {
        return this.DogModel.find({ organisation }).exec();
    }

    /**
     * Find all Dogs
     * @return {Promise<Dog[]>}

     */
    async findDogs(): Promise<Dog[]> {
        return this.DogModel.find().exec();
    }

    /**
     * Find all Dogs by breed
     * @param {string} breed The breed to find all dogs for
     * @return {Promise<Dog[]>}

     */
     async findDogsByBreed(breed: string): Promise<Dog[]> {
        return this.DogModel.find({ breed }).exec();
    }

    /**
     * Find all OrgMembers by Organisation
     * @param {string} organisation The organisation to find all orgMembers for
     * @return {Promise<OrgMember[]>}

     */
    async findOrgMembersByOrganisation(organisation: string): Promise<OrgMember[]> {
        return this.OrgMemberModel.find({ organisation }).exec();
    }


    /**
     * Check if email has been used by a Adopter
     * @param {string} email The email to check
     * @return {Promise<boolean>}

     * 
     */
    async adopterEmailExists(email: string): Promise<boolean> {
        const temp = await this.AdopterModel.findOne({ email }).exec();
        return temp !== null;
    }

    /**
     * Check if email has been used by a OrgMember
     * @param {string} email The email to check
     * @return {Promise<boolean>}

     */
    async orgMemberEmailExists(email: string): Promise<boolean> {
        const temp = await this.OrgMemberModel.findOne({ email }).exec();
        return temp !== null;
    }

    /**
     * Check if organisation name has been used by a Organisation
     * @param {string} name The name to check
     * @return {Promise<boolean>}
     
    */
    async organisationNameExists(name: string): Promise<boolean> {
        const temp = await this.OrganisationModel.findOne({ name }).exec();
        return temp !== null;
    }
    

    /**
     * add a user to userLikes in dog
     * @param {string} dogName The name of the dog to add the user to
     * @param {Adopter} userName The name of the user to add to the dog
     * @return {Promise<Dog || null>}

     * 
     */
    async addUserToUserLikes(dogName: string, userName: Adopter): Promise<Dog | null> {
        const dog = await this.findDog(dogName);
        // if(dog.usersLiked.includes(userName)){
            
        // }
        dog.usersLiked.push(userName);
        return this.updateDog(dogName, dog);
    }

    /**
     * add dog to dogsLiked of adopter
     * @param {Adopter} adopter The adopter to add the dog to
     * @param {string} dogName The name of the dog to add to the adopter
     * @return {Promise<Adopter || null>}
     */
    async addDogToDogsLiked(adopter: Adopter, dogName: string): Promise<Adopter | null> {
        const dog = await this.findDog(dogName);
        // if(adopter.dogsLiked.includes(dog)){
            
        // }
        adopter.dogsLiked.push(dog);
        return this.updateAdopter(adopter.email, adopter);
    }

    /**
     * find adopter by name
     * @param {string} name The name of the adopter to find
     * @return {Promise<Adopter || null>}

     */
    async findAdopterByName(name: string): Promise<Adopter | null> {
        return this.AdopterModel.findOne({ name }).exec();
    }

    /**
     * update a dogs breed
     * @param {string} name The name of the dog to update
     * @param {string} breed The new breed of the dog
     * @return {Promise<Dog || null>}
     * 
     */
    async updateDogBreed(name: string, breed: string): Promise<Dog | null> {
        return this.DogModel.findOneAndUpdate({ name }, { breed }, { new: true }).exec();
    }

    /**
     * update a dogs gender
     * @param {string} name The name of the dog to update
     * @param {string} gender The new gender of the dog
     * @return {Promise<Dog || null>}
     * 
     */ 
     async updateDogGender(name: string, gender: string): Promise<Dog | null> {
        return this.DogModel.findOneAndUpdate({ name }, { gender }, { new: true }).exec();
    }

    /**
     * update a dogs about
     * @param {string} name The name of the dog to update
     * @param {string} about The new about of the dog
     * @return {Promise<Dog || null>}
     * 
     */
     async updateDogAbout(name: string, about: string): Promise<Dog | null> {
        return this.DogModel.findOneAndUpdate({ name }, { about }, { new: true }).exec();
    }

    /**
     * update a dogs furLength
     * @param {string} name The name of the dog to update
     * @param {string} furLength The new furLength of the dog
     * @return {Promise<Dog || null>}
     * 
     */
     async updateDogFurLength(name: string, furLength: string): Promise<Dog | null> {
        return this.DogModel.findOneAndUpdate({ name }, { furLength }, { new: true }).exec();
    }

    /**
     * update a dogs dob
     * @param {string} name The name of the dog to update
     * @param {Date} dob The new dob of the dog
     * @return {Promise<Dog || null>}
     * 
     */
     async updateDogDob(name: string, dob: Date): Promise<Dog | null> {
        return this.DogModel.findOneAndUpdate({ name }, { dob }, { new: true }).exec();
    }

    /**
     * update a dogs weight
     * @param {string} name The name of the dog to update
     * @param {number} weight The new weight of the dog
     * @return {Promise<Dog || null>}
     * 
     */
     async updateDogWeight(name: string, weight: number): Promise<Dog | null> {
        return this.DogModel.findOneAndUpdate({ name }, { weight }, { new: true }).exec();
    }

    /**
     * update a dogs height
     * @param {string} name The name of the dog to update
     * @param {number} height The new height of the dog
     * @return {Promise<Dog || null>}
     * 
     */
     async updateDogHeight(name: string, height: number): Promise<Dog | null> {
        return this.DogModel.findOneAndUpdate({ name }, { height }, { new: true }).exec();
    }

    /**
     * update a dogs temperament
     * @param {string} name The name of the dog to update
     * @param {string[]} temperament The new temperament of the dog
     * @return {Promise<Dog || null>}

     * 
     */
    async updateDogTemperament(name: string, temperament: string[]): Promise<Dog | null> {
        return this.DogModel.findOneAndUpdate({ name }, { temperament }, { new: true }).exec();
    }

    /**
     * find dogs by org
     * @param {string} orgName The name of the org to find
     * @return {Promise<Dog[]>}
     */
    async findDogsByOrg(orgName: string): Promise<Dog[]> {
        return this.DogModel.find({orgName: orgName}).exec();
    }

    /**
     * delete dog by name
     * @param {string} name The name of the dog to delete
     * @return {Promise<Dog || null>}
     */
    async deleteDogByName(name: string): Promise<Dog | null> {
        const dog = await this.DogModel.findOne({ name }).exec();
        if(dog == null){
            throw new Error("Dog does not exist");
        }
        return this.DogModel.findOneAndDelete({ name }).exec();
    }

    /**
     * find all dogs liked by an adopter
     * @param {string} name The name of the adopter to find
     * @return {Promise<Dog[] || null>}
     */
    async findDogsLikedByAdopter(name: string): Promise<Dog[] | null> {
        const adopter = await this.AdopterModel.findOne({ name }).exec();
        if(adopter == null){
            return null;
        }
        return adopter.dogsLiked;
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
     * For the AddDog page
     * create a dog
     * @param {Dog} dog The name of the dog to create
     * @return {Promise<Dog || null>}
     */
    async createDog(dog: Dog): Promise<Dog | null> {
        return this.DogModel.create(dog);
    }

    /**
     * For the AddDog page
     * find organisation by name
     * @param {string} name The name of the organisation to find
     * @return {Promise<Organisation || null>}
     */
    async findOrgByName(name: string): Promise<Organisation | null> {
        return this.OrganisationModel.findOne({ name }).exec();
    }

    /**
     * For the AddDog page
     * find orgMember by email
     * @param {string} email The email of the orgMember to find
     * @return {Promise<OrgMember || null>}
     */
    async findOrgMemberByEmail(email: string): Promise<OrgMember | null> {
        return this.OrgMemberModel.findOne({ email }).exec();
    }

    /**
     * for the Dashboard Page
     * get dog by _id
     * @param {string} _id The _id of the dog to find
     * @return {Promise<Dog || null>}
     */
    async findDogById(_id: string): Promise<Dog | null> {
        return this.DogModel.findOne({ _id }).exec();
    }

    /**
     * for the Dashboard Page
     * remove a adopter from dogs usersLiked
     * @param {string} _id The _id of the dog to update
     * @param {string} userId The _id of the user to remove
     * @return {Promise<Dog || null>}
     */  
    async removeAdopterFromDogsUsersLiked(_id: string, userId: string): Promise<Dog | null> {
        const dog = await this.DogModel.findOne({_id}).exec();
        if(dog == null){
            throw new Error("Dog does not exist");
        }
        const user = await this.AdopterModel.findOne({userId}).exec();
        const index = dog.usersLiked.indexOf(user);
        if(index == -1){
            throw new Error("User not found");
        }
        dog.usersLiked.splice(index, 1);
        return dog.save();
    }

    /**
     * for the Dashboard Page
     * add a adopter to organisations potentialAdopters
     * @param {string} _id The _id of the organisation to update
     * @param {string} userId The _id of the user to add
     * @return {Promise<Organisation || null>}
     */
    async addAdopterToOrgPotentialAdopters(_id: string, userId: string): Promise<Organisation | null> {
        const org = await this.OrganisationModel.findOne({_id}).exec();
        if(org == null){
            throw new Error("Org does not exist");
        }
        const user = await this.AdopterModel.findOne({userId}).exec();
        if(user == null){
            throw new Error("User does not exist");
        }
        org.potentialAdopters.push(user);
        return org.save();
    }

    /**
     * for the Dashboard Page
     * add a dog to adopters dogsDisliked
     * @param {string} uid The _id of the adopter to update
     * @param {string} dogId The _id of the dog to add
     * @return {Promise<Adopter || null>}
     */
    async addDogToAdopterDogsDisliked(uid: string, dogId: string): Promise<Adopter | null> {
        const adopter = await this.AdopterModel.findOne({uid}).exec();
        if(adopter == null){
            throw new Error("Adopter does not exist");
        }
        const dog = await this.DogModel.findOne({dogId}).exec();
        if(dog == null){
            throw new Error("Dog does not exist");
        }
        adopter.dogsDisliked.push(dog);
        return adopter.save();
    }

    /**
     * for the Dashboard Page
     * remove a dog from adopters dogsLiked
     * @param {string} uid The _id of the adopter to update
     * @param {string} dogId The _id of the dog to remove
     * @return {Promise<Adopter || null>}
     */
    async removeDogFromAdopterDogsLiked(uid: string, dogId: string): Promise<Adopter | null> {
        const adopter = await this.AdopterModel.findOne({uid}).exec();
        if(adopter == null){
            throw new Error("Adopter does not exist");
        }
        const dog = await this.DogModel.findOne({dogId}).exec();
        if(dog == null){
            throw new Error("Dog does not exist");
        }
        const index = adopter.dogsLiked.indexOf(dog);
        if(index == -1){
            throw new Error("Dog not found");
        }
        adopter.dogsLiked.splice(index, 1);
        return adopter.save();
    }
}