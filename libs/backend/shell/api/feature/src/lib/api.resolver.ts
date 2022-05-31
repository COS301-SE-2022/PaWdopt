import { Resolver, Query } from '@nestjs/graphql';
import { ApiService } from './api.service';
import { DogType, OrganisationType, LocationType, UserType ,ImageType, ContactInfoType, DocType, AdopterType } from './api.dto';
import { Dog, Image, Organisation, Location, User, ContactInfo, Doc, Adopter} from './api.schema';


@Resolver()
export class ApiResolver {
    constructor(private readonly DogService: ApiService) {}

    @Query(returns => [DogType])
    async Dog() {
        return this.DogService.findAllDogs();
    }

    @Query(returns => [OrganisationType])
    async Organisation() {
        return this.DogService.findAllOrgs();
    }

    @Query(returns => [DogType])
    async User() {
        return this.DogService.findAllUser();
    }

    @Query(returns => [AdopterType])
    async Adopter() {
        return this.DogService.findAllAdopter();
    }

}