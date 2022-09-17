import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
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
  oId!: string;
   // Readable Address
   address!: string;

   // Location coordinates
  latitude!: number;
  longitude!: number;
  accuracy!: number;

  //Geocoder configuration
  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };

  constructor(private router: Router, private apollo: Apollo, private fireAuth: AngularFireAuth, private geolocation: Geolocation, private nativeGeocoder: NativeGeocoder) {
    this.getGeolocation();
    this.orgMembers=[{
      id: "",
      name: "",
      email: "",
      role: "",
      verification: new Date().getFullYear()+"-"+new Date().getMonth()+"-"+new Date().getDate()
      }];
    this.orgMembers.pop();
  }

  //Get current coordinates of device
  getGeolocation() {
    this.geolocation.getCurrentPosition().then((resp) => {

      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      this.accuracy = resp.coords.accuracy;

      this.getGeoencoder(resp.coords.latitude, resp.coords.longitude);

    }).catch((error) => {
      alert('Error getting location' + JSON.stringify(error));
    });
  }

  //geocoder method to fetch address from coordinates passed as arguments
  getGeoencoder(latitude : number, longitude: number) {
    this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoencoderOptions)
      .then((result: NativeGeocoderResult[]) => {
        this.address = this.generateAddress(result[0]);
      })
      .catch((error: any) => {
        alert('Error getting location' + JSON.stringify(error));
      });
  }

  generateAddress(addressObj : any) {
    const obj = [];
    let address = "";
    for (const key in addressObj) {
      obj.push(addressObj[key]);
    }
    obj.reverse();
    for (const val in obj) {
      if (obj[val].length)
        address += obj[val] + ', ';
    }
    return address.slice(0, -2);
  }

  addOrg(){
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

    //create custom string for orgMembers
    // 
    // let orgMembersString = "";
    // this.orgMembers.forEach(o => {
    //   o.id = o.email;
    //   orgMembersString += `{\n_id: "` + o.id + `",\n`;
    //   orgMembersString += `name: "` + o.name + `",\n`;
    //   orgMembersString += `email: "` + o.email + `",\n`;
    //   orgMembersString += `role: "` + o.role + `",\n`;
    //   orgMembersString += `organisation: "Marcus - return of the king",\n`;
    //   orgMembersString += `verification: "` + o.verification + `"\n},\n`;
    // });

    const addOrg = gql`mutation{
      createOrg(org:{
        _id: "",
        name: "${this.oName}",
        about: "${this.about}",
        dateFounded: "${this.date}",
        totalAdoptions: 0,
        totalDogs: 0,
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
        _id
        name
      }
    }`;

    
    this.apollo.mutate({
      mutation: addOrg,
    }).subscribe(result => {
      const createOrg = result.data as {
        createOrg: {
          name: string,
          _id: string
        }
      }
      this.oId = createOrg.createOrg._id;

      this.orgMembers.forEach(o => {
        o.email.toLowerCase();
        this.fireAuth.createUserWithEmailAndPassword(o.email, "123456").then((user) => {
          user.user?.updateProfile({
            displayName: o.name,
          });
          const id = user.user?.uid;
          o.verification = new Date().getFullYear()+"-"+new Date().getMonth()+"-"+new Date().getDate();

          const createOrgMember = gql`mutation{
            createOrgMember(member:{
              _id: "${id}",
              name: "${o.name}",
              email: "${o.email}",
              role: "${o.role}",
              organisation: "${this.oId}",
              verification: "${o.verification}"
            }){
              _id
            }
          }`;
          // 
          this.apollo.mutate({
            mutation: createOrgMember,
            fetchPolicy: 'no-cache'
          }).subscribe(() => {
            this.router.navigate(["/owneddogs"]);
          });
        })
      });
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
