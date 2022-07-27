import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Apollo, gql } from 'apollo-angular';
import { VarsFacade } from '@pawdopt/shared/data-store';
import { AngularFireAuth } from "@angular/fire/compat/auth";

@Component({
  selector: 'pawdopt-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [Apollo, VarsFacade]
})
export class HomePage {

  //global vars
  // breed!: string;
  // gender!: string;
  // maxDistance = 0;
  // minAge= 0;
  // maxAge= 0;
  // minSize = 0;
  // maxSize = 0;

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

      this.fireAuth.currentUser.then(user => {
        console.log(user?.uid);
        if(user?.uid){
          this.t_ID = user.uid;
          console.log(this.t_ID);
        }
      });
      // get in all global vars here (preferences)
      // Gender
    //   this.varsFacade.gender$.subscribe(gender => {
    //     this.gender = gender;
    //   });
    //   //Location range
    //   this.varsFacade.locationrange$.subscribe(locationrange => {
    //     this.maxDistance = locationrange;
    //   });
    //   //Breed
    //   this.varsFacade.breed$.subscribe(breed => {
    //     this.breed = breed;
    //   });
    //   //MaxAge
    //   this.varsFacade.maxAge$.subscribe(maxAge => {
    //   this.maxAge = maxAge;
    //   });
    //   //MinAge
    //   this.varsFacade.minAge$.subscribe(minAge => {
    //     this.minAge = minAge;
    //   });
    //   //MaxSize
    //   this.varsFacade.maxSize$.subscribe(maxSize => {
    //     this.maxSize = maxSize;
    //     });
    //   //MinSize
    //   this.varsFacade.minSize$.subscribe(minSize => {
    //     this.minSize = minSize;
    //     });
      this.getDogs();
    }
  

  // this.apollo.query(getDogsQuery);
  

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
          location{
            lat
            lng
          }
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
          organisation: string,
          pic: string[]
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
            // lat: element.organisation.location.lat,
            // lng: element.organisation.location.lng,
            age: sage,
            organisation: element.organisation,
            pic: "",
            // pic: element.pic[0],
            visible: true
          }
        );
        this.currentIndex++;
      });
    });

    //loop through avatars and exclude elements that dont confide to the filters
    // this.avatars.forEach(element => {
    //   if(element.breed != this.breed){
    //     this.avatars.splice(this.avatars.indexOf(element), 1);
    //     this.currentIndex--;
    //     continue;
    //   }
    //   if(element.gender != this.gender){
    //     this.avatars.splice(this.avatars.indexOf(element), 1);
    //     this.currentIndex--;
    //     continue;
    //   }
    //   const distance = 0;
    //   //distnace is calculated from user and orgs lat and lng
    //   if(distance >= this.maxDistance){
    //     this.avatars.splice(this.avatars.indexOf(element), 1);
    //     this.currentIndex--;
    //     continue;
    //   }
    //   if(element.age <= this.minAge && element.age >= this.maxAge){
    //     this.avatars.splice(this.avatars.indexOf(element), 1);
    //     this.currentIndex--;
    //     continue;
    //   }
    //   if(element.height <= this.minSize && element.height >= this.maxSize){
    //     this.avatars.splice(this.avatars.indexOf(element), 1);
    //     this.currentIndex--;
    //     continue;
    //   }
    // });

    //we have filtered out the dogs
    //compare the dogs with the liked dogs
    //if they are liked, remove them from the avatars
    //if they are disliked, remove them from the avatars
    //if they are not liked or disliked, keep them in the avatars
    //if there are no more dogs, show a message
    //if there are more dogs, show them

    /*const findAdopterByIdQuery = gql`query{
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
      this.avatars.forEach(element => {
        data.findAdopterById.dogsLiked.forEach(element2 => {
          if(element._id == element2._id){
            this.avatars.splice(this.avatars.indexOf(element), 1);
          }
        }
        );
      }
      );
      this.avatars.forEach(element => {
        data.findAdopterById.dogsDisliked.forEach(element2 => {
          if(element._id == element2._id){
            this.avatars.splice(this.avatars.indexOf(element), 1);
          }
        });
      });
    });*/
    
  }

  swiped(event: boolean, index: number) {
    console.log(this.avatars[index].name + ' swiped ' + event);
     if(event)
       this.addDogToLiked(index);
    this.avatars[index].visible = false;
    this.results.push(this.avatars[index].name + ' swiped ' + event);
    this.currentIndex--;
    console.log(index);
    console.log(this.currentIndex);
  }


  swipeleft() {
    if(this.currentIndex > -1){
      console.log(this.currentIndex);
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

  retry() {//The retry works but I'm not sure if the query is being executed correctly
    this.currentIndex++;
    this.avatars[this.currentIndex].visible = true;
    const removeDogFromAdopterDogsLikedOrDislikedQuery = gql`mutation{
        removeDogFromAdopterDogsLikedOrDisliked(
          _id: "${this.t_ID}",
          dogId: "${this.avatars[this.currentIndex]._id}"
        ){  
          _id
        }
      }`;
      this.apollo.mutate({
        mutation: removeDogFromAdopterDogsLikedOrDislikedQuery
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

      
  addDogToLiked(index: number) {
    const dogName = this.avatars[index].name;
    const addDogToLikedMutation = gql`
      mutation {
        userSwipesRightOnDog(userName: "jason", dogName: "${dogName}") {
          name
        }
      }
    `;
    this.apollo.mutate({
      mutation: addDogToLikedMutation,
    }).subscribe(({data}) => {
      console.log('got data', data);
    }, (error) => {
      console.log('there was an error sending the query', error);
    });
  }
}
