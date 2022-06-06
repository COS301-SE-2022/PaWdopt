import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Dog, DogDocument, Pic, PicDocument, Organisation, OrganisationDocument, User, UserDocument, Adopter, AdopterDocument, OrgMember, OrgMemberDocument, Doc, DocDocument, ContactInfo, ContactInfoDocument, Location, LocationDocument } from './api.schema';

@Injectable()
export class ApiService {
    constructor(
        @InjectModel(Dog.name) private readonly DogModel: Model<DogDocument>, 
        @InjectModel(Pic.name) private readonly PicModel : Model<PicDocument>,
        @InjectModel(Organisation.name) private readonly OrganisationModel : Model<OrganisationDocument>,
        @InjectModel(OrgMember.name) private readonly OrgMemberModel : Model<OrgMemberDocument>,
        @InjectModel(User.name) private readonly UserModel : Model<UserDocument>,
        @InjectModel(Adopter.name) private readonly AdopterModel : Model<AdopterDocument>,
        @InjectModel(Doc.name) private readonly DocModel : Model<DocDocument>,
        @InjectModel(ContactInfo.name) private readonly ContactInfoModel : Model<ContactInfoDocument>,
        @InjectModel(Location.name) private readonly LocationModel : Model<LocationDocument>,
        ) {}

    // async findAllDogs(): Promise<Dog[]> {
    //     return this.DogModel.find().exec();
    // }
    
    async findAllOrgs(): Promise<Organisation[]> {
        return this.OrganisationModel.find().exec();
    }
    // async findAllUser(): Promise<User[]> {
    //     return this.UserModel.find().exec();
    // }
    // async findAllAdopter(): Promise<Adopter[]> {
    //     return this.AdopterModel.find().exec();
    // }

    // /**
    //  * Find a dog by name
    //  * @param {string} name The name of the short to find
    //  * @return {Promise<Dog || null>}
    //  */
    // async findDogByName(name: string): Promise<Dog | null> {
    //     return this.DogModel.findOne({ name }).exec();
    // }

    // /**
    //  * Find all dogs of an organisation
    //  * @param {string} orgName The name of the organisation
    //  * @return {Promise<Dog[]>}
    //  */
    // async findDogsByOrg(orgName: string): Promise<Dog[]> {
    //     return this.DogModel.find({ organisation: orgName }).exec();
    // }

    // /**
    //  * Create a new dog
    //  * @param {JSON} dog The dog to create
    //  * @return {Promise<Dog || null>}
    //  */
    // async createDog(dog: JSON): Promise<Dog | null> {
    //     return this.DogModel.create(dog);
    // }

    // /**
    //  * Update a dog
    //  * @param {string} name The name of the dog to update
    //  * @param {JSON} updatedDog The new dog information
    //  * @return {Promise<Dog || null>}
    //  */
    // async updateDog(name: string, updatedDog: JSON): Promise<Dog | null> {
    //     return this.DogModel.findOneAndUpdate({ name }, updatedDog, { new: true }).exec();
    // }

    // /**
    //  * Delete a dog
    //  * @param {string} name The name of the dog to delete
    //  * @return {Promise<Dog || null>}
    //  */
    // async deleteDog(name: string): Promise<Dog | null> {
    //     return this.DogModel.findOneAndDelete({ name }).exec();
    // }

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
    
}
