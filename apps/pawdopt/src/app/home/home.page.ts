import { Component } from '@angular/core';

@Component({
  selector: 'pawdopt-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  currentIndex: number;
  results : string[] = [];
  avatars = [
    {
      name: 'Millie',
      age: 2,
      image: '../../assets/grbreed.jpg',
      visible: true
    },
    {
      name: 'Chris',
      age: 4,
      image: '../../assets/bulldog.jpg',
      visible: true
    },
    {
      name: 'Cassidy',
      age: 5,
      image: '../../assets/border.jpg',
      visible: true
    }
  ];

  constructor() {
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

 
}
