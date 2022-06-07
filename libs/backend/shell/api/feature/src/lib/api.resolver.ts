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

    @Mutation(returns => DogType)
    async createDog(@Args('dog') dog: DogType) : Promise<DogType> {
        return this.DogService.createDog(dog);
    }

    @Mutation(returns => DogType)
    async updateDog(@Args('id') id: string, @Args('dog') dog: DogType) : Promise<DogType> {
        return this.DogService.updateDog(id, dog);
    }

    @Mutation(returns => DogType)
    async deleteDog(@Args('id') id: string) : Promise<DogType> {
        return this.DogService.deleteDog(id);
    }

    @Mutation(returns => PicType)
    async createPic(@Args('pic') pic: PicType) : Promise<PicType> {
        return this.DogService.createPic(pic);
    }

    @Mutation(returns => PicType)
    async updatePic(@Args('id') id: string, @Args('pic') pic: PicType) : Promise<PicType> {
        return this.DogService.updatePic(id, pic);
    }

    @Mutation(returns => PicType)
    async deletePic(@Args('id') id: string) : Promise<PicType> {
        return this.DogService.deletePic(id);
    }

    @Mutation(returns => LocationType)
    async createLocation(@Args('location') location: LocationType) : Promise<LocationType> {
        return this.DogService.createLocation(location);
    }

    @Mutation(returns => LocationType)
    async updateLocation(@Args('id') id: string, @Args('location') location: LocationType) : Promise<LocationType> {
        return this.DogService.updateLocation(id, location);
    }

    @Mutation(returns => LocationType)
    async deleteLocation(@Args('id') id: string) : Promise<LocationType> {
        return this.DogService.deleteLocation(id);
    }

    @Mutation(returns => UserType)
    async createUser(@Args('user') user: UserType) : Promise<UserType> {
        return this.DogService.createUser(user);
    }

    @Mutation(returns => UserType)
    async updateUser(@Args('email') email: string, @Args('user') user: UserType) : Promise<UserType> {
        return this.DogService.updateUser(email, user);
    }

    @Mutation(returns => UserType)
    async deleteUser(@Args('email') email: string) : Promise<UserType> {
        return this.DogService.deleteUser(email);
    }

    @Mutation(returns => ContactInfoType)
    async createContactInfo(@Args('contactInfo') contactInfo: ContactInfoType) : Promise<ContactInfoType> {
        return this.DogService.createContactInfo(contactInfo);
    }

    @Mutation(returns => ContactInfoType)
    async updateContactInfo(@Args('id') id: string, @Args('contactInfo') contactInfo: ContactInfoType) : Promise<ContactInfoType> {
        return this.DogService.updateContactInfo(id, contactInfo);
    }

    @Mutation(returns => ContactInfoType)
    async deleteContactInfo(@Args('id') id: string) : Promise<ContactInfoType> {
        return this.DogService.deleteContactInfo(id);
    }
}