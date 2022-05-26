import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

class Characteristics {
    lifespan: string
    size: 'small' | 'medium' | 'large'
    coat: 'short' | 'medium' | 'long'
    color: string
}

@Schema()
export class Cat {
    @Prop()
    breed: string;
    
    @Prop()
    characteristics: Characteristics;
}

export type CatDocument = Cat & Document;
export const CatSchema = SchemaFactory.createForClass(Cat);