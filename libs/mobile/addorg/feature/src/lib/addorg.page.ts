import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { timeout } from 'rxjs';
@Component({
  selector: 'pawdopt-addorg',
  templateUrl: 'addorg.page.html',
  styleUrls: ['addorg.page.scss', '../../../../../shared/styles/global.scss'],
  providers: [Apollo, AngularFireAuth]
})
export class AddorgPageComponent {
  oName!: string;
  about!: string;
  date!: Date;
  lat!: string;
  lng!: string;
  rulesReq!: string;
  email!: string;
  phone!: string;
  website!: string;
  facebook!: string;
  instagram!: string;
  twitter!: string;
  logo!: string;
  orgMembers: [{
    id?: string;
    name: string;
    email: string;
    role: string;
    verification: string;
  }]
  slideOpts = {
    slidesPerView: 1,
    freeMode: false,
    effect: 'fade',
    fadeEffect: {
      crossfade: true
    }
  }

  constructor(private router: Router, private apollo: Apollo, private fireAuth: AngularFireAuth) {
    this.orgMembers=[{
      id: "",
      name: "",
      email: "",
      role: "",
      verification: new Date().getFullYear()+"-"+new Date().getMonth()+"-"+new Date().getDate()
      }];
    this.orgMembers.pop();
  }

  async addOrg(){
    //TODO: Add validation

    if(this.rulesReq == null || this.rulesReq == undefined){
      this.rulesReq = "";
    }
    if(this.email == null || this.email == undefined){
      this.email = "";
    }
    if(this.phone == null || this.phone == undefined){
      this.phone = "";
    }
    if(this.website == null || this.website == undefined){
      this.website = "";
    }
    if(this.facebook == null || this.facebook == undefined){
      this.facebook = "";
    }
    if(this.instagram == null || this.instagram == undefined){
      this.instagram = "";
    }
    if(this.twitter == null || this.twitter == undefined){
      this.twitter = "";
    }
    if(this.logo == null || this.logo == undefined){
      this.logo = "";
    }

    console.log(this.orgMembers);

    //

    this.orgMembers.forEach(async o => {
      const user = await this.fireAuth.createUserWithEmailAndPassword(o.email, "123456")
        console.log("User created");
        console.log(user);
        user.user?.updateProfile({
          displayName: o.name,
        });
        console.log(user.user?.uid);
        o.id = user.user?.uid;
        o.verification = new Date().getFullYear()+"-"+new Date().getMonth()+"-"+new Date().getDate();
      });

    //create custom string for orgMembers
    setTimeout(() => {console.log("slept")},9000);
    console.log("here" + this.orgMembers[0].id);
    let orgMembersString = "";
    this.orgMembers.forEach(o => {
      orgMembersString += `{\n_id: "` + o.id + `",\n`;
      orgMembersString += `name: "` + o.name + `",\n`;
      orgMembersString += `email: "` + o.email + `",\n`;
      orgMembersString += `role: "` + o.role + `",\n`;
      orgMembersString += `organisation: "` + "bob" + `",\n`;
      orgMembersString += `verification: "` + o.verification + `"\n},\n`;
    });


    

    const addOrg = gql`mutation{
      createOrg(org:{
        _id: "",
        name: "${this.oName}",
        about: "${this.about}",
        dateFounded: "${this.date}",
        totalAdoptions: 0,
        totalDogs: 0,
        members: [${orgMembersString}],
        location:{
          lat: ${Number(this.lat)},
          lng: ${Number(this.lng)}
        },
        rulesReq: "${this.rulesReq}",
        contactInfo:{
          _id: "",
          email: "${this.email}",
          phone: "${this.phone}",
          website: "${this.website}",
          facebook: "${this.facebook}",
          instagram: "${this.instagram}",
          twitter: "${this.twitter}"
        },
        logo: "${this.logo}"
      })
      {
        name
      }
    }`;

    console.log(addOrg);
    this.apollo.mutate({
      mutation: addOrg,
    }).subscribe(({data}) => {
      console.log('got data', data);
      this.router.navigate(["/owneddogs"]);
    });
  }

  async addOrgMemberCard(){
    this.orgMembers.push({
      id: "",
      name: "",
      email: "",
      role: "",
      verification: new Date().getFullYear()+"-"+new Date().getMonth()+"-"+new Date().getDate()
    });
  }

  deleteOrgMemberCard(o: {id?: string; name: string; email: string; role: string; verification: string;}){
    const index = this.orgMembers.indexOf(o);
    this.orgMembers.splice(index, 1);
    const slides = document.querySelector('ion-slides');
    slides?.slidePrev();
  }

  uploadPic(){
    // TODO: Upload pic
  }

  uploadDoc(){
    // TODO: Upload doc
  }

  Back(){
    this.router.navigate(["/login"]);
  }
}
