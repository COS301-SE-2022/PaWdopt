import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Apollo, gql } from 'apollo-angular';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { validate } from 'graphql';
@Component({
  selector: 'pawdopt-signup',
  templateUrl: 'signup.page.html',
  styleUrls: ['signup.page.scss', '../../../../../shared/styles/global.scss'],
  providers: [Apollo, AngularFireAuth],
})
export class SignupPageComponent {
  uName!: string;
  pass!: string;
  rePass!: string;
  idnum!: string;
  email!: string;

  uid: string;

  constructor(private router: Router, private apollo: Apollo, private fireAuth: AngularFireAuth) {
    this.uid = "";
  }
  
  
  signUp(){
    if(!this.validate())
      return;

    this.fireAuth.createUserWithEmailAndPassword(this.email, this.pass).then((user) => {
      console.log("User created");
      console.log(user);
      this.addUser(user.user?.uid);
    }).catch((error) => {
      console.log(error);
      //TODO: Toast error message
    });

    // this.fireAuth.currentUser.then((user) => {
    //   console.log(user?.uid);
    // });
    //TODO: Complete login validation
    
  }

  addUser(uid?: string){
    const addUser = gql`mutation {
      createAdopter(adopter: {
        uid: "${uid}",
        name: "${this.uName}",
        email: "${this.email}",
        password: "${this.pass}",
        IDNum: "${this.idnum}",
        uploadedDocs: false
      })
      {
        name
      }
    }`;

    this.apollo.mutate({
      mutation: addUser,
    }).subscribe(({data}) => {
      console.log('got data', data);
      this.router.navigate(["/home"]);
    });
  }

  back(){
    // Takes the user to the login page
    console.log("moving to login");
    this.router.navigate(["/login"]);
  }

  validate(){
    //TODO: Make validation better
    let valid = true;
    if(this.uName == null || this.uName == ""){
      valid = false;
    }
    if(this.pass == null || this.pass == ""){
      valid = false;
    }
    if(this.rePass == null || this.rePass == "" || this.rePass != this.pass){
      valid = false;
    }
    if(this.idnum == null || this.idnum == "" || this.idnum.length != 13){
      valid = false;
    }
    if(this.email == null || this.email == "" || !this.email.includes("@") || !this.email.includes(".")){
      valid = false;
    }

    return valid;
  }  
}