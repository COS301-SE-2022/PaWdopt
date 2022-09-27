import {  HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { PredictionServiceClient } from '@google-cloud/aiplatform'
import { GoogleAuth } from 'google-auth-library'
import * as fs from 'fs'

import * as dotenv from 'dotenv'
dotenv.config()

@Injectable()
export class SharedMlFeatureService {

  constructor(private readonly httpService: HttpService, private client: PredictionServiceClient) {}

    // async postToML(imageFile){
    async postToML(image: {image: string, extension:string}){      

        // Vertex Version
        // const targetAudience = 'https://breed-detector-gen2-r6xhtxonga-uc.a.run.app'

        // Cloud Run Version
        // const targetAudience = 'https://breed-detector-ml-r6xhtxonga-uc.a.run.app'

        // Vertex V2
        // const targetAudience = 'https://us-central1-pawdopt-7949c.cloudfunctions.net/ml-service'
        

        // const url = `${targetAudience}`;
        // const auth = new GoogleAuth();
        // const client = await auth.getIdTokenClient(targetAudience)

        // console.log(imageFile)
        
        // const response = await client.request({url, data: imageFile, method:"POST", headers: {'Content-Type': 'application/json'}})
        // return response.data;
      console.log(image)

       return await this.httpService.axiosRef.post("http://localhost:5000/predict", 
          image,{headers: {'content-type': 'application/json'}}
        ).then((response) => {
          console.log(response)
          return response.data;
        }).catch((error) => new HttpException(error, 500));

      // gcloud vertexAI request
      // const projectId = process.env.PROJECT_ID;
      // const endpointId = process.env.ENDPOINT_ID;
      // const endpoint = `projects/${projectId}/locations/us-central1/endpoints/${endpointId}`;
      // const request = {
      //   endpoint: endpoint,
      //   instance: {
      //     image_bytes: data
      //   }
      // }

      // this.client.predict(request).then((response) => {
      //   console.log(response);
      // });
    }
}
