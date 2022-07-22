import { ObjectType, Field, InputType} from "@nestjs/graphql";
import { Dog, Organisation, Location, ContactInfo, OrgMember, Adopter } from './api.schema';

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


@ObjectType('DogType')
@InputType('DogInputType')
export class DogType {
    @Field()
    name: string;

    @Field()
    dob: Date;

    @Field()
    gender: string;

    @Field()
    pics: [string];

    @Field()
    breed: string;

    @Field()
    about: string;

    @Field(() => OrganisationType, { nullable: true})
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

    @Field()
    totalAdoptions: number;

    @Field()
    totalDogs: number;

    @Field(() => [OrgMemberType])
    members: [OrgMember];

    @Field(() => LocationType)
    location: Location;

    //Will be a pdf once Firebase storage is initialized
    @Field({ nullable: true })
    rulesReq: string;

    @Field(() => ContactInfoType)
    contactInfo: ContactInfo;

    @Field(() => [AdopterType], {nullable: true})
    potentialAdopters: [Adopter]; //use backend to get all dogs liked with same org 

    @Field({ nullable: true })
    logo: string;
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
    
    @Field({nullable:true})
    pic: string;

    @Field(() => LocationType, {nullable:true})
    location: Location;

    @Field({ nullable: true })
    documents: [string]; //must be in order of: ID, Proof of res, Bank, motivation letter

    @Field(() => [DogType], { nullable: true })
    dogsLiked: [Dog];

    @Field(() => [DogType], { nullable: true })
    dogsDisliked: [Dog];

    @Field() 
    uploadedDocs : boolean;//on create account set to false
}