import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { BackendShellApiFeatureModule } from '@pawdopt/backend/shell/api/feature';
import { GraphQLModule} from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
// import * as dotenv from 'dotenv';
// dotenv.config();
 

@Module({
  imports: [
    ConfigModule.forRoot(),
    BackendShellApiFeatureModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql'
    }),
    MongooseModule.forRoot(process.env.DB_URL+"nest"),
  ],
  controllers: [AppController],
  providers: [AppService], 
})
export class AppModule {}
