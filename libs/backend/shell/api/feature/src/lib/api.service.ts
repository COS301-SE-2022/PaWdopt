import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Dog, DogDocument, Image, ImageDocument, Organisation, OrganisationDocument, User, UserDocument, Adopter, AdopterDocument, OrgMember, OrgMemberDocument, Doc, DocDocument, ContactInfo, ContactInfoDocument, Location, LocationDocument } from './api.schema';

@Injectable()
export class ApiService {
    constructor(
        @InjectModel(Dog.name) private readonly DogModel: Model<DogDocument>, 
        @InjectModel(Image.name) private readonly ImageModel : Model<ImageDocument>,
        @InjectModel(Organisation.name) private readonly OrganisationModel : Model<OrganisationDocument>,
        @InjectModel(OrgMember.name) private readonly OrgMemberModel : Model<OrgMemberDocument>,
        @InjectModel(User.name) private readonly UserModel : Model<UserDocument>,
        @InjectModel(Adopter.name) private readonly AdopterModel : Model<AdopterDocument>,
        @InjectModel(Doc.name) private readonly DocModel : Model<DocDocument>,
        @InjectModel(ContactInfo.name) private readonly ContactInfoModel : Model<ContactInfoDocument>,
        @InjectModel(Location.name) private readonly LocationModel : Model<LocationDocument>,
        ) {}

    async findAllDogs(): Promise<Dog[]> {
        return this.DogModel.find().exec();
    }
    async findAllOrgs(): Promise<Organisation[]> {
        return this.OrganisationModel.find().exec();
    }
    async findAllUser(): Promise<User[]> {
        return this.UserModel.find().exec();
    }
    async findAllAdopter(): Promise<Adopter[]> {
        return this.AdopterModel.find().exec();
    }
}
