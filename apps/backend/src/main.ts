/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json({limit: '50mb'}));
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.enableCors();
  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

//Get MAPS_API_KEY and EMAILVALIDATOR_API_KEY from process.env and write environment.prod.ts in apps\pawdopt\src\environments\environment.prod.ts with the values
import { writeFileSync } from 'fs';
import { join } from 'path';
const MAPS_API_KEY = process.env.MAPS_API_KEY;
const EMAILVALIDATOR_API_KEY = process.env.EMAILVALIDATOR_API_KEY;
const config = `export const environment = {
  production: true,
  firebaseConfig: {
    apiKey: "AIzaSyCcLTKUGBccDlw7WVlVvEiV7Oa4gEt-p4k",
    authDomain: "pawdopt-7949c.firebaseapp.com",
    projectId: "pawdopt-7949c",
    storageBucket: "pawdopt-7949c.appspot.com",
    messagingSenderId: "864805807139",
    appId: "1:864805807139:web:e6b09cc6d1c6497c7fbd96",
    measurementId: "G-0JS2YECKCM"
  },
  MAPS_API_KEY: '${MAPS_API_KEY}',
  EMAILVALIDATOR_API_KEY: '${EMAILVALIDATOR_API_KEY}',
};
`;
writeFileSync(join(__dirname, '..', '..', '..', 'apps', 'pawdopt', 'src', 'environments', 'environment.prod.ts'), config);

bootstrap();
