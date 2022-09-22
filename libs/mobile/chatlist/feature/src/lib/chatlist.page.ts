import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Apollo, gql } from 'apollo-angular';
import { VarsFacade } from '@pawdopt/shared/data-store';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Storage } from '@capacitor/storage';

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
  }[] = [];

  currentUserId?: string;
  orgId!: string;


  constructor(private router: Router, private apollo: Apollo, private varsFacade: VarsFacade, private afAuth: AngularFireAuth){}

  //function to fill the list of chats
  getChats(orgId : string, adopterId : string){
    this.listOfChats = [];
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
            //get the list of chats for the adopter
            const getChats = gql`query {
              findChatsByAdopterId(adopterId: "${adopterId}"){
                adopterId
                orgId
                dogId
                messages{
                  sender
                  message
                }
              }
            }`;

            this.apollo.watchQuery({
              query: getChats,
              fetchPolicy: 'no-cache'
            }).valueChanges.subscribe((result) => {
              console.log(result);
              const data2 = result.data as {
                findChatsByAdopterId: {
                  adopterId: string;
                  orgId: string;
                  dogId: string;
                  messages: {
                    sender: string;
                    message: string;
                  }[]
                }[]
              }
              //for each chat, get the org name and dog name
              data2.findChatsByAdopterId.forEach((chat) => {
                const getOrgName = gql`query {
                  findOrgById(id: "${chat.orgId}"){
                    name
                    logo
                  }
                }`;

                this.apollo.watchQuery({
                  query: getOrgName,
                  fetchPolicy: 'no-cache'
                }).valueChanges.subscribe((result) => {
                  console.log(result);
                  const data1 = result.data as {
                    findOrgById: {
                      name: string;
                      logo: string;
                    }
                  }
                  const getDogName = gql`query {
                    findDogById(id: "${chat.dogId}"){
                      name
                      pics
                    }
                  }`;

                  this.apollo.watchQuery({
                    query: getDogName,
                    fetchPolicy: 'no-cache'
                  }).valueChanges.subscribe((result) => {
                    console.log(result);
                    const data = result.data as {
                      findDogById: {
                        name: string;
                        pics: string[];
                      }
                    }
                    //add the chat to the list
                    this.listOfChats.push({
                      chateeId: chat.orgId,
                      chateeName: data1.findOrgById.name,
                      chateePic: data1.findOrgById.logo,
                      dogId: chat.dogId,
                      dogName: data.findDogById.name,
                      dogPic: data.findDogById.pics[0],
                    });
                  });
                });
              });
            });
          }
          else if(data.getUserType == "OrgMember"){
            //get the list of chats for the org
            
            const getChats = gql`query {
              findChatsByOrgId(orgId: "${orgId}"){
                adopterId
                orgId
                dogId
                messages{
                  sender
                  message
                }

              }
            }`;

            this.apollo.watchQuery({
              query: getChats,
              fetchPolicy: 'no-cache'
            }).valueChanges.subscribe((result) => {
              console.log(result);
              const data = result.data as {
                findChatsByOrgId: {
                  adopterId: string;
                  orgId: string;
                  dogId: string;
                  messages: {
                    sender: string;
                    message: string;
                  }[]
                }[]
              }
              //for each chat, get the adopter name and dog name
              data.findChatsByOrgId.forEach((chat) => {
                const getAdopterName = gql`query {
                  findAdopterById(id: "${chat.adopterId}"){
                    name
                    pic
                  }
                }`;

                this.apollo.watchQuery({
                  query: getAdopterName,
                  fetchPolicy: 'no-cache'
                }).valueChanges.subscribe((result) => {
                  console.log(result);
                  const data1 = result.data as {
                    findAdopterById: {
                      name: string;
                      pic: string;
                    }
                  }
                  const getDogName = gql`query {
                    findDogById(id: "${chat.dogId}"){
                      name
                      pics
                    }
                  }`;

                  this.apollo.watchQuery({
                    query: getDogName,
                    fetchPolicy: 'no-cache'
                  }).valueChanges.subscribe((result) => {
                    console.log(result);
                    const data = result.data as {
                      findDogById: {
                        name: string;
                        pics: string[];
                      }
                    }
                    //add the chat to the list
                    this.listOfChats.push({
                      chateeId: chat.adopterId,
                      chateeName: data1.findAdopterById.name,
                      chateePic: data1.findAdopterById.pic,
                      dogId: chat.dogId,
                      dogName: data.findDogById.name,
                      dogPic: data.findDogById.pics[0],
                    });
                    //get the orgid
                    
                  });
                });
              });
            });
          }
          else{
            //alert to say there is an error
            this.router.navigate(["/login"]);
          }
        });
      }
  });
  }


  //function to navigate to the chat page
  async gotoChat(chateeId : string, dogId : string){
    //pass the parameters to the chat page
    await this.setObject(chateeId, dogId);
    this.router.navigate(["/chat"]);
  }

  async getObject() {
    const ret = await Storage.get({ key: 'dogID' });
    if(ret.value){
      return JSON.parse(ret.value);
    }
  }

  async setObject(chateeId : string, dogId : string) {
    await Storage.set({
    key: 'chatID',
    value: JSON.stringify({
      chateeId: chateeId,
      dogId : dogId
      })
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
    //this.router.navigate(["/userinfo"]); 
  }

}

