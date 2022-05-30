import { ObjectType, Field, InputType } from "@nestjs/graphql";

@ObjectType('Characteristics')
@InputType('CharacteristicsInput')
class Characteristics {
    @Field()
    lifespan: string

    @Field()
    size: 'small' | 'medium' | 'large'

    @Field()
    coat: 'short' | 'medium' | 'long'

    @Field()
    color: string
}

@ObjectType('CatType')
@InputType('CatInputType')
export class CatType {
    @Field()
    breed: string;

    @Field()
    characteristics: Characteristics;
}