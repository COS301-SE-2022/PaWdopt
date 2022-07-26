import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Apollo, gql } from 'apollo-angular';
import { VarsFacade } from '@pawdopt/shared/data-store';

@Component({
  selector: 'pawdopt-owneddogs',
  templateUrl: 'owneddogs.page.html',
  styleUrls: ['owneddogs.page.scss', '../../../../../shared/styles/global.scss'],
  providers: [Apollo, VarsFacade],

})
export class owneddogsPageComponent {

  
  inputSearch!: string;
  orgName!: string;


  //get org name for login

  dog:{
    _id: string,
    name:string,
    age: number,
    likes: number,
    pic:string,
    breed:string
  }[]=[]

  // userLikes:{
  //   name:string,
  //   pic:string,
  // }[]=[];

  constructor(private router: Router, private apollo: Apollo, private varsFacade: VarsFacade) {
    this.varsFacade.orgName$.subscribe(orgName => {
      this.orgName = orgName;
    });
    console.log(this.orgName);
    this.getDog();
  }

  getDog(){
    const getDogQuery = gql`query {
      findDogsByOrgName(orgName: "${this.orgName}") {
        _id
        name
        dob
        pics
        breed
        usersLiked{
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
        findDogsByOrgName: {
          _id: string,
          name: string,
          dob: Date,
          pics: string[],
          breed: string,
          usersLiked: {
            name: string
          }[]
        }[]
      };
      
      // this.dog.name = data.findDog.name;
      // this.dog.pic = data.findDog.pics[0].path;
      // this.dog.breed = data.findDog.breed;
      // this.dog.age = 0;
      // this.dog.likes = data.findDog.usersLiked.length;
      // console.log(data);
      // console.log(data.findDogByOrgName);
      //get the years between a Date and now
      // const now = new Date();
      // const birthDate = new Date(data.findDog.dob);
      // const age = now.getFullYear() - birthDate.getFullYear();
      const now = new Date();


      data.findDogsByOrgName.forEach(element => {
        this.dog.push(
          {
            _id: element._id,
            name: element.name,
            pic: element.pics[0],
            age: now.getFullYear() - element.dob.getFullYear(),
            likes: element.usersLiked.length,
            breed: element.breed
          }
        );
      })  
    })
  }


  search(){
    //foreach going through each dog and comparing the name to the input search
    //if it matches, push to new array
    //if not, do nothing
    this.dog=[];
    this.getDog();
    this.dog = this.dog.filter(dog => dog.name.includes(this.inputSearch));

  }

  onCancelSearch(){
    this.dog=[];
    this.getDog();
  }

  dashboard(){
    this.router.navigate(["/dashboard"]);
  }

  update(id: string){
    this.varsFacade.setDogID(id);
    this.router.navigate(["/updateorremovedog"]);
  }

  updateLikes(id: string){
    this.varsFacade.setDogID(id);
  }

  addDog(){
    this.router.navigate(["/adddog"]);
  }
  
  home(){
    this.router.navigate(["/home"]);
  }

  likeddogs(){
    this.router.navigate(["/userlikes"]); 
    //Will need to change so that likeddogs alternates between company and user
  }

  profile(){
    this.router.navigate(["/userprofile"]);
  }

  preferences(){
    //this.router.navigate(["/userinfo"]); Not implemented yet
  }

  
}

