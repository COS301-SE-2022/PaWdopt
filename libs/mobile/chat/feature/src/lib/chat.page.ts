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


  userID !: string;
  orgID !: string;
  // inputEmail!: string;
  // inputPassword!: string;
  // public static orgName:string;
  // public static adopterEmail:string;

  chatMessages: { 
    user: string;
    msg: string;
  }[] = [];


  //messages below will be handled through service/backend with the db
  messages = [
    {
      user: 'Jason',
      msg: 'Hello there!'
    },
    {
      user: 'Maxine',
      msg: 'Whats up?'
    },
    {
      user: 'Jason',
      msg: 'Nothing much. Just chilling, wanna jam some games?'
    },
    {
      user: 'Maxine',
      msg: 'Sure. What do you have in mind?'
    },
    {
      user: 'Jason',
      msg: 'League of Legends?'
    }
  ];
  newMsg = '';
  currentUser = 'Jason'; //done through a service 
  @ViewChild(IonContent)
  content!: IonContent;
  constructor(private router: Router, private apollo: Apollo){
    
  }

  //logic to get orgID and userID from storage - from the chatlist page

  //query to fill chatMessages

  //query to add message to the chat


  sendMessage(){ //Backend dev -> replace with HTTPREQUEST OR FIREBASE logic
      this.messages.push({
        user: 'Jason', //currentUser sending a msg
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

