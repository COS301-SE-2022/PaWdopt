import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Dog, DogDocument, Pic, PicDocument, Organisation, OrganisationDocument, Adopter, AdopterDocument, OrgMember, OrgMemberDocument, Doc, DocDocument, ContactInfo, ContactInfoDocument, Location, LocationDocument } from './api.schema';
import bcrypt from 'bcryptjs';

@Injectable()
export class ApiService {
    constructor(
        @InjectModel(Dog.name) private readonly DogModel: Model<DogDocument>, 
        @InjectModel(Pic.name) private readonly PicModel : Model<PicDocument>,
        @InjectModel(Organisation.name) private readonly OrganisationModel : Model<OrganisationDocument>,
        @InjectModel(OrgMember.name) private readonly OrgMemberModel : Model<OrgMemberDocument>,
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
        return this.AdopterModel.findOne({ email }).exec() !== null;
    }

    /**
     * Check if email has been used by a OrgMember
     * @param {string} email The email to check
     * @return {Promise<boolean>}

     */
    async orgMemberEmailExists(email: string): Promise<boolean> {
        return this.OrgMemberModel.findOne({ email }).exec() !== null;
    }

    /**
     * add a user to userLikes in dog
     * @param {string} dogName The name of the dog to add the user to
     * @param {Adopter} userName The name of the user to add to the dog
     * @return {Promise<Dog || null>}

     * 
     */
    async addUserToUserLikes(dogName: string, userName: Adopter): Promise<Dog | null> {
        return this.DogModel.findOneAndUpdate({ name: dogName }, { $push: { usersLiked: userName } }, { new: true }).exec();
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
    //  async updateDogTemperament(name: string, temperament: string[]): Promise<Dog | null> {
    //     return this.DogModel.findOneAndUpdate({ name }, { temperament }, { new: true }).exec();
    // }
    
      /**
     * Login an Adopter
     * @param {string} email The email of the adopter to login
     * @param {string} password The password of the adopter to login
     * @return {Promise<Adopter || null>}
     */
       async loginAdopter(email: string, password: string): Promise<Adopter | null> {
        const temp = await this.AdopterModel.findOne({ email }).exec();
        console.log(temp);
        if(temp != null){
            //return bcrypt.compareSync(password, temp.password); (fix for demo 3)
            if(password == temp.password){
                return temp;
            }
            return null;
        } 
        else{
            return null;
        }
        
    }

    /**
     * Login an OrgMember
     * @param {string} email The email of the orgMember to login
     * @param {string} password The password of the orgMember to login
     * @return {Promise<OrgMember || null>}
     */
    async loginOrgMember(email: string, password: string): Promise<OrgMember | null> {
        const temp = await this.OrgMemberModel.findOne({ email }).exec();
        if(temp != null){
            //return bcrypt.compareSync(password, temp.password); (fix for demo 3)
            if(password == temp.password){
                return temp;
            }
            return null;
        } 
        else{
            return null;
        }
    }

    


}