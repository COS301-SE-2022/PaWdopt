import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectType } from '@nestjs/graphql';


@ObjectType()
@Schema()
export class Location {
    @Prop()
    lat: number;

    @Prop()
    lng: number;
}

@ObjectType()
@Schema()
export class ContactInfo {
    @Prop()
    _id: string;

    @Prop()
    email: string;

    @Prop()
    phone: string;

    @Prop()
    website: string;

    @Prop()
    facebook: string;

    @Prop()
    instagram: string;

    @Prop()
    twitter: string;
}

@ObjectType()
@Schema()
export class Adopter {
    @Prop()
    _id: string;

    @Prop()
    name: string;

    @Prop()
    email: string;
    
    @Prop()
    pic: string;

    @Prop()
    location: Location;

    @Prop()
    documents: [Doc];

    @Prop()
    dogsLiked: [Dog];

    @Prop()
    dogsDisliked: [Dog];

    @Prop()
    uploadedDocs: boolean;
}
@ObjectType()
@Schema()
export class PotentialAdopter {
    @Prop()
    dogId: string;

    @Prop()
    adopter: Adopter;
}

@ObjectType()
@Schema()
export class Organisation {
    @Prop()
    _id: string;
    
    @Prop()
    name: string;

    @Prop()
    about: string;

    @Prop()
    dateFounded: Date;

    @Prop()
    totalAdoptions: number;

    @Prop()
    totalDogs: number;

    @Prop()
    members: [OrgMember];

    @Prop()
    location: Location;

    @Prop()
    rulesReq: string;

    @Prop()
    contactInfo: ContactInfo;

    @Prop()
    potentialAdopters: [PotentialAdopter];

    @Prop()
    logo: string;
}

@ObjectType()
@Schema()
export class Doc {
    @Prop()
    type: string;

    @Prop()
    path: string;
}

@ObjectType()
@Schema()
export class Dog {

    @Prop()
    _id: string;

    @Prop()
    name: string;

    @Prop()
    dob: Date;

    @Prop()
    gender: string;

    @Prop()
    pics: [string];

    @Prop()
    breed: string;

    @Prop()
    about: string;

    @Prop()
    organisation: Organisation;

    @Prop()
    weight: number;

    @Prop()
    height: number;

    @Prop()
    usersLiked: [Adopter];

    @Prop()
    furLength: string;

    @Prop()
    temperament: [string];
}

@ObjectType()
@Schema()
export class OrgMember {
    @Prop()
    _id: string;

    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop()
    role: string;

    @Prop()
    organisation: string;  
    
    @Prop()
    verification: Date;
}

@ObjectType()
@Schema()
export class Chat {
    @Prop()
    adopterId: string;

    @Prop()
    orgId: string;

    @Prop()
    messages: [MessageObj];

    @Prop()
    dogId: string;

    @Prop()
    disabled: boolean;

    @Prop()
    lastMessageAdopter: number;

    @Prop()
    lastMessageOrg: number;
}

@ObjectType()
@Schema()
export class MessageObj {
    @Prop()
    userId: string;

    @Prop()
    message: string;

}

@ObjectType()
@Schema()
export class Statistic {
    @Prop()
    orgId: string;

    @Prop()
    createdTimeStamps: [Date];

    @Prop()
    createdDogs: [Dog];

    @Prop()
    inProcessTimeStamps: [Date];

    @Prop()
    inProcessDogs: [Dog];

    @Prop()
    adoptedTimeStamps: [Date];

    @Prop()
    adoptedDogs: [Dog];

    @Prop()
    rejectedTimeStamps: [Date];

    @Prop()
    rejectedDogs: [Dog];

}


export type ContactInfoDocument = ContactInfo & Document;
export const ContactInfoSchema = SchemaFactory.createForClass(ContactInfo);
export type LocationDocument = Location & Document;
export const LocationSchema = SchemaFactory.createForClass(Location);
export type DogDocument = Dog & Document;
export const DogSchema = SchemaFactory.createForClass(Dog);
export type OrganisationDocument = Organisation & Document;
export const OrganisationSchema = SchemaFactory.createForClass(Organisation);
export type AdopterDocument = Adopter & Document;
export const AdopterSchema = SchemaFactory.createForClass(Adopter);
export type OrgMemberDocument = OrgMember & Document;
export const OrgMemberSchema = SchemaFactory.createForClass(OrgMember);
export type ChatDocument = Chat & Document;
export const ChatSchema = SchemaFactory.createForClass(Chat);
export type MessageDocument = MessageObj & Document;
export const MessageSchema = SchemaFactory.createForClass(MessageObj);
export type PotentialAdopterDocument = PotentialAdopter & Document;
export const PotentialAdopterSchema = SchemaFactory.createForClass(PotentialAdopter);
export type StatisticDocument = Statistic & Document;
export const StatisticSchema = SchemaFactory.createForClass(Statistic);
export type DocDocument = Doc & Document;
export const DocSchema = SchemaFactory.createForClass(Doc);