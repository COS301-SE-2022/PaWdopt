import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ApiService } from './api.service';
import { DogType, OrganisationType, LocationType, UserType ,PicType, ContactInfoType, DocType, AdopterType } from './api.dto';
import { Dog, Pic, Organisation, Location, User, ContactInfo, Doc, Adopter} from './api.schema';
import { Type } from '@angular/core';


@Resolver()
export class ApiResolver {
    constructor(private readonly DogService: ApiService) {}

    // @Query(returns => [DogType])
    // async Dog() {
    //     return this.DogService.findAllDogs();
    // }

    // @Query(returns => [DogType])
    // async User() {
    //     return this.DogService.findAllUser();
    // }

    // @Query(returns => [AdopterType])
    // async Adopter() {
    //     return this.DogService.findAllAdopter();
    // }

    @Query(returns => [OrganisationType])
    async Organisation() {
        return this.DogService.findAllOrgs();
    }

    @Mutation(returns => OrganisationType)
    async createOrg(@Args('org') org: OrganisationType) : Promise<OrganisationType> {
        return this.DogService.createOrg(org);
    }

    @Mutation(returns => OrganisationType)
    async updateOrg(@Args ('name') name: string, @Args('org') org: OrganisationType) : Promise<OrganisationType> {
        return this.DogService.updateOrg(name, org);
    }

    @Mutation(returns => OrganisationType)
    async deleteOrg(@Args('name') name: string) : Promise<OrganisationType> {
        return this.DogService.deleteOrg(name);
    }

}