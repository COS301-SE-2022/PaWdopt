import { ObjectType, Field, InputType} from "@nestjs/graphql";
import { Dog, Pic, Organisation, Location, ContactInfo, Doc, OrgMember, Adopter} from './api.schema';

@ObjectType('OrgMemberType')
@InputType('OrgMemberInputType')
export class OrgMemberType {
    @Field()
    name: string;

    @Field()
    email: string;

    @Field()
    password: string;

    @Field()
    organisation: string;
}

@ObjectType('DocType')
@InputType('DocInputType')
export class DocType {
    @Field()
    type: string;

    @Field()
    path: string;
}

@ObjectType('ContactInfoType')
@InputType('ContactInfoInputType')
export class ContactInfoType {
    @Field({ nullable: true })
    email: string;

    @Field({ nullable: true })
    phone: string;

    @Field({ nullable: true })
    website: string;

    @Field({ nullable: true })
    facebook: string;

    @Field({ nullable: true })
    instagram: string;

    @Field({ nullable: true })
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

    @Field()
    gender: string;

    @Field(() => [PicType])
    pics: [Pic];

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

    @Field(() => [AdopterType], { nullable: true })
    usersLiked: [Adopter];

    @Field()
    furLength: string;

    @Field(() => [String])
    temperament: [string];
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

    @Field(() => [OrgMemberType])
    members: [OrgMember];

    @Field(() => LocationType)
    location: Location;

    @Field(() => [String], { nullable: true })
    rulesReq: [string];

    @Field(() => ContactInfoType)
    contactInfo: ContactInfo;

    @Field(() => PicType, { nullable: true })
    logo: Pic;
}

@ObjectType('AdopterType')
@InputType('AdopterInputType')
export class AdopterType {
    @Field()
    name: string;

    @Field()
    email: string;

    @Field()
    password: string;

    @Field()
    IDNum: string;
    
    @Field(() => PicType, {nullable:true})
    pic: Pic;

    @Field(() => LocationType, {nullable:true})
    location: Location;

    @Field(() => [DocType], { nullable: true })
    documents: [Doc];

    @Field(() => [DogType], { nullable: true })
    dogsLiked: [Dog];

    @Field()
    questionnaire: string;

    @Field()
    distance: number;
}