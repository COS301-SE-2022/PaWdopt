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
  chateeName ?: string;
  
  messages: { 
    user?: string;
    msg: string;
  }[] = [];

  disabled!: boolean;

  newMsg = '';
  currentUser = "You";
  @ViewChild(IonContent)
  content!: IonContent;
  userName: string | undefined;
  constructor(private router: Router, private apollo: Apollo, private afAuth: AngularFireAuth) {
    this.getChat();
  }
    

  async getObject() {
    const ret = await Storage.get({ key: 'chatID' });
    if(ret.value){
      return JSON.parse(ret.value);
    }
  }


  //logic to get the chat messages from the db using orgId and userId
  getChat(){
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
        }).valueChanges.subscribe(async (result) => {
          console.log(result);
          const data = result.data as {
            getUserType: string
          }
          if(data.getUserType == "Adopter"){
            //if adopter, then the orgID is in local storage
            this.orgID = (await this.getObject()).chateeId;
              this.userID = this.currentUserId;
              //get the chat using the orgId and adopterId
              const getChat = gql`query {
                findChatByOrgIdAndAdopterId(orgId: "${this.orgID}", adopterId: "${this.userID}"){
                  messages{
                    userId
                    message
                  },
                  disabled
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
                      userId: string,
                      message: string
                    }[],
                    disabled: boolean
                  }
                }
                this.disabled = data.findChatByOrgIdAndAdopterId.disabled;
                //add the messages to the messages array using a foreach
                

                const getOrgNameQuery = gql`query {
                  findOrgById(_id: "${this.orgID}"){
                    name
                  }
                }`;

                this.apollo.watchQuery({
                  query: getOrgNameQuery,
                  fetchPolicy: 'no-cache'
                }).valueChanges.subscribe((result) => {
                  console.log(result);
                  const data1 = result.data as {
                    findOrgById: {
                      name: string
                    }
                  }
                  this.chateeName = data1.findOrgById.name;
                  this.messages = [];
                  data.findChatByOrgIdAndAdopterId.messages.forEach((message) => {
                    if(message.userId == this.currentUserId){
                      this.userName = "You";
                    }else{
                      this.userName = this.chateeName;
                    }
                    this.messages.push({
                      user: this.userName,
                      msg: message.message
                    });
                  });
                });
              });
          } else if(data.getUserType == "OrgMember"){
            //if orgmember, then the adopterID is in local storage, and the org id can be gotten from the orgmember
              this.userID = (await this.getObject()).chateeId;
              const getOrgId = gql`query {
                findOrgMemberById(_id: "${this.currentUserId}"){
                  organisation
                }
              }`;

              this.apollo.watchQuery({
                query: getOrgId,
                fetchPolicy: 'no-cache'
              }).valueChanges.subscribe((result) => {
                console.log(result);
                const data = result.data as {
                  findOrgMemberById: {
                    organisation: string
                  }
                }
                this.orgID = data.findOrgMemberById.organisation;
                //get the chat using the orgId and adopterId
                const getChat = gql`query {
                  findChatByOrgIdAndAdopterId(orgId: "${this.orgID}", adopterId: "${this.userID}"){
                    messages{
                      userId
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
                        userId: string,
                        message: string
                      }[]
                    }
                  }
                  //add the messages to the messages array using a foreach

                  const getAdopterNameQuery = gql`query {
                    findAdopterById(_id: "${this.userID}"){
                      name
                    }
                  }`;
  
                  this.apollo.watchQuery({
                    query: getAdopterNameQuery,
                    fetchPolicy: 'no-cache'
                  }).valueChanges.subscribe((result) => {
                    console.log(result);
                    const data1 = result.data as {
                      findAdopterById: {
                        name: string
                      }
                    }
                    this.chateeName = data1.findAdopterById.name;
                    this.messages = [];
                    data.findChatByOrgIdAndAdopterId.messages.forEach((message) => {
                      if(message.userId == this.orgID){
                        this.userName = "You";
                      }else{
                        this.userName = this.chateeName;
                      }
                      this.messages.push({
                        user: this.userName,
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
  sendMessage(){     
    if(this.currentUserId == this.userID){
      const messageQuery = gql`mutation {
        sendMessage(orgId: "${this.orgID}", adopterId: "${this.userID}", senderId: "${this.currentUserId}", message: "${this.newMsg}"){
          orgId
        }
      }`;

      this.apollo.mutate({
        mutation: messageQuery,
        fetchPolicy: 'no-cache'
      }).subscribe(() => {
        this.newMsg = ''; 
        this.getChat();
      });
    }else{
      const messageQuery = gql`mutation {
        sendMessage(orgId: "${this.orgID}", adopterId: "${this.userID}", senderId: "${this.orgID}", message: "${this.newMsg}"){
          orgId
        }
      }`;

      this.apollo.mutate({
        mutation: messageQuery,
        fetchPolicy: 'no-cache'
      }).subscribe(() => {
        this.newMsg = ''; 
        this.getChat();
      });
    }
  }

  back(){
    //Will need to tell the difference between orguser and adopter and then navigate accordingly.
    // this.router.navigate(["/tabs/tab1"]);
  }
  appointmentPage(){
    this.router.navigate(['/appointmentpage']);
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

