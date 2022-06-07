import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'pawdopt-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [Apollo]
})
export class HomePage {

  avatars:{
    name:string,
    age: number,
    image: string,
    shelter: string,
    visible: boolean
  }[] = [
    // {
    //   name: 'Millie',
    //   age: 2,
    //   image: '../../assets/husky.jpg',
    //   shelter: 'SPCA',
    //   visible: true
    // },
    // {
    //   name: 'Rene',
    //   age: 4,
    //   image: '../../assets/grbreed.jpg',
    //   shelter: 'Woodrock',
    //   visible: true
    // },
    // {
    //   name: 'Jock',
    //   age: 5,
    //   image: '../../assets/pembrokewelsh.jpg',
    //   shelter: 'Puppy Haven',
    //   visible: true
    // },
    // {
    //   name: 'Jason',
    //   age: 5,
    //   image: '../../assets/bulldog.jpg',
    //   shelter: '4paws',
    //   visible: true
    // },
    // {
    //   name: 'Mia',
    //   age: 5,
    //   image: '../../assets/border.jpg',
    //   shelter: 'SPCA',
    //   visible: true
    // }
  ];

  currentIndex: number;
  results : string[] = []; //to show the liked/disliked dogs
  storeIndex: number[] = [];

    constructor(private router: Router, private apollo: Apollo) {
      this.currentIndex = this.avatars.length - 1;
      console.log(this.currentIndex);
      this.getDogs();
    }
  

  // this.apollo.query(getDogsQuery);
  

  getDogs(){
    const getDogsQuery = gql`query {
      findDogsByName(name: "John"){
        name
        dob
        organisation{
          name
        }
      }
    }`;

    const myDate = new Date();
    this.apollo.watchQuery({
      query: getDogsQuery,
      fetchPolicy: 'no-cache'
    }).valueChanges.subscribe((result) => {
      console.log(result);
      const data = result.data as {
        findDogsByName: {
          name: string,
          dob: Date,
          organisation: {
            name: string
          }
        }[]
      };
      data.findDogsByName.forEach(element => {
        this.avatars.push(
          {
            name: element.name,
            age: myDate.valueOf()-element.dob.valueOf(),
            image: '../../assets/husky.jpg',
            shelter: element.organisation.name,
            visible: true
          }
        );
      });
    });
  }
  
  

  swiped(event: boolean, index: number) {
    console.log(this.avatars[index].name + ' swiped ' + event);
    this.avatars[index].visible = false;
    this.results.push(this.avatars[index].name + ' swiped ' + event);
    this.currentIndex--;
  }


  swipeleft() {
    this.avatars[this.currentIndex].visible = false;
    this.results.push(this.avatars[this.currentIndex].name + ' swiped false');
    this.currentIndex--;
  }

  swiperight() {
    this.avatars[this.currentIndex].visible = false;
    this.results.push(this.avatars[this.currentIndex].name + ' swiped true');
    this.currentIndex--;
  }

  retry() {
   this.currentIndex = 4; //Not implemented
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


  //const getDogsQuery = gql`query {
    //findDogs {
      
}
