import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { ApiResolver } from './api.resolver';
import { MongooseModule } from '@nestjs/mongoose';

import { Dog, DogSchema } from './api.schema';
import { Pic, PicSchema } from './api.schema';
import { Organisation, OrganisationSchema } from './api.schema';
import { OrgMember, OrgMemberSchema } from './api.schema';
import { User, UserSchema } from './api.schema';
import { Adopter, AdopterSchema } from './api.schema';
import { ContactInfo, ContactInfoSchema } from './api.schema';
import { Doc, DocSchema } from './api.schema';
import { Location, LocationSchema } from './api.schema';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URL),
    MongooseModule.forFeature([{ name: Dog.name, schema: DogSchema }]),
    MongooseModule.forFeature([{ name: Pic.name, schema: PicSchema }]),
    MongooseModule.forFeature([{ name: Organisation.name, schema: OrganisationSchema }]),
    MongooseModule.forFeature([{ name: OrgMember.name, schema: OrgMemberSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Adopter.name, schema: AdopterSchema }]),
    MongooseModule.forFeature([{ name: ContactInfo.name, schema: ContactInfoSchema }]),
    MongooseModule.forFeature([{ name: Doc.name, schema: DocSchema }]),
    MongooseModule.forFeature([{ name: Location.name, schema: LocationSchema }])
  ],
  controllers: [ApiResolver],
  providers: [ApiService],
  exports: [],
})
export class BackendShellApiFeatureModule {}
