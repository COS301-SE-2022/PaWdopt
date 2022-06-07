import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Dog, DogDocument, Pic, PicDocument, Organisation, OrganisationDocument, User, UserDocument, Adopter, AdopterDocument, OrgMember, OrgMemberDocument, Doc, DocDocument, ContactInfo, ContactInfoDocument, Location, LocationDocument } from './api.schema';
import bcrypt from 'bcryptjs';

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
        orgMember.password = await bcrypt.hash(orgMember.password, "cloud5");
        return this.OrgMemberModel.create(orgMember);
    }

    /**
     * Update an OrgMember
     * @param {string} email The email of the orgMember to update
     * @param {OrgMember} updatedOrgMember The new orgMember information
     * @return {Promise<OrgMember || null>}
     */
    async updateOrgMember(email: string, updatedOrgMember: OrgMember): Promise<OrgMember | null> {
        updatedOrgMember.password = await bcrypt.hash(updatedOrgMember.password, "cloud5");
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
     * Create a new User
     * @param {User} user The user to create
     * @return {Promise<User || null>}
     */
     async createUser(user: User): Promise<User | null> {
        user.password = await bcrypt.hash(user.password, "cloud5");
        return this.UserModel.create(user);
    }

    /**
     * Update an User
     * @param {string} email The email of the user to update
     * @param {User} updatedUser The new user information
     * @return {Promise<User || null>}
     */
    async updateUser(email: string, updatedUser: User): Promise<User | null> {
        updatedUser.password = await bcrypt.hash(updatedUser.password, "cloud5");
        return this.UserModel.findOneAndUpdate({ email }, updatedUser, { new: true }).exec();
    }

    /**
     * Delete an User
     * @param {string} email The email of the user to delete
     * @return {Promise<User || null>}
     */
    async deleteUser(email: string): Promise<User | null> {
        return this.UserModel.findOneAndDelete({ email }).exec();
    }

    /**
     * Create a new Adopter
     * @param {Adopter} adopter The adopter to create
     * @return {Promise<Adopter || null>}
     */
    async createAdopter(adopter: Adopter): Promise<Adopter | null> {
        adopter.password = await bcrypt.hash(adopter.password, "cloud5");
        return this.AdopterModel.create(adopter);
    }

    /**
     * Update an Adopter
     * @param {string} email The email of the adopter to update
     * @param {Adopter} updatedAdopter The new adopter information
     * @return {Promise<Adopter || null>}
     */
    async updateAdopter(email: string, updatedAdopter: Adopter): Promise<Adopter | null> {
        updatedAdopter.password = await bcrypt.hash(updatedAdopter.password, "cloud5");
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
     * Create a new Dog
     * @param {Dog} dog The dog to create
     * @return {Promise<Dog || null>}
     */
    async createDog(dog: Dog): Promise<Dog | null> {
        return this.DogModel.create(dog);
    }

    /**
     * Update an Dog
     * @param {string} id The id of the dog to update
     * @param {Dog} updatedDog The new dog information
     * @return {Promise<Dog || null>}
     */
    async updateDog(id: string, updatedDog: Dog): Promise<Dog | null> {
        return this.DogModel.findOneAndUpdate({ id }, updatedDog, { new: true }).exec();
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
     * Create a new Doc
     * @param {Doc} doc The doc to create
     * @return {Promise<Doc || null>}
     */
    async createDoc(doc: Doc): Promise<Doc | null> {
        return this.DocModel.create(doc);
    }

    /**
     * Update an Doc
     * @param {string} name The name of the doc to update
     * @param {Doc} updatedDoc The new doc information
     * @return {Promise<Doc || null>}
     */
    async updateDoc(name: string, updatedDoc: Doc): Promise<Doc | null> {
        return this.DocModel.findOneAndUpdate({ name }, updatedDoc, { new: true }).exec();
    }

    /**
     * Delete an Doc
     * @param {string} name The name of the doc to delete
     * @return {Promise<Doc || null>}
     */
    async deleteDoc(name: string): Promise<Doc | null> {
        return this.DocModel.findOneAndDelete({ name }).exec();
    }

    /**
     * Create a new Location
     * @param {Location} location The location to create
     * @return {Promise<Location || null>}
     */
    async createLocation(location: Location): Promise<Location | null> {
        return this.LocationModel.create(location);
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
     * Create a new Pic
     * @param {Pic} pic The pic to create
     * @return {Promise<Pic || null>}
     */
    async createPic(pic: Pic): Promise<Pic | null> {
        return this.PicModel.create(pic);
    }

    /**
     * Update an Pic
     * @param {string} name The name of the pic to update
     * @param {Pic} updatedPic The new pic information
     * @return {Promise<Pic || null>}
     */
    async updatePic(name: string, updatedPic: Pic): Promise<Pic | null> {
        return this.PicModel.findOneAndUpdate({ name }, updatedPic, { new: true }).exec();
    }

    /**
     * Delete an Pic
     * @param {string} name The name of the pic to delete
     * @return {Promise<Pic || null>}
     */
    async deletePic(name: string): Promise<Pic | null> {
        return this.PicModel.findOneAndDelete({ name }).exec();
    }

    /**
     * Find a Pic by id
     * @param {string} id The id of the pic to find
     * @return {Promise<Pic || null>}
     */
    async findPic(id: string): Promise<Pic | null> {
        return this.PicModel.findOne({ id }).exec();
    }

    /**
     * Find a User by email
     * @param {string} email The email of the user to find
     * @return {Promise<User || null>}
     */
    async findUser(email: string): Promise<User | null> {
        return this.UserModel.findOne({ email }).exec();
    }

    /**
     * Find a User by name
     * @param {string} name The name of the user to find
     * @return {Promise<User[] || null>}
     */
    async findUsersByName(name: string): Promise<User[] | null> {
        return this.UserModel.find({ name }).exec();
    }

    /**
     * Find a Dog by id
     * @param {string} id The id of the dog to find
     * @return {Promise<Dog || null>}
     */
     async findDog(id: string): Promise<Dog | null> {
        return this.DogModel.findOne({ id }).exec();
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
     * @param {Organisation} organisation The organisation to find all orgMembers for
     * @return {Promise<OrgMember[]>}
     */
    async findOrgMembersByOrganisation(organisation: Organisation): Promise<OrgMember[]> {
        return this.OrgMemberModel.find({ organisation }).exec();
    }

    /**
     * Find Organisation by distance from Adopter
     * @param {Adopter} adopter The adopter to find all orgMembers for
     * @return {Promise<Organisation[]>}
     */
    async findOrganisationsByDistance(adopter: Adopter): Promise<Organisation[]> {
        return this.OrganisationModel.find({
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [adopter.location.lng, adopter.location.lat],
                    },
                    $maxDistance: adopter.distance,
                },
            },
        }).exec();
    }

    /**
     * Login a User
     * @param {string} email The email of the user to login
     * @param {string} password The password of the user to login
     * @return {Promise<User || null>}
     */
    async loginUser(email: string, password: string): Promise<User | null> {
        const temp = await this.UserModel.findOne({ email }).exec();
        return bcrypt.compareSync(password, temp.password) ? temp : null;
    }

    /**
     * Check if email has been used by a user
     * @param {string} email The email to check
     * @return {Promise<boolean>}
     */
    async emailExists(email: string): Promise<boolean> {
        return this.UserModel.findOne({ email }).exec() !== null;
    }
}