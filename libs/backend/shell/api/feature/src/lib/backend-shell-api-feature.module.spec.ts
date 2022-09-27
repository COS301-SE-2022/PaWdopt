import { Adopter } from './api.schema';
import { Test } from '@nestjs/testing';
import { BackendShellApiFeatureModule } from './backend-shell-api-feature.module';
import { ApiService } from './api.service';
import { INestApplication } from '@nestjs/common';

import * as dotenv from 'dotenv';
dotenv.config();

describe('BackendShellApiFeatureModule', () => {

    let app: INestApplication;
    
    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
        imports: [
            BackendShellApiFeatureModule
        ],
        }).compile();
    
        app = moduleRef.createNestApplication();
        await app.init();

        app.get(ApiService);
    });
    
    it('should create an instance', () => {
        expect(app).toBeDefined();
    });
    
    afterAll(async () => {
        await app.close();
    });
});
