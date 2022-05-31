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

export const DogSchema = SchemaFactory.createForClass(Dog);