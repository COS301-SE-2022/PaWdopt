import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'pawdopt-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  currentIndex: number;
  results : string[] = []; //to show the liked/disliked dogs
  storeIndex: number[] = [];
  avatars = [
    {
      name: 'Millie',
      age: 2,
      image: '../../assets/husky.jpg',
      shelter: 'SPCA',
      visible: true
    },
    {
      name: 'Rene',
      age: 4,
      image: '../../assets/grbreed.jpg',
      shelter: 'Woodrock',
      visible: true
    },
    {
      name: 'Jock',
      age: 5,
      image: '../../assets/pembrokewelsh.jpg',
      shelter: 'Puppy Haven',
      visible: true
    },
    {
      name: 'Jason',
      age: 5,
      image: '../../assets/bulldog.jpg',
      shelter: '4paws',
      visible: true
    },
    {
      name: 'Mia',
      age: 5,
      image: '../../assets/border.jpg',
      shelter: 'SPCA',
      visible: true
    }
  ];

  constructor(private router: Router) {
    this.currentIndex = this.avatars.length - 1;
    console.log(this.currentIndex);
    
  }

  swiped(event: any, index: number) {
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
   this.currentIndex = 4;
  }

}
