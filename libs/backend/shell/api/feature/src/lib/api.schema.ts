import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Dog {
    @Prop()
    name: string

    @Prop()
    breed: string;
    
    @Prop()
    dob: Date;
}

export type DogDocument = Dog & Document;
export const DogSchema = SchemaFactory.createForClass(Dog);