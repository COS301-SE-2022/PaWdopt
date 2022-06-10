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
export class Pic {
    @Prop()
    path: string;
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
    name: string;

    @Prop()
    about: string;

    @Prop()
    dateFounded: Date;

    @Prop()
    members: [OrgMember];

    @Prop()
    location: Location;

    @Prop()
    rulesReq: [string];

    @Prop()
    contactInfo: ContactInfo;

    @Prop()
    logo: Pic;
}

@ObjectType()
@Schema()
export class Dog {
    @Prop()
    name: string

    @Prop()
    dob: Date;

    @Prop()
    gender: string;

    @Prop()
    pics: [Pic];

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
    name: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    IDNum: string;
    
    @Prop()
    pic: Pic;

    @Prop()
    location: Location;

    @Prop()
    documents: [Doc];

    @Prop()
    dogsLiked: [Dog];

    @Prop()
    questionnaire: string;

    @Prop()
    distance: number;
}

@ObjectType()
@Schema()
export class OrgMember {
    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    organisation: string;    
}

export type DocDocument = Doc & Document;
export const DocSchema = SchemaFactory.createForClass(Doc);
export type ContactInfoDocument = ContactInfo & Document;
export const ContactInfoSchema = SchemaFactory.createForClass(ContactInfo);
export type LocationDocument = Location & Document;
export const LocationSchema = SchemaFactory.createForClass(Location);
export type PicDocument = Pic & Document;
export const PicSchema = SchemaFactory.createForClass(Pic);
export type DogDocument = Dog & Document;
export const DogSchema = SchemaFactory.createForClass(Dog);
export type OrganisationDocument = Organisation & Document;
export const OrganisationSchema = SchemaFactory.createForClass(Organisation);
export type AdopterDocument = Adopter & Document;
export const AdopterSchema = SchemaFactory.createForClass(Adopter);
export type OrgMemberDocument = OrgMember & Document;
export const OrgMemberSchema = SchemaFactory.createForClass(OrgMember);