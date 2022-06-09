import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Apollo, gql } from 'apollo-angular';
//import { owneddogsPageComponentModule } from '@pawdopt/mobile/owneddogs/feature';
@Component({
  selector: 'pawdopt-dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss', '../../../../../shared/styles/global.scss'],
})
export class dashboardPageComponent {
  public static user: {
    id: number,
    email:string,
    name:string,
    pic:string,
  };

  //GlobalVar = owneddogsPageComponentModule.GlobalVars;
  

  dog:{
    name:string,
    pic:string,
    organisation:string,
    about:string,
    height:number,
    weight:number,
    breed:string,
    temperament:string,
    furlength:number
  }={
    name: '',
    pic: '',
    organisation: '',
    about: '',
    height: 0,  
    weight: 0,
    breed: '',
    temperament: '',
    furlength: 0
  };

  userLikes:{
    id: number,
    email:string,
    name:string,
    pic:string,
  }[]=[];
  
  constructor(private router: Router, private apollo: Apollo) {
    this.getDog();
  }

  getDog(){
    const getDogQuery = gql`query {
      findDog(name: "Bella2.0"){
        name
        dob
        pics{
          path
        }
        breed
        about
        organisation{
          name
        }
        weight
        height
        temperament
        furLength
        usersLiked{
          name, 
          pic {
            path
          },
          email
        }
      }
    }`;

    let id = 0;
  
    this.apollo.watchQuery({
      query: getDogQuery,
      fetchPolicy: 'no-cache'
    }).valueChanges.subscribe((result) => {
      console.log(result);
      const data = result.data as {
        findDog: {
          name: string,
          dob: Date,
          pics: {
            path: string
          }[],
          breed: string,
          about: string,
          height: number,
          weight: number,
          temperament: string,
          furlength: number,
          usersLiked: {
            name: string,
            pic: {
              path: string
            },
            email: string
          }[],
          organisation: {
          name: string
          }
        }
      };
      
      this.dog.name = data.findDog.name;
      this.dog.pic = data.findDog.pics[0].path;
      this.dog.organisation = data.findDog.organisation.name;
      this.dog.about = data.findDog.about;
      this.dog.height = data.findDog.height;
      this.dog.weight = data.findDog.weight;
      this.dog.breed = data.findDog.breed;
      this.dog.temperament = data.findDog.temperament[0];
      this.dog.furlength = data.findDog.furlength;
      
      data.findDog.usersLiked.forEach(element => {
        this.userLikes.push(
          {
            id: id++,
            email: element.email,
            name: element.name,
            pic: element.pic.path
          }
        );
      })
    })
  }



  userinfo(id: number){
    // TODO Complete dashboard validation
    dashboardPageComponent.user = this.userLikes[id];
    this.router.navigate(["/userinfo"]);
    
  }

  home(){
    this.router.navigate(["/home"]);
  }

  likeddogs(){
    this.router.navigate(["/userlikes"]);
  }

  profile(){
    this.router.navigate(["/userprofile"]);
  }

  preferences(){
    //this.router.navigate(["/userinfo"]); Not implemented yet
  }

  // addDog(){
  //   this.router.navigate(["/adddog"]);
  // }

}

