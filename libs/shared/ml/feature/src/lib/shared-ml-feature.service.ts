import { Injectable } from '@nestjs/common';

@Injectable()
export class SharedMlFeatureService {
    async postToML(uri: string){
        const data = uri.split(",");
        const type = data[0].split(";");
        const image_type = type[0].split("/");
    
        const headersList = {
        "Accept": "*/*",
          }
    
        const bodyContent = new FormData();
        bodyContent.append("image", data[1]);
        bodyContent.append("extension", image_type[1]);
    
        //! TODO Change this to a real endpoint
        return fetch("http://localhost:5000/predict", {
          method: "POST",
          body: bodyContent,
          headers: headersList
        }).then(function(response) {
          return response.text();
        });
      }
}
