import {  Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { PredictionServiceClient } from '@google-cloud/aiplatform'
import { GoogleAuth } from 'google-auth-library'

import * as dotenv from 'dotenv'
dotenv.config()

@Injectable()
export class SharedMlFeatureService {

  constructor(private readonly httpService: HttpService, private client: PredictionServiceClient) {}

    async postToML(image: {
      data,
      mimetype
    }){

        const targetAudience = 'https://us-central1-pawdopt-7949c.cloudfunctions.net/breed-detector'
        const url = targetAudience;
        const auth = new GoogleAuth();
        const client = await auth.getIdTokenClient(targetAudience)


        

        const data = image.data;
        const image_type = image.mimetype.split("/");
    
      // ! TODO Change this to a real endpoint
      // ! Local ML request
        const bodyContent = {
          image: data,
          extension: image_type[1]
        }
      
        const response = await client.request({url, data:bodyContent, method:"POST"})
        console.log(response)
        return response.data;

      //  return await this.httpService.axiosRef.post("http://localhost:5000/predict", 
        //   bodyContent,{headers: {'content-type': 'multipart/form-data'}}
        // ).then((response) => {
        //   console.log(response)
          // return response.data;
        // });

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
