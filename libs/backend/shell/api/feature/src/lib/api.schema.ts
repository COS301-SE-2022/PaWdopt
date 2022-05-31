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

export const DogSchema = SchemaFactory.createForClass(Dog);