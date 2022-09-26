import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Apollo, gql } from 'apollo-angular';
import { Storage } from '@capacitor/storage';
// import { Adopter, OrgMember } from 'libs/backend/shell/api/feature/src/lib/api.schema';
@Component({
  selector: 'pawdopt-appointmentpage',
  templateUrl: 'appointmentpage.page.html',
  styleUrls: ['appointmentpage.page.scss', '../../../../../shared/styles/global.scss'],
  providers: [Apollo]
})
export class appointmentpagePageComponent {

  // inputEmail!: string;
  // inputPassword!: string;
  // public static orgName:string;
  // public static adopterEmail:string;
  inputName!: string;
  inputEmail!: string;
  inputLocation!: string;
  inputDescription!: string;
  inputStartDate!: Date;
  inputEndDate!: Date;
  // startTime!: string;
  // endTime!: string;

  orgID!: string;
  userID!: string;
  dogId!: string;

  
  

  constructor(private router: Router, private apollo: Apollo){

  }

  async makeAppointment(){
    //Google freebusy query call
    // const getFreeBusyOrg = gql`query {
    //   getFreeBusy(id: "${this.inputEmail}", start: "${this.inputStartDate}", end: "${this.inputEndDate}")
    // }`;
    // this.apollo.watchQuery({
    //   query: getFreeBusyOrg,
    //   fetchPolicy: 'no-cache'
    // }).valueChanges.subscribe(async (result) => {
    //   const data = result.data;
    //   console.log(data);
    //   if(data){
    //     const data = result.data as {
    //       getFreeBusy: string
    //     };
    //     if(data.getFreeBusy == "free"){
    //       //make appointment
    //     }
    //   }
    // });
    
    this.orgID = (await this.getObject()).orgId;
    this.userID = (await this.getObject()).userId;
    this.dogId = (await this.getObject2()).dogId;
    console.log(this.orgID + " " + this.userID + " " + this.dogId);
    // //get the orgID and the userID from local Storage
    // const orgID = (await this.getObject()).orgID;
    // const userID = (await this.getObject()).userID;
    // const dogId = (await this.getObject2()).dogId;
    const messageToSend = "Appointment booked for: " + this.inputName + " on " + this.inputStartDate + " to " + this.inputEndDate;
    //sendMessage query
    const sendMessage = gql`
      mutation { 
        sendMessage(orgId: "${this.orgID}", adopterId: "${this.userID}", senderId: "${this.userID}", message: "${messageToSend}", dogId: "${this.dogId}"){
        adopterId
      }
    }`;
    this.apollo.mutate({
      mutation: sendMessage,
      fetchPolicy: 'no-cache'
    }).subscribe(({ data }) => {
      console.log('got data', data);
      
      this.router.navigate(['/chat']);
    },(error) => {
      console.log('there was an error sending the query', error);
    });
  }

  async getObject() {
    const ret = await Storage.get({ key: 'appointmentId' });
    if(ret.value){
      return JSON.parse(ret.value);
    }
  }

  async getObject2() {
    const ret = await Storage.get({ key: 'fromChatToApp' });
    if(ret.value){
      return JSON.parse(ret.value);
    }
  }

  back(){
    this.router.navigate(['/chat']);
  }

  signup(){
    // Done in signup
    this.router.navigate(["/signup"]);
  }
  
  addorg(){
    this.router.navigate(["/addorg"]);
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
    //this.router.navigate(["/userinfo"]); Not implemented yet
  }

}

