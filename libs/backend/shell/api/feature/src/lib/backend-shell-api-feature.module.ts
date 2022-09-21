import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { ApiResolver } from './api.resolver';
import { MongooseModule } from '@nestjs/mongoose';

import { Dog, DogSchema } from './api.schema';
import { Organisation, OrganisationSchema } from './api.schema';
import { OrgMember, OrgMemberSchema } from './api.schema';
import { Adopter, AdopterSchema } from './api.schema';
import { ContactInfo, ContactInfoSchema } from './api.schema';
import { Location, LocationSchema } from './api.schema';
import { Chat, ChatSchema } from './api.schema';
import { MessageObj, MessageSchema } from './api.schema';


@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URL),
    MongooseModule.forFeature([{ name: Dog.name, schema: DogSchema }]),
    MongooseModule.forFeature([{ name: Organisation.name, schema: OrganisationSchema }]),
    MongooseModule.forFeature([{ name: OrgMember.name, schema: OrgMemberSchema }]),
    MongooseModule.forFeature([{ name: Adopter.name, schema: AdopterSchema }]),
    MongooseModule.forFeature([{ name: ContactInfo.name, schema: ContactInfoSchema }]),
    MongooseModule.forFeature([{ name: Location.name, schema: LocationSchema }]),
    MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }]),
    MongooseModule.forFeature([{ name: MessageObj.name, schema: MessageSchema }]),
  ],
  controllers: [],
  providers: [ApiService, ApiResolver],
  exports: [],
})
export class BackendShellApiFeatureModule {}
