import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Apollo, gql } from 'apollo-angular';
import { VarsFacade } from '@pawdopt/shared/data-store';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'pawdopt-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [Apollo, VarsFacade]
})
export class HomePage {

  //global vars
  breed!: string;
  gender!: string;
  maxDistance = 0;
  minAge= 0;
  maxAge= 0;
  minSize = 0;
  maxSize = 0;

  avatars:{
    _id: string,
    name: string,
    gender: string,
    breed: string,
    height: number,
    lat: number,
    lng: number,
    age: number,
    organisation:string,
    pic: string,
    visible: boolean
    }[] = [];
    //@TODO
    //Add card at the end to say no more available dogs
  currentIndex: number;
  results : string[] = []; //to show the liked/disliked dogs
  storeIndex: number[] = [];
   t_ID: string;

    constructor(private router: Router, private apollo: Apollo, private varsFacade: VarsFacade, private fireAuth: AngularFireAuth) {
      this.t_ID = "";
      this.currentIndex = -1;
      this.setPrefs();
      this.fireAuth.currentUser.then(user => {
        console.log(user?.uid);
        if(user?.uid){
          this.t_ID = user.uid;
          console.log(this.t_ID);
          this.getDogs();
        }
      });
    }
  

  // this.apollo.query(getDogsQuery);
  
  async getObject() {
    const ret = await Storage.get({ key: 'preferences' });
    if(ret.value){
      return JSON.parse(ret.value);
    }
  }

  async setPrefs(){
    const filters = await this.getObject();
    if(filters){
      if(filters.value.gender)
        this.gender = filters.value.gender;
      if(filters.value.breed)
        this.breed = filters.value.breed;
      if(filters.value.age.lower)
        this.minAge = filters.value.age.lower;
      if(filters.value.age.upper)
        this.maxAge = filters.value.age.upper;
      if(filters.value.size.lower)
        this.minSize = filters.value.size.lower;
      if(filters.value.size.upper)
        this.maxSize = filters.value.size.upper;
      if(filters.value.distance)
        this.maxDistance = filters.value.location.upper;
    }
  }

  getDogs(){
    const getDogsQuery = gql`query {
      findDogs(na : true){
        _id
        name
        dob
        gender
        pics
        breed
        organisation{
          name
        }
        height
      }
    }`;

    const myDate = new Date();
    let sage = 0;
    let tempDate;
    this.apollo.watchQuery({
      query: getDogsQuery,
      fetchPolicy: 'no-cache'
    }).valueChanges.subscribe((result) => {
      console.log(result);
      const data = result.data as {
        findDogs: {
          _id: string,
          name: string,
          gender: string,
          breed: string,
          height: number,
          dob: Date,
          organisation: {
            name: string
          },
          pics: string[]
        }[];
      }
      
      data.findDogs.forEach(element => {
        tempDate = new Date(element.dob);
        sage = myDate.getFullYear() - tempDate.getFullYear();
        this.avatars.push(
          {
            _id: element._id,
            name: element.name,
            gender: element.gender,
            breed: element.breed,
            height: element.height,
            lat: 0,
            lng: 0,
            // lat: element.organisation.location.lat
            // lng: element.organisation.location.lng,
            age: sage,
            organisation: element.organisation.name,
            pic: element.pics[0],
            visible: true
          }
        );
        this.currentIndex++;
      });
      const findAdopterByIdQuery = gql`query{
        findAdopterById(_id: "${this.t_ID}"){
          dogsLiked{
            _id
          }
          dogsDisliked{
            _id
          }
        }
      }`
      this.apollo.watchQuery({
        query: findAdopterByIdQuery,
        fetchPolicy: 'no-cache'
      }).valueChanges.subscribe((result) => {
        console.log(result);
        const data = result.data as {
          findAdopterById: {
            dogsLiked: {
              _id: string
            }[],
            dogsDisliked: {
              _id: string
            }[]
          }
        }
        console.log(this.avatars);
        console.log(data.findAdopterById.dogsLiked);
        // this.avatars.forEach(element => {
          data.findAdopterById.dogsLiked.forEach(element2 => {
            const index = this.avatars.findIndex(function(dog){
              return dog._id == element2._id;
            });
            if(index != -1){
              this.avatars.splice(index, 1);
              this.currentIndex--;
            }
          }
          );
        // }
        // );
        // this.avatars.forEach(element => {
          data.findAdopterById.dogsDisliked.forEach(element2 => {
            const index = this.avatars.findIndex(function(dog){
              return dog._id == element2._id;
            });
            if(index != -1){
              this.avatars.splice(index, 1);
              this.currentIndex--;
            }
          });
        // });
        //loop through avatars and exclude elements that dont confide to the filters
        this.avatars.forEach(element => {
          let splice = false;
          if(this.breed)
            if(element.breed != this.breed){
              splice = true;
            }
          if(this.gender)
            if(element.gender != this.gender){
              splice = true;
            }
          const distance = 0;
          //distnace is calculated from user and orgs lat and lng
          if(this.maxDistance)
            if(distance >= this.maxDistance){
              splice = true;
            }
          if(this.minAge && this.maxAge)
            if(element.age <= this.minAge && element.age >= this.maxAge){
              splice = true;
            }
          if(this.minSize && this.maxSize)
            if(element.height <= this.minSize && element.height >= this.maxSize){
              splice = true;
            }
          if(splice){
            this.avatars.splice(this.avatars.indexOf(element), 1);
            this.currentIndex--;
          }
        });
      });
    });
    //we have filtered out the dogs
    //compare the dogs with the liked dogs
    //if they are liked, remove them from the avatars
    //if they are disliked, remove them from the avatars
    //if they are not liked or disliked, keep them in the avatars
    //if there are no more dogs, show a message
    //if there are more dogs, show them
  }

  async swiped(event: boolean, index: number) {
    
    console.log(this.t_ID);
    console.log(this.avatars[index].name + ' swiped ' + event);
     if(event)
       await this.addDogToLiked(this.currentIndex);
      else
        await this.addDogToDisliked(this.currentIndex);
    this.avatars[index].visible = false;
    this.results.push(this.avatars[index].name + ' swiped ' + event); 
    console.log(index);
    console.log(this.currentIndex);
    this.currentIndex--;
  }


  swipeleft() { 
    if(this.currentIndex > -1){
      console.log(this.currentIndex);
      this.addDogToDisliked(this.currentIndex);
      this.avatars[this.currentIndex].visible = false;
      this.results.push(this.avatars[this.currentIndex].name + ' swiped false');
      this.currentIndex--;
    }
  }

  swiperight() {
    if(this.currentIndex > -1){
      this.addDogToLiked(this.currentIndex);
      this.avatars[this.currentIndex].visible = false;
      this.results.push(this.avatars[this.currentIndex].name + ' swiped true');
      this.currentIndex--;
    }
  }

  retry() {//The retry works but the mutation call errors out
    this.currentIndex++;
    console.log(this.currentIndex + "this is the current index");
    this.avatars[this.currentIndex].visible = true;
    const removeDogFromAdopterDogsLikedOrDislikedQuery = gql`mutation{
        removeDogFromAdopterDogsLikedOrDisliked(
          userId: "${this.t_ID}",
          dogId: "${this.avatars[this.currentIndex]._id}"
        ){  
          _id
        }
      }`;
      this.apollo.mutate({
        mutation: removeDogFromAdopterDogsLikedOrDislikedQuery,
        fetchPolicy: 'no-cache'
      }).subscribe((result) => {
        console.log(result);
        const data = result.data as {
          removeDogFromAdopterDogsLikedOrDisliked: {
            _id: string
          }
        }
        console.log(data);
      }
      );
      

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
    //Not implemented yet
  }

      
  async addDogToLiked(index: number) {    
    const addDogToLikedMutation = gql`
      mutation {
        userSwipesRight(userId: "${this.t_ID}", dogId: "${this.avatars[index]._id}") {
          name
        }
      }
    `;
    this.apollo.mutate({
      mutation: addDogToLikedMutation,
      fetchPolicy: 'no-cache'
    }).subscribe(({data}) => {
      console.log('got data', data);
    }, (error) => {
      console.log('there was an error sending the query', error);
    });
  }
  
  async addDogToDisliked(index: number) {
    const addDogToDislikedMutation = gql`
      mutation {
        userSwipesLeft(userId: "${this.t_ID}", dogId: "${this.avatars[index]._id}") {
          name
        }
      }
    `;
    this.apollo.mutate({
      mutation: addDogToDislikedMutation,
      fetchPolicy: 'no-cache'
    }).subscribe(({data}) => {
      console.log('got data', data);
    }, (error) => {
      console.log('there was an error sending the query', error);
    });
  }
}
