import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { Storage } from '@capacitor/storage';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Component({
  selector: 'pawdopt-useradoption',
  templateUrl: 'useradoption.page.html',
  styleUrls: ['useradoption.page.scss', '../../../../../shared/styles/global.scss'],
  providers: [Apollo, AngularFireAuth]
})
export class useradoptionPageComponent {

  isDisabled = true; //for button to confirm adoption, set to true default. Once confirmed, set to false. 
  dogId!: string;
  userId!: string;
  orgName!: string;
  adopterEmail!: string;
  orgId!: string;

  dog: {
    _id: string,
    name: string,
    age: number,
    breed: string,
    pic: string,
    about: string,
    height: number,
    weight: number,
    furLength: string,
    temperament: string
  } = {
    _id: "",
    name: "",
    age: 0,
    breed: "",
    pic: "",
    about: "",
    height: 0,
    weight: 0,
    furLength: "",
    temperament: ""
  }

  user: {
    _id: string,
    name: string,
    pic: string,
    uploadedDoc: boolean
  } = {
    _id: "",
    name: "",
    pic: "",
    uploadedDoc: false
  }

  constructor(private router: Router, private apollo: Apollo, private afAuth: AngularFireAuth) {
    this.getAdoptions();
  }

  async getAdoptions() {
    this.dogId = (await this.getObject()).dogId;
    this.userId = (await this.getObject()).userId;

    const findDogByIdQuery = gql ` query{
    findDogById(_id: "${this.dogId}"){
      _id
      name
      dob
      breed
      pics
      about
      height
      weight
      furLength
      temperament
      organisation{
        _id
      }
  }
  }`;
    this.apollo.watchQuery({
      query: findDogByIdQuery,
      fetchPolicy: 'no-cache'
    }).valueChanges.subscribe((result) => {
      const data = result.data as {
        findDogById: {
          _id: string,
          name: string,
          dob: Date,
          breed: string,
          pics: [string],
          about: string,
          height: number,
          weight: number,
          furLength: string,
          temperament: string,
          organisation: {
            _id: string
          }
        }
      }
      this.dog._id = data.findDogById._id;
      this.dog.name = data.findDogById.name;
      //this.dog.age needs to be calculated from dob
      this.dog.age = new Date().getFullYear() - new Date(data.findDogById.dob).getFullYear();
      this.dog.breed = data.findDogById.breed;
      this.dog.pic = data.findDogById.pics[0];
      this.dog.about = data.findDogById.about;
      this.dog.height = data.findDogById.height;
      this.dog.weight = data.findDogById.weight;
      this.dog.furLength = data.findDogById.furLength;
      this.dog.temperament = data.findDogById.temperament;
      this.orgId = data.findDogById.organisation._id;

      const findUserByIdQuery = gql ` query{ 
    findAdopterById(_id: "${this.userId}"){
      _id
      name
      pic
      uploadedDocs
    }
    }`;
      this.apollo.watchQuery({
        query: findUserByIdQuery,
        fetchPolicy: 'no-cache'
      }).valueChanges.subscribe((result) => {
        const data = result.data as {
          findAdopterById: {
            _id: string,
            name: string,
            pic: string,
            uploadedDocs: boolean
          }
        }
        this.user._id = data.findAdopterById._id;
        this.user.name = data.findAdopterById.name;
        this.user.pic = data.findAdopterById.pic;
        this.user.uploadedDoc = data.findAdopterById.uploadedDocs;
      });
    });
  }

  onAccept() {
    this.isDisabled = false; //for button to confirm adoption, Once accepted, set to false. 
    this.afAuth.currentUser.then((user) => {
      const currentUser = user?.uid;
      const acceptAdoptionQuery = gql ` mutation{
      acceptAdoption(orgmemberId: "${currentUser}", adopterId: "${this.userId}", dogId: "${this.dogId}")
      }`;
      this.apollo.mutate({
        mutation: acceptAdoptionQuery,
        fetchPolicy: 'no-cache'
      });
    });
    this.router.navigate(['/adoptionprocess']);
  }

  onDecline() {
    this.afAuth.currentUser.then((user) => {
      const currentUser = user?.uid;
      const rejectAdoptionQuery = gql ` mutation{
      rejectAdoption(orgmemberId: "${currentUser}", adopterId: "${this.userId}", dogId: "${this.dogId}"){
        name
      }
      }`;
      this.apollo.mutate({
        mutation: rejectAdoptionQuery,
        fetchPolicy: 'no-cache'
      })
    });
    this.router.navigate(['/adoptionprocess']);
  }

  onComplete(){
    this.afAuth.currentUser.then((user) => {
      const currentUser = user?.uid;
      const completeAdoptionQuery = gql ` mutation{
      completeAdoption(orgmemberId: "${currentUser}", adopterId: "${this.userId}", dogId: "${this.dogId}")
      }`;
      this.apollo.mutate({
        mutation: completeAdoptionQuery,
        fetchPolicy: 'no-cache'
      })
    });
  }

  async getObject() {
    const ret = await Storage.get({ key: 'adoptionId' });
    if (ret.value) {
      return JSON.parse(ret.value);
    }
  }

  async setObject2(chateeId : string, dogId : string) {
    await Storage.set({
    key: 'chatID',
    value: JSON.stringify({
      chateeId: chateeId,
      dogId : dogId
      })
    });
  }

  async setObject() {
    await Storage.set({
    key: 'userId',
    value: JSON.stringify({
      uId: this.userId
      })
    });
  }

  seeInfo(){
    this.setObject();
    this.router.navigate(["/userinfo"]);
  }

  home() {
    this.router.navigate(["/owneddogs"]);
  }

  likeddogs() {
    this.router.navigate(["/adoptionprocess"]);
  }

  profile() {
    this.router.navigate(["/orgprofile"]);
  }

  preferences() {
    this.router.navigate(["/orgsettings"]);
  }

  async gotoChat() {
    await this.setObject2(this.userId, this.dogId);
    this.router.navigate(["/chatlist"]);
  }

  back(){
    this.router.navigate(["/adoptionprocess"]);
  }
}
