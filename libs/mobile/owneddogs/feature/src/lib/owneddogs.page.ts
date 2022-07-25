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

  //public static GlobalVars = "hello";
  
  inputSearch!: string;
  orgName = "SPCA";

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
    /*this.varsFacade.orgName$.subscribe(orgName => {
      this.orgName = orgName;
    });*/
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

      data.findDogsByOrgName.forEach(element => {
        this.dog.push(
          {
            _id: element._id,
            name: element.name,
            pic: element.pics[0],
            age: 2,
            likes: element.usersLiked.length,
            breed: element.breed
          }
        );
      })  
    })
  }


  search(){
    const getDogQuery = gql`query {
      findDog(name: "${this.inputSearch}") {
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
        findDog: {
          _id: string,
          name: string,
          dob: Date,
          pics: string[],
          breed: string,
          usersLiked: {
            name: string
          }[]
        }  
      };

      if(data.findDog == null)
      {
        alert("Dog not found");
        this.dog = [];

      }
      else{
        this.dog=[];

        this.dog.push(
          {
            _id: data.findDog._id,
            name: data.findDog.name,
            pic: data.findDog.pics[0],
            age: 0,
            likes: data.findDog.usersLiked.length,
            breed: data.findDog.breed
          }
        )
      }
    })
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

