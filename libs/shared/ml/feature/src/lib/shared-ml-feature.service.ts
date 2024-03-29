import {  HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import * as dotenv from 'dotenv'
dotenv.config()

@Injectable()
export class SharedMlFeatureService {

  constructor(private readonly httpService: HttpService) {}

    async postToML(image: {image: string, extension:string}){
      const req = {
        data: image.image,
        mimetype: image.extension
      }      
       return this.httpService.axiosRef.post("https://pawdopt-env-gunicorn.eba-33a75fa2.us-east-1.elasticbeanstalk.com/predict", 
          req,{headers: {'content-type': 'application/json'}}
        ).then((response) => {
          console.log(response)
          return response.data;
        }).catch((error) => new HttpException(error, 500));
    }
}
