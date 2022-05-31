import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Url } from 'url';
import { Document } from 'mongoose';
import { type } from 'os';


@Schema()
export class User {
    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    type: string;
}

@Schema()
export class Location {
    @Prop()
    lat: number;

    @Prop()
    lng: number;
}

@Schema()
export class Image {
    @Prop()
    path: string;
}

@Schema()
export class Doc {
    @Prop()
    path: string;
}

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

@Schema()
export class Dog {
    @Prop()
    name: string

    @Prop()
    dob: Date;

    @Prop()
    images: Image[];

    @Prop()
    breed: string;

    @Prop()
    about: string;

    @Prop()
    organisation: string;

    @Prop()
    weight: number;

    @Prop()
    height: number;

    @Prop()
    usersLiked: User[];

    @Prop()
    furLength: string;

    @Prop()
    temperament: string[];
}

@Schema()
export class Organisation {
    @Prop()
    name: string;

    @Prop()
    about: string;

    @Prop()
    dateFounded: Date;

    @Prop()
    dogs: Dog[];

    @Prop()
    members: User[];

    @Prop()
    location: Location;

    @Prop()
    rulesReq: string;

    @Prop()
    contactInfo: ContactInfo;

    @Prop()
    logo: Image;
}

@Schema()
export class Adopter extends User {
    @Prop()
    IDNum: string;
    
    @Prop()
    image: Image;

    @Prop()
    location: Location;

    @Prop()
    documents: Doc[];

    @Prop()
    dogsLiked: Dog[];

    @Prop()
    questionnaire: string;
}

@Schema()
export class OrgMember extends User {
    @Prop()
    organisation: Organisation;    
}

export type DogDocument = Dog & Document;
export const DogSchema = SchemaFactory.createForClass(Dog);
export type ImageDocument = Image & Document;
export const ImageSchema = SchemaFactory.createForClass(Image);
export type OrganisationDocument = Organisation & Document;
export const OrganisationSchema = SchemaFactory.createForClass(Organisation);
export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
export type AdopterDocument = Adopter & Document;
export const AdopterSchema = SchemaFactory.createForClass(Adopter);
export type OrgMemberDocument = OrgMember & Document;
export const OrgMemberSchema = SchemaFactory.createForClass(OrgMember);
export type DocDocument = Doc & Document;
export const DocSchema = SchemaFactory.createForClass(Doc);
export type ContactInfoDocument = ContactInfo & Document;
export const ContactInfoSchema = SchemaFactory.createForClass(ContactInfo);
export type LocationDocument = Location & Document;
export const LocationSchema = SchemaFactory.createForClass(Location);