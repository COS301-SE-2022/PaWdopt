import {  HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { PredictionServiceClient } from '@google-cloud/aiplatform'

import * as dotenv from 'dotenv'
dotenv.config()

@Injectable()
export class SharedMlFeatureService {

  constructor(private readonly httpService: HttpService, private client: PredictionServiceClient) {}

    async postToML(image: {image: string, extension:string}){      

      console.log(image)

       return await this.httpService.axiosRef.post("http://localhost:5000/predict", 
          image,{headers: {'content-type': 'application/json'}}
        ).then((response) => {
          console.log(response)
          return response.data;
        }).catch((error) => new HttpException(error, 500));
    }
}
