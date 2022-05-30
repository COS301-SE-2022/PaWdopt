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

@ObjectType('DogType')
@InputType('DogInputType')
export class DogType {
    @Field()
    breed: string;

    @Field()
    characteristics: Characteristics;
}