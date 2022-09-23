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
    
    
    //get the orgID and the userID from local Storage
    const orgID = (await this.getObject()).orgID;
    const userID = (await this.getObject()).userID;
    const messageToSend = "Appointment booked for: " + this.inputName + " at " + this.inputLocation + " on " + this.inputStartDate + " to " + this.inputEndDate;
    //sendMessage query
    const sendMessage = gql`
      mutation { 
        sendMessage(orgId: "${orgID} ", userId: "${userID}", senderId: "${userID}", message: "${messageToSend}"){
        chatId
      }
    }`;
    this.apollo.mutate({
      mutation: sendMessage
    }).subscribe(({ data }) => {
      console.log('got data', data);
    },(error) => {
      console.log('there was an error sending the query', error);
    });
    
    
    return;
  }

  async getObject() {
    const ret = await Storage.get({ key: 'appointmentId' });
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

