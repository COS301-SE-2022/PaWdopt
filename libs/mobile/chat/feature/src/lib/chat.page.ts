import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import {Apollo, gql } from 'apollo-angular';
// import { Adopter, OrgMember } from 'libs/backend/shell/api/feature/src/lib/api.schema';
@Component({
  selector: 'pawdopt-chat',
  templateUrl: 'chat.page.html',
  styleUrls: ['chat.page.scss', '../../../../../shared/styles/global.scss'],
  providers: [Apollo]
})
export class chatPageComponent {

  // inputEmail!: string;
  // inputPassword!: string;
  // public static orgName:string;
  // public static adopterEmail:string;

  //messages below will be handled through service/backend with the db
  messages = [
    {
      user: 'Jason',
      createdAt: '5:30 PM', //most likely in the final implementation it will be values.
      msg: 'Hello there!'
    },
    {
      user: 'Maxine',
      createdAt: '5:40 PM',
      msg: 'Whats up?'
    },
    {
      user: 'Jason',
      createdAt: '5:41 PM',
      msg: 'Nothing much. Just chilling, wanna jam some games?'
    },
    {
      user: 'Maxine',
      createdAt: '5:45 PM',
      msg: 'Sure. What do you have in mind?'
    },
    {
      user: 'Jason',
      createdAt: '5:50 PM',
      msg: 'League of Legends?'
    }
  ];
  newMsg = '';
  currentUser = 'Jason'; //done through a service 
  @ViewChild(IonContent)
  content!: IonContent;
  constructor(private router: Router, private apollo: Apollo){
    
  }


  sendMessage(){ //Backend dev -> replace with HTTPREQUEST OR FIREBASE logic
    const tempDate = new Date().getTime();
      this.messages.push({
        user: 'Jason',
        createdAt: tempDate.toString(),
        msg: this.newMsg
      });
      
      this.newMsg = ''; 
      setTimeout(() => {
        this.content.scrollToBottom(300);
      });
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

