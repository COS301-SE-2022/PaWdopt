import { ObjectType, Field, InputType} from "@nestjs/graphql";
import { Dog, Organisation, Location, ContactInfo, OrgMember, Adopter, Chat, MessageObj, PotentialAdopter, Statistic, Doc } from './api.schema';

@ObjectType('OrgMemberType')
@InputType('OrgMemberInputType')
export class OrgMemberType {
    @Field()
    _id: string;

    @Field()
    name: string;

    @Field()
    email: string;

    @Field()
    organisation: string;

    @Field()
    role: string;

    @Field({ nullable: true })
    verification: Date;
}

@ObjectType('ContactInfoType')
@InputType('ContactInfoInputType')
export class ContactInfoType {
    @Field()
    _id: string;

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

@ObjectType('AdopterType')
@InputType('AdopterInputType')
export class AdopterType {
    @Field()
    _id: string;

    @Field()
    name: string;

    @Field()
    email: string;
    
    @Field({nullable:true})
    pic: string;

    @Field(() => LocationType, {nullable:true})
    location: Location;

    @Field(() => [DocType], {nullable:true})
    documents: [DocType];
    //must be in order of: ID (ID), Proof of res (poR), bank (bank), motivation letter (motiv)

    @Field(() => [DogType], { nullable: true })
    dogsLiked: [Dog];

    @Field(() => [DogType], { nullable: true })
    dogsDisliked: [Dog];

    @Field() 
    uploadedDocs : boolean;//on create account set to false
}

@ObjectType('DogType')
@InputType('DogInputType')
export class DogType {
    @Field(() => String)
    _id: string;
    
    @Field()
    name: string;

    @Field()
    dob: Date;

    @Field()
    gender: string;

    @Field(() => [String])
    pics: [string];

    @Field()
    breed: string;

    @Field()
    about: string;

    @Field(() => OrganisationType, {nullable : true})
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

@ObjectType('PotentialAdopterType')
@InputType('PotentialAdopterInputType')
export class PotentialAdopterType {
    @Field()
    dogId: string;

    @Field(()=> AdopterType, { nullable: true })
    adopter: Adopter;
}

@ObjectType('OrganisationType')
@InputType('OrganisationInputType')
export class OrganisationType {
    @Field(() => String)
    _id: string;
    
    @Field()
    name: string;

    @Field()
    about: string;

    @Field()
    dateFounded: Date;//date that the org joined the app, for org info page

    @Field()
    totalAdoptions: number;//of all time

    @Field()
    totalDogs: number;//current amount of dogs

    @Field(() => [OrgMemberType], { nullable: true })
    members: [OrgMember];

    @Field(() => LocationType)
    location: Location;

    //Will be a pdf once Firebase storage is initialized
    @Field({ nullable: true })
    rulesReq: string;

    @Field(() => ContactInfoType)
    contactInfo: ContactInfo;

    @Field(() => [PotentialAdopterType], {nullable: true})
    potentialAdopters: [PotentialAdopter]; //use backend to get all dogs liked with same org 
    //check that the user is not 

    @Field({ nullable: true })
    logo: string;
}

@ObjectType('DocType')
@InputType('DocInputType')
export class DocType {
    @Field()
    type: string;

    @Field()
    path: string;
}

@ObjectType('ChatType')
@InputType('ChatInputType')
export class ChatType {
    @Field()
    adopterId: string;

    @Field()
    orgId: string;

    @Field(() => [MessageObjType], { nullable: true })
    messages: [MessageObj];

    @Field()
    dogId: string;

    @Field()
    disabled: boolean;
}

@ObjectType('MessageObjType')
@InputType('MessageObjInputType')
export class MessageObjType {
    @Field()
    userId: string;

    @Field()
    message: string;
}

@ObjectType('StatisticType')
@InputType('StatisticInputType')
export class StatisticType {
    @Field()
    orgId: string;

    @Field( () => [Date], { nullable: true })
    createdTimeStamps: [Date];

    @Field( () => [DogType], { nullable: true })
    createdDogs: [Dog];

    @Field( () => [Date], { nullable: true })
    inProcessTimeStamps: [Date];

    @Field( () => [DogType], { nullable: true })
    inProcessDogs: [Dog];

    @Field( () => [Date], { nullable: true })
    adoptedTimeStamps: [Date];

    @Field( () => [DogType], { nullable: true })
    adoptedDogs: [Dog];

    @Field( () => [Date], { nullable: true })
    rejectedTimeStamps: [Date];

    @Field( () => [DogType], { nullable: true })
    rejectedDogs: [Dog];

}