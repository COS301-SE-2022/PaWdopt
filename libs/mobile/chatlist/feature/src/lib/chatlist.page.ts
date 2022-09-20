import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Apollo, gql } from 'apollo-angular';
import { VarsFacade } from '@pawdopt/shared/data-store';
import { AngularFireAuth } from "@angular/fire/compat/auth";

@Component({
  selector: 'pawdopt-chatlist',
  templateUrl: 'chatlist.page.html',
  styleUrls: ['chatlist.page.scss', '../../../../../shared/styles/global.scss'],
  providers: [Apollo, VarsFacade, AngularFireAuth]
})
export class chatlistPageComponent {

  listOfChats:{
    chateeId: string;
    chateeName: string;
    chateePic: string;
    dogId: string;
    dogName: string;
    dogPic: string;
    lastMessage: string;
  }[] = [];


  constructor(private router: Router, private apollo: Apollo, private varsFacade: VarsFacade, private afAuth: AngularFireAuth){}

  //logic to test weather its an org or adopter

  //function to fill the list of chats

  //function to navigate to the chat page

  
  gotoChat(){
    this.router.navigate(["/chat"]);
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

