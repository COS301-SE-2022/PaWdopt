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
    
    /**
     * Create a new OrgMember
     * @param {OrgMember} orgMember The orgMember to create
     * @return {Promise<OrgMember || null>}
     */
    async createOrgMember(orgMember: OrgMember): Promise<OrgMember | null> {
        return this.OrgMemberModel.create(orgMember);
    }

    /**
     * Update an OrgMember
     * @param {string} name The name of the orgMember to update
     * @param {OrgMember} updatedOrgMember The new orgMember information
     * @return {Promise<OrgMember || null>}
     */
    async updateOrgMember(name: string, updatedOrgMember: OrgMember): Promise<OrgMember | null> {
        return this.OrgMemberModel.findOneAndUpdate({ name }, updatedOrgMember, { new: true }).exec();
    }

    /**
     * Delete an OrgMember
     * @param {string} name The name of the orgMember to delete
     * @return {Promise<OrgMember || null>}
     */
    async deleteOrgMember(name: string): Promise<OrgMember | null> {
        return this.OrgMemberModel.findOneAndDelete({ name }).exec();
    }

    
    /**
     * Create a new User
     * @param {User} user The user to create
     * @return {Promise<User || null>}
     */
     async createUser(user: User): Promise<User | null> {
        return this.UserModel.create(user);
    }

    /**
     * Update an User
     * @param {string} name The name of the user to update
     * @param {User} updatedUser The new user information
     * @return {Promise<User || null>}
     */
    async updateUser(name: string, updatedUser: User): Promise<User | null> {
        return this.UserModel.findOneAndUpdate({ name }, updatedUser, { new: true }).exec();
    }

    /**
     * Delete an User
     * @param {string} name The name of the user to delete
     * @return {Promise<User || null>}
     */
    async deleteUser(name: string): Promise<User | null> {
        return this.UserModel.findOneAndDelete({ name }).exec();
    }

    /**
     * Create a new Adopter
     * @param {Adopter} adopter The adopter to create
     * @return {Promise<Adopter || null>}
     */
    async createAdopter(adopter: Adopter): Promise<Adopter | null> {
        return this.AdopterModel.create(adopter);
    }

    /**
     * Update an Adopter
     * @param {string} name The name of the adopter to update
     * @param {Adopter} updatedAdopter The new adopter information
     * @return {Promise<Adopter || null>}
     */
    async updateAdopter(name: string, updatedAdopter: Adopter): Promise<Adopter | null> {
        return this.AdopterModel.findOneAndUpdate({ name }, updatedAdopter, { new: true }).exec();
    }

    /**
     * Delete an Adopter
     * @param {string} name The name of the adopter to delete
     * @return {Promise<Adopter || null>}
     */
    async deleteAdopter(name: string): Promise<Adopter | null> {
        return this.AdopterModel.findOneAndDelete({ name }).exec();
    }

    /**
     * Create a new Dog
     * @param {Dog} dog The dog to create
     * @return {Promise<Dog || null>}
     */
    async createDog(dog: Dog): Promise<Dog | null> {
        return this.DogModel.create(dog);
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
     * @param {string} name The name of the dog to delete
     * @return {Promise<Dog || null>}
     */
    async deleteDog(name: string): Promise<Dog | null> {
        return this.DogModel.findOneAndDelete({ name }).exec();
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
}
