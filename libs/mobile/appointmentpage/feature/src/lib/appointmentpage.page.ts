import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Apollo, gql } from 'apollo-angular';
import { Storage } from '@capacitor/storage';
import { LoadingController } from '@ionic/angular';
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
  loading: Promise<HTMLIonLoadingElement>;
  

  constructor(private router: Router, private apollo: Apollo, private loadingCtrl: LoadingController){
    this.loading = this.loadingCtrl.create({
      message: 'Loading...',
    });
  }

  async showLoading() {
    (await this.loading).present();
  }

  async hideLoading() {
    (await this.loading).dismiss();
  }

  async makeAppointment(){
    this.showLoading();
    this.orgID = (await this.getObject()).orgId;
    this.userID = (await this.getObject()).userId;
    this.dogId = (await this.getObject2()).dogId;
    const messageToSend = "Appointment booked for: " + this.inputName + " on " + this.inputStartDate + " to " + this.inputEndDate;
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
      this.hideLoading();
      this.router.navigate(['/chat']);
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
    this.router.navigate(["/preferences"]);
  }

  gotoChat(){
    this.router.navigate(["/chatlist"]);
  }
}

