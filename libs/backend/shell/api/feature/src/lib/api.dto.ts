import { ObjectType, Field, InputType } from "@nestjs/graphql";
import { Dog, Pic, Organisation, Location, User, ContactInfo, Doc} from './api.schema';
import { Url } from 'url';


@ObjectType('DocType')
@InputType('DocInputType')
export class DocType {
    @Field()
    path: string;
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

@ObjectType('PicType')
@InputType('PicInputType')
export class PicType {
    @Field()
    path: string;
}

@ObjectType('DogType')
@InputType('DogInputType')
export class DogType {
    @Field()
    name: string;

    @Field()
    dob: Date;

    @Field(() => PicType)
    pics: Pic[];

    @Field()
    breed: string;

    @Field()
    about: string;

    @Field(() => OrganisationType)
    organisation: Organisation;

    @Field()
    weight: number;

    @Field()
    height: number;

    @Field(() => UserType)
    usersLiked: User[];

    @Field()
    furLength: string;

    @Field(() => String)
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

    @Field(() => UserType)
    members: User[];

    @Field(() => LocationType)
    location: Location;

    @Field()
    rulesReq: string;

    @Field(() => ContactInfoType)
    contactInfo: ContactInfo;

    @Field(() => PicType)
    logo: Pic;
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

@ObjectType('AdopterType')
@InputType('AdopterInputType')
export class AdopterType extends UserType {
    @Field()
    IDNum: string;
    
    @Field(() => PicType)
    pic: Pic;

    @Field(() => LocationType)
    location: Location;

    @Field(() => DocType)
    documents: Doc[];

    @Field(() => DogType)
    dogsLiked: Dog[];

    @Field()
    questionnaire: Url;

    @Field()
    distance: number;
}

@ObjectType('OrgMemberType')
@InputType('OrgMemberInputType')
export class OrgMemberType extends UserType {
    @Field(() => OrganisationType)
    organisation: Organisation;
}