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

  dogID!: string; 

  dog:{
    name:string,
    pic:string,
    organisation:string,
    about:string,
    height:number,
    weight:number,
    breed:string,
    temperament:string[],
    furLength:number
  }={
    name: '',
    pic: '',
    organisation: '',
    about: '',
    height: 0,  
    weight: 0,
    breed: '',
    temperament: [],
    furLength: 0
  };

  userLikes:{
    _id:string,
    name:string,
    pic:string,
  }[]=[];
  
  constructor(private router: Router, private apollo: Apollo) {
    this.getDog();
  }

  getDog(){
    const getDogQuery = gql`query {
      findDogById(id: "${this.dogID}") {
        name
        pic
        organisation {
          name
        }
        usersLiked{
          _id
          name
          pic
        }
        about
        height
        weight
        breed
        temperament
        furLength
      }
    }`;

  
    this.apollo.watchQuery({
      query: getDogQuery,
      fetchPolicy: 'no-cache'
    }).valueChanges.subscribe((result) => {
      console.log(result);
      const data = result.data as {
        findDog: {
          name: string,
          dob: Date,
          pics: string[],
          breed: string,
          about: string,
          height: number,
          weight: number,
          temperament: string[],
          furLength: number,
          usersLiked: {
            _id: string,
            name: string,
            pic: string
          }[],
          organisation: {
          name: string
          }
        }
      };
      
      this.dog.name = data.findDog.name;
      this.dog.pic = data.findDog.pics[0];
      this.dog.organisation = data.findDog.organisation.name;
      this.dog.about = data.findDog.about;
      this.dog.height = data.findDog.height;
      this.dog.weight = data.findDog.weight;
      this.dog.breed = data.findDog.breed;
      this.dog.temperament = data.findDog.temperament;
      this.dog.furLength = data.findDog.furLength;
      
      data.findDog.usersLiked.forEach(element => {
        this.userLikes.push(
          {
            _id: element._id,
            name: element.name,
            pic: "../../assets/avatar1.jpg"
          }
        );
      })
    })
  }

  clickedUserID!: string;



  userinfo(){
    // TODO Complete dashboard validation
    this.router.navigate(["/userinfo"]);
    
  }

  home(){
    this.router.navigate(["/owneddogs"]);
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

