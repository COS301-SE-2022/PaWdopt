import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ApiService } from './api.service';
import { DogType, OrganisationType, LocationType, UserType ,PicType, ContactInfoType, DocType, AdopterType, OrgMemberType } from './api.dto';
import { Dog, Pic, Organisation, Location, User, ContactInfo, Doc, Adopter} from './api.schema';
import { Type } from '@angular/core';


@Resolver()
export class ApiResolver {
    constructor(private readonly DogService: ApiService) {}

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

    @Mutation(returns => OrgMemberType)
    async createOrgMember(@Args('member') member: OrgMemberType) : Promise<OrgMemberType> {
        return this.DogService.createOrgMember(member);
    }

    @Mutation(returns => OrgMemberType)
    async updateOrgMember(@Args('email') email: string, @Args('member') member: OrgMemberType) : Promise<OrgMemberType> {
        return this.DogService.updateOrgMember(email, member);
    }

    @Mutation(returns => OrgMemberType)
    async deleteOrgMember(@Args('email') email: string) : Promise<OrgMemberType> {
        return this.DogService.deleteOrgMember(email);
    }
}