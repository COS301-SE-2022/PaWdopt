import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Apollo, gql } from 'apollo-angular';
import { VarsFacade } from '@pawdopt/shared/data-store';
// import { Adopter, OrgMember } from 'libs/backend/shell/api/feature/src/lib/api.schema';
@Component({
  selector: 'pawdopt-useradoption',
  templateUrl: 'useradoption.page.html',
  styleUrls: ['useradoption.page.scss', '../../../../../shared/styles/global.scss'],
  providers: [Apollo, VarsFacade]
})
export class useradoptionPageComponent {

  dogID!: string;
  userID!: string;
  orgName!:string;
  adopterEmail!:string;

  dog:{
    _id: string,
    name: string,
    age: number,
    breed: string,
    pic: string,
    about: string,
    height: number,
    weight: number,
    furlength: string,
    temperament: string
  }={
    _id: "",
    name: "",
    age: 0,
    breed: "",
    pic: "",
    about: "",
    height: 0,
    weight: 0,
    furlength: "",
    temperament: ""
  }

  user:{
    _id: string,
    name: string,
    pic: string,
    uploadedDoc: boolean
  }={
    _id: "",
    name: "",
    pic: "",
    uploadedDoc: false
  }

  constructor(private router: Router, private apollo: Apollo, private varsFacade: VarsFacade){ 
    //UserID + DogID from adoption process page
    this.varsFacade.dogID$.subscribe(dogID => {
       this.dogID = dogID;
     });
     this.varsFacade.userID$.subscribe(userID => {
      this.userID = userID;
    });
    //  this.getAdoptions();
  }

  getAdoptions(){
    const findDogByIdQuery = gql` query{
      findDogById(dogID: "${this.dogID}"){
        _id
        name
        dob
        breed
        pics
        about
        height
        weight
        furlength
        temperament
    }
    }`;
    this.apollo.watchQuery({
      query: findDogByIdQuery,
      fetchPolicy: 'no-cache'
    }).valueChanges.subscribe((result) => {
      console.log(result);
      const data = result.data as {
        findDogById: {
          _id: string,
          name: string,
          dob: Date,
          breed: string,
          pics: [string],
          about: string,
          height: number,
          weight: number,
          furlength: string,
          temperament: string

      }
    }
    this.dog._id = data.findDogById._id;
    this.dog.name = data.findDogById.name;
    //this.dog.age needs to be calculated from dob
    this.dog.age = data.findDogById.dob.getFullYear() - new Date().getFullYear();
    this.dog.breed = data.findDogById.breed;
    this.dog.pic = data.findDogById.pics[0];
    this.dog.about = data.findDogById.about;
    this.dog.height = data.findDogById.height;
    this.dog.weight = data.findDogById.weight;
    this.dog.furlength = data.findDogById.furlength;
    this.dog.temperament = data.findDogById.temperament;
    }
    );

    const findUserByIdQuery = gql` query{ 
      findUserById(userID: "${this.userID}"){
        _id
        name
        pic
        uploadedDocs
      }
    }`;
    this.apollo.watchQuery({
      query: findUserByIdQuery,
      fetchPolicy: 'no-cache'
    }).valueChanges.subscribe((result) => {
      console.log(result);
      const data = result.data as {
        findUserById: {
          _id: string,
          name: string,
          pic: string,
          uploadedDocs: boolean
        }
      }
      this.user._id = data.findUserById._id;
      this.user.name = data.findUserById.name;
      this.user.pic = data.findUserById.pic;
      this.user.uploadedDoc = data.findUserById.uploadedDocs;
    }
    );
  }

  onAccept(){
    //dog needs to be deleted from db
    //appointment for pickup needs to be made
  }

  onDecline(){
    //dog needs to be removed from adopters likedDogs and added to adopters dislikedDogs
    //user needs to be removed from dogs usersLiked
    //user needs to be removed from orgs potentialAdopters
  }


  signup(){
    // Done in signup
    this.router.navigate(["/signup"]);
  }
  
  addorg(){
    this.router.navigate(["/addorg"]);
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

}

