import { Adopter } from './api.schema';
import { Test } from '@nestjs/testing';
import { BackendShellApiFeatureModule } from './backend-shell-api-feature.module';
import { ApiService } from './api.service';
import { INestApplication } from '@nestjs/common';

import * as dotenv from 'dotenv';
dotenv.config();

describe('BackendShellApiFeatureModule', () => {

    let app: INestApplication;
    let apiService: ApiService;
    let adopter: Adopter;
    
    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
        imports: [
            BackendShellApiFeatureModule
        ],
        }).compile();
    
        app = moduleRef.createNestApplication();
        await app.init();

        apiService = app.get(ApiService);
    });
    
    it('should create an instance', () => {
        expect(app).toBeDefined();
    });

    it('should create an adopter', async () => {
        adopter = {
            _id: 'testID',
            name: 'John Doe',
            email: 'johntesterman@test.com',
            IDNum: '1234567890123',
            pic: '',
            location: {
                lat: 0,
                lng: 0
            },
            documents: null,
            dogsLiked: null,
            dogsDisliked: null,
            uploadedDocs: false
        };
        expect((await apiService.createAdopter(adopter)).name).toEqual(adopter.name);
    });

    it('should get an adopter', async () => {
        const req = "johntesterman@test.com";
        adopter = await apiService.findAdopter(req);
        expect(adopter.email).toBe(req);
    });

    it('should update an adopter', async () => {
        adopter.email = "johntesterman@updatedtest.com";
        expect((await apiService.updateAdopter(adopter._id, adopter)).email).toBeTruthy();
    });
    
    // it('should delete an adopter', async () => {
    //     adopter = await apiService.findAdopter("johntesterman@updatedtest.com");
    //     expect(await apiService.deleteAdopter(adopter._id)).toEqual(adopter);
    // });

    afterAll(async () => {
        await app.close();
    });
});
