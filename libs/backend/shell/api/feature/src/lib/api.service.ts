import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Dog, DogDocument, Organisation, OrganisationDocument, Adopter, AdopterDocument, OrgMember, OrgMemberDocument, ContactInfo, ContactInfoDocument, Location, LocationDocument, Chat, ChatDocument, MessageObj, MessageDocument, PotentialAdopter, PotentialAdopterDocument, Doc, DocDocument, Statistic, StatisticDocument } from './api.schema';
import { Mutation } from '@nestjs/graphql';
import { DogType } from './api.dto';

@Injectable()
export class ApiService {
    constructor(
        @InjectModel(Dog.name) private readonly DogModel: Model<DogDocument>, 
        @InjectModel(Organisation.name) private readonly OrganisationModel : Model<OrganisationDocument>,
        @InjectModel(OrgMember.name) private readonly OrgMemberModel : Model<OrgMemberDocument>,
        @InjectModel(Adopter.name) private readonly AdopterModel : Model<AdopterDocument>,
        @InjectModel(ContactInfo.name) private readonly ContactInfoModel : Model<ContactInfoDocument>,
        @InjectModel(Location.name) private readonly LocationModel : Model<LocationDocument>,
        @InjectModel(Chat.name) private readonly ChatModel : Model<ChatDocument>,
        @InjectModel(MessageObj.name) private readonly MessageModel : Model<MessageDocument>,
        @InjectModel(PotentialAdopter.name) private readonly PotentialAdopterModel : Model<PotentialAdopterDocument>,
        @InjectModel(Doc.name) private readonly DocModel : Model<DocDocument>,
        @InjectModel(Statistic.name) private readonly StatisticModel : Model<StatisticDocument>
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
     * @param {string} _id The id of the organisation to update
     * @param {Organisation} updatedOrg The new organisation information
     * @return {Promise<Organisation || null>}
     */
    async updateOrg(_id: string, updatedOrg: Organisation): Promise<Organisation | null> {
        updatedOrg.members.forEach(async member => {
            const orgMember = await this.OrgMemberModel.findOne({ _id: member._id }).exec();
            if (orgMember) {
                await this.updateOrgMember(orgMember._id, orgMember);
            }else{
                await this.createOrgMemberWithoutAddingToOrg(member);
            }
        })
        const orgMembersExisting = await this.OrgMemberModel.find({ organisation: _id }).exec();
        orgMembersExisting.forEach(async member => {
            if(!updatedOrg.members.find(m => m._id === member._id)){
                await this.deleteOrgMember(member._id);
            }
        });
        return this.OrganisationModel.findOneAndUpdate({ _id }, updatedOrg, { new: true }).exec();
    }

    /**
     * Delete an Organisation
     * @param {string} _id The id of the organisation to delete
     * @return {Promise<Organisation || null>}

     */
    async deleteOrg(_id: string): Promise<Organisation | null> {
        return this.OrganisationModel.findOneAndDelete({ _id }).exec();
    }
    
    /**
     * Create a new OrgMember
     * @param {OrgMember} orgMember The orgMember to create
     * @return {Promise<OrgMember || null>}
     */
    async createOrgMember(orgMember: OrgMember): Promise<OrgMember | null> {
        const org = await this.OrganisationModel.findOne({ _id: orgMember.organisation }).exec();
        if (org) {
            org.members.push(orgMember);
            await org.save();
        }else{
            throw new Error('Organisation not found');
        }
        return this.OrgMemberModel.create(orgMember);
    }

    /**
     * Update an OrgMember
     * @param {string} _id The id of the orgMember to update
     * @param {OrgMember} updatedOrgMember The new orgMember information
     * @return {Promise<OrgMember || null>}
     */
    async updateOrgMember(_id: string, updatedOrgMember: OrgMember): Promise<OrgMember | null> {
        return this.OrgMemberModel.findOneAndUpdate({ _id }, updatedOrgMember, { new: true }).exec();
    }

    /**
     * Delete an OrgMember
     * @param {string} _id The id of the orgMember to delete
     * @return {Promise<OrgMember || null>}
     */
    async deleteOrgMember(_id: string): Promise<OrgMember | null> {
        return this.OrgMemberModel.findOneAndDelete({ _id }).exec();
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
     * @param {string} _id The id of the adopter to update
     * @param {Adopter} updatedAdopter The new adopter information
     * @return {Promise<Adopter || null>}
     */
    async updateAdopter(_id: string, updatedAdopter: Adopter): Promise<Adopter | null> {
        return this.AdopterModel.findOneAndUpdate({ _id }, updatedAdopter, { new: true }).exec();
    }

    /**
     * Delete an Adopter
     * @param {string} _id The id of the adopter to delete
     * @return {Promise<Adopter || null>}
     */
    async deleteAdopter(_id: string): Promise<Adopter | null> {
        return this.AdopterModel.findOneAndDelete({ _id }).exec();
    }

    /**
     * Update an Dog
     * @param {string} _id The id of the dog to update
     * @param {Dog} updatedDog The new dog information
     * @return {Promise<Dog || null>}
     */
    async updateDog(_id: string, updatedDog: Dog): Promise<Dog | null> {
        return this.DogModel.findOneAndUpdate({ _id }, updatedDog, { new: true }).exec();
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
     * @param {string} _id The id of the contactInfo to update
     * @param {ContactInfo} updatedContactInfo The new contactInfo information
     * @return {Promise<ContactInfo || null>}
     */
    async updateContactInfo(_id: string, updatedContactInfo: ContactInfo): Promise<ContactInfo | null> {
        return this.ContactInfoModel.findOneAndUpdate({ _id }, updatedContactInfo, { new: true }).exec();
    }

    /**
     * Delete an Contact Info
     * @param {string} _id The id of the contactInfo to delete
     * @return {Promise<ContactInfo || null>}
     */
    async deleteContactInfo(_id: string): Promise<ContactInfo | null> {
        return this.ContactInfoModel.findOneAndDelete({ _id }).exec();
    }

    /**
     * Find an Adopter by email
     * @param {string} email The email of the adopter to find
     * @return {Promise<Adopter || null>}
     */
    async findAdopter(email: string): Promise<Adopter | null> {
        return this.AdopterModel.findOne({ email }).exec();
    }

    /**
     * Find adopters by _id
     * @param {string} _id The _id of the adopter to find
     * @return {Promise<Adopter || null>}
     */
    async findAdopterBy_Id(_id: string): Promise<Adopter | null> {
        return this.AdopterModel.findOne({_id}).exec();
    }

    /**
     * Find a OrgMember by id
     * @param {string} _id The id of the orgMember to find
     * @return {Promise<OrgMember || null>} 
     */
    async findOrgMember(_id: string): Promise<OrgMember | null> {
        return this.OrgMemberModel.findOne({ _id }).exec();
    }

    /**
     * Find a Dog by id
     * @param {string} _id The id of the dog to find
     * @return {Promise<Dog || null>}
     */
     async findDog(_id: string): Promise<Dog | null> {
        return this.DogModel.findOne({ _id }).exec();
    }

    /**
     * Find Dogs by name
     * @param {string} name The name of the dogs to find
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
     * Find all Dogs by breed
     * @param {string} breed The breed to find all dogs for
     * @return {Promise<Dog[]>}
     */
     async findDogsByBreed(breed: string): Promise<Dog[]> {
        return this.DogModel.find({ breed }).exec();
    }

    /**
     * Find all OrgMembers by Organisation
     * @param {string} organisation The organisation id to find all orgMembers for
     * @return {Promise<OrgMember[]>}
     */
    async findOrgMembersByOrganisation(organisation: string): Promise<OrgMember[]> {
        return this.OrgMemberModel.find({ organisation }).exec();
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
     * find all dogs liked by an adopter
     * @param {string} _id The id of the adopter to find
     * @return {Promise<Dog[] || null>}
     */
    async findDogsLikedByAdopter(_id: string): Promise<Dog[] | null> {
        const adopter = await this.AdopterModel.findOne({ _id }).exec();
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
     * for the orgProfile and adoption process page
     * find organisation by id
     * @param {string} _id The id of the organisation to find
     * @return {Promise<Organisation || null>}
     */
    async findOrgById(_id: string): Promise<Organisation | null> {
        return this.OrganisationModel.findOne({ _id }).exec();
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
        const user = await this.AdopterModel.findOne({_id: userId}).exec();
        const index = dog.usersLiked.findIndex(function(aUser){
            return user._id == aUser._id;
        });

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
     * @param {string} dogId The _id of the dog linked to the potential adopter
     * @return {Promise<Organisation || null>}
     */
    async addAdopterToOrgPotentialAdopters(_id: string, userId: string, dogId: string): Promise<Organisation | null> {
        const org = await this.OrganisationModel.findOne({_id}).exec();
        if(org == null){
            throw new Error("Org does not exist");
        }
        const user = await this.AdopterModel.findOne({_id: userId}).exec();
        if(user == null){
            throw new Error("User does not exist");
        }
        const potentialAdopter = await this.PotentialAdopterModel.create({dogId: dogId, adopter: user});
        org.potentialAdopters.push(potentialAdopter);
        return org.save();
    }

    /**
     * for the Dashboard Page
     * add a dog to adopters dogsDisliked
     * @param {string} _id The _id of the adopter to update
     * @param {string} dogId The _id of the dog to add
     * @return {Promise<Adopter || null>}
     */
    async addDogToAdopterDogsDisliked(_id: string, dogId: string): Promise<Adopter | null> {
        const adopter = await this.AdopterModel.findOne({_id}).exec();
        if(adopter == null){
            throw new Error("Adopter does not exist");
        }
        const dog = await this.DogModel.findOne({_id: dogId}).exec();
        if(dog == null){
            throw new Error("Dog does not exist");
        }
        adopter.dogsDisliked.push(dog);
        return adopter.save();
    }

    /**
     * for the Dashboard Page
     * remove a dog from adopters dogsLiked
     * @param {string} _id The _id of the adopter to update
     * @param {string} dogId The _id of the dog to remove
     * @return {Promise<Adopter || null>}
     */
    async removeDogFromAdopterDogsLiked(_id: string, dogId: string): Promise<Adopter | null> {
        const adopter = await this.AdopterModel.findOne({_id}).exec();
        if(adopter == null){
            throw new Error("Adopter does not exist");
        }
        const dog = await this.DogModel.findOne({_id: dogId}).exec();
        const index = adopter.dogsLiked.findIndex(function(aDog){
            return dog._id == aDog._id;
        });
        if(index == -1){
            throw new Error("Dog not found");
        } 
        adopter.dogsLiked.splice(index, 1);
        return adopter.save();
    }

    /**
     * used in ownedDogs page
     * find dogs by org
     * @param {string} name The name of the org to find
     * @return {Promise<Dog[]>}
     * 
     */
     async findDogsByOrg(orgName: string): Promise<Dog[]> {
        return this.DogModel.find({orgName: orgName}).exec();
    }

    /**
     * used in userLikes page
     * find dogs in adopters dogsLiked
     * @param {string} _id The _id of the adopter to find
     * @return {Promise<Dog[]>}
     */
    async findDogsInAdopterDogsLiked(_id: string): Promise<Dog[]> {
        const adopter = await this.AdopterModel.findOne({_id}).exec();
        if(adopter == null){
            throw new Error("Adopter does not exist");
        }
        return adopter.dogsLiked;
    }

    /**
     * used in home swiping page
     * Find all Dogs
     * @return {Promise<Dog[]>}
     */
     async findDogs(): Promise<Dog[]> {
        return this.DogModel.find().exec();
    }

    /**
     * used in home swiping page
     * find adopter by _id
     * @param {string} _id The _id of the adopter to find
     * @return {Promise<Adopter || null>}
     */
    async findAdopterById(_id: string): Promise<Adopter | null> {
        const user = this.AdopterModel.findOne({ _id }).exec();
        if (user == null) {
            throw new Error("User does not exist");
        }
        return user;
    }

    /**
     * used in home swiping page
     * remove a dog from a adopters dogsLiked or dogsDisliked
     * @param {string} _id The _id of the adopter to update
     * @param {string} dogId The _id of the dog to remove
     * @return {Promise<Adopter || null>}
     */
    async removeDogFromAdopterDogsLikedOrDisliked(_id: string, dogId: string): Promise<Adopter | null> {
        const adopter = await this.AdopterModel.findOne({_id}).exec();
        if(adopter == null){
            throw new Error("Adopter does not exist");
        }
        const dog = await this.DogModel.findOne({_id: dogId}).exec();
        if(dog == null){
            throw new Error("Dog does not exist");
        }
        const index = adopter.dogsLiked.findIndex(function(aDog){
            return dog._id == aDog._id;
        });
        if(index != -1){
            adopter.dogsLiked.splice(index, 1);
        }
        const index2 = adopter.dogsDisliked.findIndex(function(aDog){
            return dog._id == aDog._id;
        });
        if(index2 != -1){
            adopter.dogsDisliked.splice(index2, 1);
        }
        const index3 = dog.usersLiked.findIndex(function(aUser){
            return _id == aUser._id;
        });
        if(index3 != -1){
            dog.usersLiked.splice(index3, 1);
        }
        dog.save();
        return adopter.save();
    }

    /**
     * used in Home page
     * add an adopter to a dogs usersLiked
     * @param {string} dogId The name of the dog to add the user to
     * @param {Adopter} userId The name of the user to add to the dog
     * @return {Promise<Dog || null>}
     */
    async addUserToUserLikes(dogId: string, userId: string): Promise<Dog | null> {
        const dog = await this.DogModel.findOne({_id: dogId}).exec();
        const adopter = await this.AdopterModel.findOne({_id: userId}).exec();
        if(adopter == null){
            throw new Error("Adopter does not exist");
        }
        dog.usersLiked.push(adopter);
        dog.save();
        return dog;
    }

    /**
     * used in Home page
     * add a dog to adopter dogsLiked
     * @param {string} _id The _id of the adopter to update
     * @param {string} dogId The _id of the dog to add
     * @return {Promise<Adopter || null>}
     */
    async addDogToAdopterDogsLiked(_id: string, dogId: string): Promise<Adopter | null> {
        const adopter = await this.AdopterModel.findOne({_id}).exec();
        if(adopter == null){
            throw new Error("Adopter does not exist");
        }
        const dog = await this.DogModel.findOne({_id: dogId}).exec();
        if(dog == null){
            throw new Error("Dog does not exist");
        }
        adopter.dogsLiked.push(dog);
        return adopter.save();
    }

    /**
     * used in updateorremove page
     * update a dogs breed
     * @param {string} dogId The _id of the dog to update
     * @param {string} breed The new breed of the dog
     * @return {Promise<Dog || null>}
     */
    async updateDogBreed(dogId: string, breed: string): Promise<Dog | null> {
        const dog = await this.DogModel.findOne({_id: dogId}).exec();
        if(dog == null){
            throw new Error("Dog does not exist");
        }
        dog.breed = breed;
        return dog.save();
    }

    /**
     * used in updateorremove page
     * update a dogs gender
     * @param {string} dogId The _id of the dog to update
     * @param {string} gender The new gender of the dog
     * @return {Promise<Dog || null>}
     */
     async updateDogGender(dogId: string, gender: string): Promise<Dog | null> {
        const dog = await this.DogModel.findOne({_id: dogId}).exec();
        if(dog == null){
            throw new Error("Dog does not exist");
        }
        dog.gender = gender;
        return dog.save();
     }

     /**
     * used in updateorremove page
     * update a dogs dob
     * @param {string} dogId The _id of the dog to update
     * @param {Date} dob The new dob of the dog
     * @return {Promise<Dog || null>}
     */
      async updateDogdob(dogId: string, dob: Date): Promise<Dog | null> {
        const dog = await this.DogModel.findOne({_id: dogId}).exec();
        if(dog == null){
            throw new Error("Dog does not exist");
        }
        dog.dob = dob;
        return dog.save();
     }

     /**
     * used in updateorremove page
     * update a dogs about
     * @param {string} dogId The _id of the dog to update
     * @param {string} about The new about of the dog
     * @return {Promise<Dog || null>}
     */
      async updateDogabout(dogId: string, about: string): Promise<Dog | null> {
        const dog = await this.DogModel.findOne({_id: dogId}).exec();
        if(dog == null){
            throw new Error("Dog does not exist");
        }
        dog.about = about;
        return dog.save();
     }

    /**
     * used in updateorremove page
     * update a dogs height
     * @param {string} dogId The _id of the dog to update
     * @param {number} height The new height of the dog
     * @return {Promise<Dog || null>}
     */
    async updateDogheight(dogId: string, height: number): Promise<Dog | null> {
        const dog = await this.DogModel.findOne({_id: dogId}).exec();
        if(dog == null){
            throw new Error("Dog does not exist");
        }
        dog.height = height;
        return dog.save();
    }

    /**
     * used in updateorremove page
     * update a dogs weight
     * @param {string} dogId The _id of the dog to update
     * @param {number} weight The new weight of the dog
     * @return {Promise<Dog || null>}
     */
    async updateDogweight(dogId: string, weight: number): Promise<Dog | null> {
        const dog = await this.DogModel.findOne({_id: dogId}).exec();
        if(dog == null){
            throw new Error("Dog does not exist");
        }
        dog.weight = weight;
        return dog.save();
    }

    /**
     * used in updateorremove page
     * update a dogs furlength
     * @param {string} dogId The _id of the dog to update
     * @param {string} furLength The new furLength of the dog
     * @return {Promise<Dog || null>}
     */
    async updateDogfurLength(dogId: string, furLength: string): Promise<Dog | null> {
        const dog = await this.DogModel.findOne({_id: dogId}).exec();
        if(dog == null){
            throw new Error("Dog does not exist");
        }
        dog.furLength = furLength;
        return dog.save();
    }

    /**
     * used in updateorremove page
     * update a dogs temperament
     * @param {string} dogId The _id of the dog to update
     * @param {[string]} temperament The new temperament of the dog
     * @return {Promise<Dog || null>}
     */
    async updateDogtemperament(dogId: string, temperament: [string]): Promise<Dog | null> {
        const dog = await this.DogModel.findOne({_id: dogId}).exec();
        if(dog == null){
            throw new Error("Dog does not exist");
        }
        dog.temperament = temperament;
        return dog.save();
    }

    /**
     * used in updateorremove page
     * delete a dog by _id
     * @param {string} dogId The _id of the dog to delete
     * @return {Promise<Dog || null>}
     */
    async deleteDog(dogId: string): Promise<Dog | null> {
        const dog = await this.DogModel.findOne({_id: dogId}).exec();
        if(dog == null){
            throw new Error("Dog does not exist");
        }
        const dog1 = await this.DogModel.findOne({_id: dogId}).exec();
        const org = await this.OrganisationModel.findOne({_id: dog1.organisation._id}).exec();
        org.totalDogs--;
        org.save();
        return dog.remove();
    }

    /* getUserType
     * @param {string} id The id of the user to find
     * @return {Promise<string>}
     */
    async getUserType(id: string): Promise<string> {
        const user = await this.AdopterModel.findOne({_id: id}).exec();
        if(user == null){
            const user = await this.OrgMemberModel.findOne({_id: id}).exec();
            if(user == null){
                return "User does not exist";
            }
            return "OrgMember";
        }
        return "Adopter";
    }

    /**
     * used in ownedDogs page
     * find orgMember by id
     * @param {string} _id The id of the orgMember to find
     * @return {Promise<OrgMember || null>}
     */
    async findOrgMemberById(_id: string): Promise<OrgMember | null> {
        return this.OrgMemberModel.findOne({ _id }).exec();
    }

    /**
     * used in ownedDogs page
     * find dogs by orgId
     * @param {string} _id The id of the org to find
     * @return {Promise<Dog[]>}
     */
    async findDogsByOrgId(_id: string): Promise<Dog[]> {
        // const org = await this.OrganisationModel.findOne({_id}).exec();
        const dog = await this.DogModel.find().exec();
        const ret = [];
        dog.forEach(dog => {
            if(dog.organisation._id == _id){    
                ret.push(dog);
            }
        });
        return ret;
    }

    /**
     * used in updateOrg function
     * create an orgMember without adding them to the org
     * @param {OrgMember} member The orgMember
     * @return {Promise<OrgMember || null>}
     */
    async createOrgMemberWithoutAddingToOrg(member: OrgMember): Promise<OrgMember | null> {
        return this.OrgMemberModel.create(member);
    }

    /**
     * used in chatlist page
     * find all chats for an organisation
     * @param {string} orgmemberId The id of the orgmember to find
     * @return {Promise<Chat[]>}
     */
    async findChatsByOrgmemberId(orgmemberId: string): Promise<Chat[]> {
        const orgmember = await this.OrgMemberModel.findOne({_id: orgmemberId}).exec();
        if(orgmember == null){
            throw new Error("OrgMember does not exist");
        }
        const org = await this.OrganisationModel.findOne({_id: orgmember.organisation}).exec();
        const chat = await this.ChatModel.find().exec();
        const ret = [];
        chat.forEach(chat => {
            if(chat.orgId == org._id){    
                ret.push(chat);
            }
        });
        return ret;
    }

    /**
     * used in chatlist page
     * find all chats for an adopter
     * @param {string} adopterId The id of the adopter to find
     * @return {Promise<Chat[]>}
     */
    async findChatsByAdopterId(adopterId: string): Promise<Chat[]> {
        const chat = await this.ChatModel.find().exec();
        const ret = [];
        chat.forEach(chat => {
            if(chat.adopterId == adopterId){    
                ret.push(chat);
            }
        });
        return ret;
    }

    /**
     * used in chat page
     * find a chat by orgId and adopterId
     * @param {string} orgId The id of the org to find
     * @param {string} adopterId The id of the adopter to find
     * @return {Promise<Chat || null>}
     */
    async findChatByOrgIdAndAdopterId(orgId: string, adopterId: string): Promise<Chat | null> {
        return this.ChatModel.findOne({orgId, adopterId}).exec();
    }

    /**
     * used in chat page
     * send a message
     * @param {string} orgId The id of the org to find
     * @param {string} adopterId The id of the adopter to find
     * @param {string} senderId The id of the sender
     * @param {string} message The message to send
     * @return {Promise<Chat || null>}
     */
    async sendMessage(orgId: string, adopterId: string, senderId: string, message: string): Promise<Chat | null> {
        const chat = await this.ChatModel.findOne({orgId, adopterId}).exec();
        if(chat == null){
            throw new Error("Chat does not exist");
        }else{
            const msg = await this.MessageModel.create({userId: senderId, message: message});
            chat.messages.push(msg);
            return chat.save();
        }
    }

    /**
     * used in chat page
     * create a chat
     * @param {string} orgId The id of the org to find
     * @param {string} adopterId The id of the adopter to find
     * @param {string} dogId The id of the dog
     * @return {Promise<Chat || null>}
     */
    async createChat(orgId: string, adopterId: string, dogId: string): Promise<Chat | null> {
        const chat = new Chat();
        chat.orgId = orgId;
        chat.adopterId = adopterId;
        chat.dogId = dogId;
        chat.disabled = false;
        const message = "Hello, the adoption process has begun! Please keep an eye out for further communication from us.";
        await this.ChatModel.create(chat);
        return this.sendMessage(orgId, adopterId, orgId, message);
    }

    /**
     * used in userAdoptions page
     * reject an adoption process
     * @param {string} orgId The id of the org to find
     * @param {string} adopterId The id of the adopter to find
     * @param {string} dogId The id of the dog
     * @return {Promise<Organisation || null>}
     */
    async rejectAdoption(orgId: string, adopterId: string, dogId: string): Promise<Organisation | null> {
        //remove potentialAdopter entry 
        //send message in chat to adopter saying adoption has been rejected
        const org = await this.OrganisationModel.findOne({_id: orgId}).exec();
        if(org == null){
            throw new Error("Org does not exist");
        }
        else{
            const adopter = await this.AdopterModel.findOne({_id: adopterId}).exec();
            if(adopter == null){
                throw new Error("Adopter does not exist");
            }
            else{
                const chat = await this.ChatModel.findOne({orgId, adopterId}).exec();
                if(chat == null){
                    throw new Error("Chat does not exist");
                }
                else{
                    const message = "We are sorry to inform you that your adoption request has been rejected.";
                    const msg = await this.MessageModel.create({orgId, message});
                    chat.messages.push(msg);
                    chat.disabled = true;
                    await chat.save();
                    org.potentialAdopters.forEach(potentialAdopter => {
                        if(potentialAdopter.adopter._id == adopterId && potentialAdopter.dogId == dogId){
                            org.potentialAdopters.splice(org.potentialAdopters.indexOf(potentialAdopter), 1);
                        }
                    });
                    await this.PotentialAdopterModel.deleteOne({adopter, dogId});
                    await org.save();
                    return org;
                }
            }
            }
        }

    /**
     * used in userAdoptions page
     * accept an adoption process
     * @param {string} orgId The id of the org to find
     * @param {string} adopterId The id of the adopter to find
     * @param {string} dogId The id of the dog
     * @return {string}
     */
    async acceptAdoption(orgId: string, adopterId: string, dogId: string): Promise<string> {
        //send message in chat to adopter saying adoption has been accepted

        const chat = await this.ChatModel.findOne({orgId, adopterId, dogId}).exec();
        if(chat == null){
            throw new Error("Chat does not exist");
        }
        else{
            const message = "We are happy to inform you that your adoption request has been accepted. Please click the Appointment icon on the bottom right to book an appointment to collect the dog.";
            const msg = await this.MessageModel.create({orgId, message});
            chat.messages.push(msg);
            await chat.save();
            return "Adoption accepted";
        }
    }

    /**
     * used in userAdoptions page
     * completeAdoption process
     * @param {string} orgId The id of the org to find
     * @param {string} adopterId The id of the adopter to find
     * @param {string} dogId The id of the dog
     * @return {string}
     */
    async completeAdoption(orgId: string, adopterId: string, dogId: string): Promise<string> {
        //remove the dog from all adopters likedDogs and dislikedDogs
        //remove the dog from all orgs potentialAdopters and send a message in chat to all adopters in potential adopters saying the dog has been adopted
        //remove the dog from orgs ownedDogs
        //send a message in the chat to the adopter saying congratulations on adopting the dog
        const org = await this.OrganisationModel.findOne({_id: orgId}).exec();
        if(org == null){
            throw new Error("Org does not exist");
        }
        else{
            const adopter = await this.AdopterModel.findOne({_id: adopterId}).exec();
            if(adopter == null){
                throw new Error("Adopter does not exist");
            }
            else{
                const dog = await this.DogModel.findOne({_id: dogId}).exec();
                if(dog == null){
                    throw new Error("Dog does not exist");
                }
                else{
                    const chat = await this.ChatModel.findOne({orgId, adopterId}).exec();
                    if(chat == null){
                        throw new Error("Chat does not exist");
                    }
                    else{
                        const message = "Congratulations on adopting the dog! We hope you and the dog have a long and happy life together.";
                        const msg = await this.MessageModel.create({orgId, message});
                        chat.messages.push(msg);
                        chat.disabled = true;
                        await chat.save();
                        org.potentialAdopters.forEach(async potentialAdopter => {
                            if(potentialAdopter.dogId == dogId){
                                const tempId = potentialAdopter.adopter._id;
                                const tempChat = await this.ChatModel.findOne({orgId, tempId}).exec();
                                const message = "We are sorry to inform you that the dog you were interested in has been adopted.";
                                const msg = await this.MessageModel.create({orgId, message});
                                tempChat.messages.push(msg);
                                tempChat.disabled = true;
                                await tempChat.save();
                                org.potentialAdopters.splice(org.potentialAdopters.indexOf(potentialAdopter), 1);
                            }
                        });
                        org.totalDogs--;
                        org.totalAdoptions++;
                        await org.save();
                        dog.organisation = null;
                        await dog.save();
                        const allAdopters = await this.AdopterModel.find({}).exec();
                        allAdopters.forEach(async adopter => {
                            adopter.dogsLiked.forEach(likedDog => {
                                if(likedDog._id == dogId){
                                    adopter.dogsLiked.splice(adopter.dogsLiked.indexOf(likedDog), 1);
                                    adopter.dogsDisliked.push(likedDog);
                                }
                            });
                            await adopter.save();
                        });
                        return "Adoption completed";
                    }
                }
            }
        }
    }

    /**
     * used in uploaddoc page
     * takes in a type and path and creates a Doc and adds it to an adopters documents array
     * @param {string} adopterId The id of the adopter to find
     * @param {string} type The type of document
     * @param {string} path The path of the document
     * @return {string}
     */
    async uploadDoc(adopterId: string, type: string, path: string): Promise<string> {
        const adopter = await this.AdopterModel.findOne({_id: adopterId}).exec();
        if(adopter == null){
            throw new Error("Adopter does not exist");
        }
        else{
            const doc = await this.DocModel.create({type, path});
            adopter.documents.push(doc);
            await adopter.save();
            return "Document uploaded";
        }
    }

    /**
     * used in addorg page
     * creates a statistic using an orgID
     * @param {string} orgId The id of the org to find
     * @return {string}
     */
    async createStatistic(orgId: string): Promise<string> {
        const statistic = await this.StatisticModel.create({orgId});
        return "Statistic created";
    }

    
    /**
     * used in adddog page
     * adds a dog to a Statistics createdDogs and adds a timestamp of the current date to the createdTimeStamp array
     * @param {string} dogId The id of the dog to find
     * @param {string} orgId The id of the statistic for the org to find
     * @return {string}
     */
     async addCreatedDog(dogId: string, orgId: string): Promise<string> {
        const dog = await this.DogModel.findOne({_id: dogId}).exec();
        if(dog == null){
            throw new Error("Dog does not exist");
        }
        else{
            const statistics = await this.StatisticModel.findOne({orgId}).exec();
            if(statistics == null){
                throw new Error("Statistics does not exist");
            }
            else{
                statistics.createdDogs.push(dog);
                statistics.createdTimeStamps.push(new Date());
                await statistics.save();
                return "Dog added to in process";
            }
        }
    }


    /**
     * used in dashboard page
     * adds a dog to a Statistics inProcessDogs and adds a timestamp of the current date to the inProcessTimeStamp array
     * @param {string} dogId The id of the dog to find
     * @param {string} orgId The id of the statistic for the org to find
     * @return {string}
     */
    async addInProcessDog(dogId: string, orgId: string): Promise<string> {
        const dog = await this.DogModel.findOne({_id: dogId}).exec();
        if(dog == null){
            throw new Error("Dog does not exist");
        }
        else{
            const statistics = await this.StatisticModel.findOne({orgId}).exec();
            if(statistics == null){
                throw new Error("Statistics does not exist");
            }
            else{
                statistics.inProcessDogs.push(dog);
                statistics.inProcessTimeStamps.push(new Date());
                await statistics.save();
                return "Dog added to in process";
            }
        }
    }

    /**
     * used in userAdoption page
     * adds a dog to a Statistics AdoptedDogs and adds a timestamp of the current date to the AdoptedTimeStamp array
     * @param {string} dogId The id of the dog to find
     * @param {string} orgId The id of the statistic for the org to find
     * @return {string}
     */
     async addAdoptedDog(dogId: string, orgId: string): Promise<string> {
        const dog = await this.DogModel.findOne({_id: dogId}).exec();
        if(dog == null){
            throw new Error("Dog does not exist");
        }
        else{
            const statistics = await this.StatisticModel.findOne({orgId}).exec();
            if(statistics == null){
                throw new Error("Statistics does not exist");
            }
            else{
                statistics.adoptedDogs.push(dog);
                statistics.adoptedTimeStamps.push(new Date());
                await statistics.save();
                return "Dog added to adopted";
            }
        }
    }

    /**
     * used in userAdoption page
     * adds a dog to a Statistics rejectedDogs and adds a timestamp of the current date to the rejectedTimeStamp array
     * @param {string} dogId The id of the dog to find
     * @param {string} orgId The id of the statistic for the org to find
     * @return {string}
     */
     async addRejectedDog(dogId: string, orgId: string): Promise<string> {
        const dog = await this.DogModel.findOne({_id: dogId}).exec();
        if(dog == null){
            throw new Error("Dog does not exist");
        }
        else{
            const statistics = await this.StatisticModel.findOne({orgId}).exec();
            if(statistics == null){
                throw new Error("Statistics does not exist");
            }
            else{
                statistics.rejectedDogs.push(dog);
                statistics.rejectedTimeStamps.push(new Date());
                await statistics.save();
                return "Dog added to rejected";
            }
        }
    }

    /**
     * used in orgProfile page
     * get a statistic by orgId
     * @param {string} orgId The id of the org to find
     * @return {Statistic}
     */
    async getStatistic(orgId: string): Promise<Statistic> {
        const statistics = await this.StatisticModel.findOne({orgId}).exec();
        if(statistics == null){
            throw new Error("Statistics does not exist");
        }
        else{
            return statistics;
        }
    }

    /**
     * used in userAdoption page
     * get an org by orgmemberId
     * @param {string} orgMemberId The id of the orgMember to find the org of
     * @return {Organisation}
     */
    async findOrgByOrgmemberId(orgmemberId: string): Promise<Organisation> {
        const orgMember = await this.OrgMemberModel.findOne({_id: orgmemberId}).exec();
        if(orgMember == null){
            throw new Error("OrgMember does not exist");
        }
        else{
            const org = await this.OrganisationModel.findOne({_id: orgMember.organisation}).exec();
            if(org == null){
                throw new Error("Org does not exist");
            }
            else{
                return org;
            }
        }
    }

    

}