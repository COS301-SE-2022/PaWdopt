import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ObjectType, Field } from '@nestjs/graphql';


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
    potentialAdopters: [Adopter];

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
export class Adopter {
    @Prop()
    _id: string;

    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop()
    IDNum: string;
    
    @Prop()
    pic: string;

    @Prop()
    location: Location;

    @Prop()
    documents: [Doc];

    // @Prop()
    // idDoc: string;

    // @Prop()
    // porDoc: string;

    // @Prop()
    // bankDoc: string;

    // @Prop()
    // motivDoc: string;

    @Prop()
    dogsLiked: [Dog];

    @Prop()
    dogsDisliked: [Dog];

    @Prop()
    uploadedDocs: boolean;
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
    organisation: string;  
    
    @Prop()
    verification: Date;
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