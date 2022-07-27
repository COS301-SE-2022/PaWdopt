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
  
  inputSearch!: string;
  userId!: string;

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
    organisation:string,
    orgId:string
  }[]=[]

  constructor(private router: Router, private apollo: Apollo,private varsFacade: VarsFacade){
    this.varsFacade.userID$.subscribe(userID => {
      this.userId = userID;
    });
    this.getDog();
  }

  getDog(){
    const findDogsLikedByUserQuery = gql`query {
      findDogsLikedByUser(userId: "${this.varsFacade.userID$}") {
        name
        dob
        height
        weight
        breed
        furLength
        temperament
        pics
        about
        organisation{
          _id
          name
        }
      }
    }`;

    this.apollo.watchQuery({
      query: findDogsLikedByUserQuery,
      fetchPolicy: 'no-cache'
    }).valueChanges.subscribe((result) => {
      console.log(result);
      const data = result.data as {
        findDogsLikedByUser: {
          name: string,
          dob: Date,
          height: number,
          weight: number,
          breed: string,
          furLength: string,
          temperament: string[],
          pics: string[],
          about: string,
          organisation: {
            _id: string,
            name: string
          }
        }[]
      };

      data.findDogsLikedByUser.forEach(element => {
        const tempDate = new Date(element.dob);
        const today = new Date();
        const age = today.getFullYear() - tempDate.getFullYear();
        this.dog.push(
          {
            name:element.name,
            age: age,
            height: element.height,
            weight: element.weight,
            breed: element.breed,
            temperament: element.temperament,
            furLength: element.furLength,
            pic: element.pics[0],
            about: element.about,
            organisation: element.organisation.name,
            orgId: element.organisation._id
          }
        );
      })  
    })
  }

  search(){
    //search for dogs based off regex
    this.dog=[];
    this.getDog();
    this.dog = this.dog.filter(dog => dog.name.includes(this.inputSearch));
  }

  onCancelSearch(){
    this.dog=[];
    this.getDog();
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

  orgProfile(orgId:string){
    this.varsFacade.setOrgId(orgId);
    this.router.navigate(["/orgprofile"]);
  }

}

