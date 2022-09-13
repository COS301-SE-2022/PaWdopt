import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { BackendShellApiFeatureModule } from '@pawdopt/backend/shell/api/feature';
import { SharedMlFeatureModule } from '@pawdopt/shared/ml/feature';
import { GraphQLModule} from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

import * as dotenv from 'dotenv';
dotenv.config();
 
@Module({
  imports: [
    BackendShellApiFeatureModule,
    SharedMlFeatureModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql'
    }),
    MongooseModule.forRoot(process.env.DB_URL),
  ],
  controllers: [AppController],
  providers: [
    AppService, 
    SharedMlFeatureModule,
  ]
})
export class AppModule {}
