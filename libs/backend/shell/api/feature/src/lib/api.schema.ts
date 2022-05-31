import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Url } from 'url';

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
    organisation: Organisation;

    @Prop()
    weight: number;

    @Prop()
    height: number;

    @Prop()
    UsersLiked: User[];

    @Prop()
    furLength: string;

    @Prop()
    temperament: string[];
}

@Schema()
export class Image {
    @Prop()
    url: string;
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
    questionnaire: Url;
}

@Schema()
export class OrgMember extends User {
    @Prop()
    organisation: Organisation;    
}

@Schema()
export class Doc {
    @Prop()
    url: string;
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
export class Location {
    @Prop()
    lat: number;

    @Prop()
    lng: number;
}

export const DogSchema = SchemaFactory.createForClass(Dog);