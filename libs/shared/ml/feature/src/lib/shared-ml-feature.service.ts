import {  Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';


@Injectable()
export class SharedMlFeatureService {
  constructor(private readonly httpService: HttpService) {}

    async postToML(image: {
      data,
      mimetype
    }){
        const data = image.data;
        const image_type = image.mimetype.split("/");
    
        const bodyContent = {
          image: data,
          extension: image_type[1]
        }


        //! TODO Change this to a real endpoint
       return await this.httpService.axiosRef.post("http://localhost:5000/predict", 
          bodyContent,{headers: {'content-type': 'multipart/form-data'}}
        ).then((response) => {
          return response.data;
        });
      }
}
