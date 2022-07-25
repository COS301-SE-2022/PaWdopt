import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Apollo, gql } from 'apollo-angular';
import { VarsFacade } from '@pawdopt/shared/data-store';

@Component({
  selector: 'pawdopt-userlikes',
  templateUrl: 'userlikes.page.html',
  styleUrls: ['userlikes.page.scss', '../../../../../shared/styles/global.scss'],
  providers: [Apollo, VarsFacade]
})
export class userlikesPageComponent {
  
  dog:{
    name:string,
    age: number,
    height: number,
    weight: number,
    breed: string,
    temperament: string[],
    furLength: string,
    pic:string,
    about:string,
    organisation:string
  }[]=[]

  constructor(private router: Router, private apollo: Apollo,private varsFacade: VarsFacade){
    this.getDog();
  }

  getDog(){
    const getDogQuery = gql`query {
      findDogsLikedByAdopter(adopterName: "jason") {
        name
        dob
        height
        weight
        breed
        furLength
        temperament
        pics{
          path
        }
        about
        organisation{
          name
        }
      }
    }`;

    this.apollo.watchQuery({
      query: getDogQuery,
      fetchPolicy: 'no-cache'
    }).valueChanges.subscribe((result) => {
      console.log(result);
      const data = result.data as {
        findDogsLikedByAdopter: {
          name: string,
          dob: Date,
          height: number,
          weight: number,
          breed: string,
          furLength: string,
          temperament: string[],
          pics: {
            path: string
          }[],
          about: string,
          organisation: {
            name: string
          }
        }[]
      };
      
      // this.dog.name = data.findDog.name;
      // this.dog.pic = data.findDog.pics[0].path;
      // this.dog.about = data.findDog.about;
      // this.dog.age = 0;
      // this.dog.likes = data.findDog.usersLiked.length;
      // console.log(data);
      // console.log(data.findDogByOrgName);

      data.findDogsLikedByAdopter.forEach(element => {
        const tempDate = new Date(element.dob);
        const today = new Date();
        const age = today.getFullYear() - tempDate.getFullYear();
        this.varsFacade.setOrgName(element.organisation.name);
        this.dog.push(
          {
            name:element.name,
            age: age,
            height: element.height,
            weight: element.weight,
            breed: element.breed,
            temperament: element.temperament,
            furLength: element.furLength,
            pic: element.pics[0].path,
            about: element.about,
            organisation: element.organisation.name
          }
        );
      })  
    })
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

}

