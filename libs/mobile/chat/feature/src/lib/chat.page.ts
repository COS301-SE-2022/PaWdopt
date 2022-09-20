import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import {Apollo, gql } from 'apollo-angular';
import { Storage } from '@capacitor/storage';
import { AngularFireAuth } from "@angular/fire/compat/auth";

// import { Adopter, OrgMember } from 'libs/backend/shell/api/feature/src/lib/api.schema';
@Component({
  selector: 'pawdopt-chat',
  templateUrl: 'chat.page.html',
  styleUrls: ['chat.page.scss', '../../../../../shared/styles/global.scss'],
  providers: [Apollo]
})
export class chatPageComponent {

  currentUserId?: string;
  userID ?: string;
  orgID !: string;
  
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
  constructor(private router: Router, private apollo: Apollo, private afAuth: AngularFireAuth) {
  }
    

  async getObject() {
    const ret = await Storage.get({ key: 'ChatID' });
    if(ret.value){
      return JSON.parse(ret.value);
    }
  }


  //logic to get the chat messages from the db using orgId and userId
  async getChat(chateeId : string, DogId : string){
    this.chatMessages = [];
    //get the type of user
    this.afAuth.currentUser.then(user => {
      this.currentUserId = user?.uid;

      if(this.currentUserId){
        const getUserType = gql`query {
          getUserType(id: "${this.currentUserId}")
        }`;

        this.apollo.watchQuery({
          query: getUserType,
          fetchPolicy: 'no-cache'
        }).valueChanges.subscribe((result) => {
          console.log(result);
          const data = result.data as {
            getUserType: string
          }
          if(data.getUserType == "Adopter"){
            //if adopter, then the orgID is in local storage
            this.getObject().then((obj) => {
              this.orgID = obj.chateeId;
              this.userID = this.currentUserId;
              //get the chat using the orgId and adopterId
              const getChat = gql`query {
                findChatByOrgIdAndAdopterId(orgId: "${this.orgID}", adopterId: "${this.userID}"){
                  messages{
                    sender
                    message
                  }
                }
              }`;

              this.apollo.watchQuery({
                query: getChat,
                fetchPolicy: 'no-cache'
              }).valueChanges.subscribe((result) => {
                console.log(result);
                const data = result.data as {
                  findChatByOrgIdAndAdopterId: {
                    messages: {
                      sender: string,
                      message: string
                    }[]
                  }
                }
                //add the messages to the chatMessages array using a foreach
                data.findChatByOrgIdAndAdopterId.messages.forEach((message) => {
                  this.chatMessages.push({
                    user: message.sender,
                    msg: message.message
                  });
                });
              });
            });
          } else if(data.getUserType == "OrgMember"){
            //if orgmember, then the adopterID is in local storage, and the org id can be gotten from the orgmember
            this.getObject().then((obj) => {
              this.userID = obj.chateeId;
              const getOrgId = gql`query {
                findOrgMemberByUserId(userId: "${this.currentUserId}"){
                  orgId
                }
              }`;

              this.apollo.watchQuery({
                query: getOrgId,
                fetchPolicy: 'no-cache'
              }).valueChanges.subscribe((result) => {
                console.log(result);
                const data = result.data as {
                  findOrgMemberByUserId: {
                    orgId: string
                  }
                }
                this.orgID = data.findOrgMemberByUserId.orgId;
                //get the chat using the orgId and adopterId
                const getChat = gql`query {
                  findChatByOrgIdAndAdopterId(orgId: "${this.orgID}", adopterId: "${this.userID}"){
                    messages{
                      sender
                      message
                    }
                  }
                }`;

                this.apollo.watchQuery({
                  query: getChat,
                  fetchPolicy: 'no-cache'
                }).valueChanges.subscribe((result) => {
                  console.log(result);
                  const data = result.data as {
                    findChatByOrgIdAndAdopterId: {
                      messages: {
                        sender: string,
                        message: string
                      }[]
                    }
                  }
                  //add the messages to the chatMessages array using a foreach
                  data.findChatByOrgIdAndAdopterId.messages.forEach((message) => {
                    this.chatMessages.push({
                      user: message.sender,
                      msg: message.message
                    });
                  });
                });
              });
            });
          }
        });
      }
    });
  }
  
  //query to add message to the chat
  //TODO: add the message to the chat
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

