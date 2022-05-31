import { ObjectType, Field, InputType } from "@nestjs/graphql";
import { Dog, Image, Organisation, Location, User, ContactInfo, Doc} from './api.schema';
import { Url } from 'url';

@ObjectType('DogType')
@InputType('DogInputType')
export class DogType {
    @Field()
    name: string;

    @Field()
    dob: Date;

    @Field()
    images: Image[];

    @Field()
    breed: string;

    @Field()
    about: string;

    @Field()
    organisation: Organisation;

    @Field()
    weight: number;

    @Field()
    height: number;

    @Field()
    usersLiked: User[];

    @Field()
    furLength: string;

    @Field()
    temperament: string[];
}

@ObjectType('OrganisationType')
@InputType('OrganisationInputType')
export class OrganisationType {
    @Field()
    name: string;

    @Field()
    about: string;

    @Field()
    dateFounded: Date;

    @Field()
    dogs: Dog[];

    @Field()
    members: User[];

    @Field()
    location: Location;

    @Field()
    rulesReq: string;

    @Field()
    contactInfo: ContactInfo;

    @Field()
    logo: Image;
}

@ObjectType('UserType')
@InputType('UserInputType')
export class UserType {
    @Field()
    name: string;

    @Field()
    email: string;

    @Field()
    password: string;

    @Field()
    type: string;
}

@ObjectType('ImageType')
@InputType('ImageInputType')
export class ImageType {
    @Field()
    url: string;
}

@ObjectType('AdopterType')
@InputType('AdopterInputType')
export class AdopterType extends UserType {
    @Field()
    IDNum: string;
    
    @Field()
    image: Image;

    @Field()
    location: Location;

    @Field()
    documents: Doc[];

    @Field()
    dogsLiked: Dog[];

    @Field()
    questionnaire: Url;
}

@ObjectType('OrgMemberType')
@InputType('OrgMemberInputType')
export class OrgMemberType extends UserType {
    @Field()
    organisation: Organisation;
}

@ObjectType('DocType')
@InputType('DocInputType')
export class DocType {
    @Field()
    url: string;
}

@ObjectType('ContactInfoType')
@InputType('ContactInfoInputType')
export class ContactInfoType {
    @Field()
    email: string;

    @Field()
    phone: string;

    @Field()
    website: string;

    @Field()
    facebook: string;

    @Field()
    instagram: string;

    @Field()
    twitter: string;
}

@ObjectType('LocationType')
@InputType('LocationInputType')
export class LocationType {
    @Field()
    lat: number;

    @Field()
    lng: number;
}