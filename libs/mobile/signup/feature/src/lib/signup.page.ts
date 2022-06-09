import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Apollo, gql } from 'apollo-angular';
@Component({
  selector: 'pawdopt-signup',
  templateUrl: 'signup.page.html',
  styleUrls: ['signup.page.scss', '../../../../../shared/styles/global.scss'],
  providers: [Apollo]
})
export class SignupPageComponent {
  uName!: string;
  pass!: string;
  rePass!: string;
  idnum!: Date;
  email!: string;

  constructor(private router: Router, private apollo: Apollo) {
  }
  
  signUp(){
    // TODO Complete login validation

    console.log("signup validation");

    const username = this.uName;
    const password = this.pass;
    const rePassword = this.rePass;
    const idnum = this.idnum;
    const email = this.email;
    
    const checkEmail = gql`query {
      emailExists(email: "${this.email}")
    }`;

    this.apollo.watchQuery({
      query: checkEmail,
      fetchPolicy: 'no-cache'
    }).valueChanges.subscribe((result) => {
      console.log(result);
      const data = result.data as {
        emailExists: boolean;
      }
      if(username != null){
        if(password == rePassword){ 
          if(idnum != null){
            if(email != null){
              if(!data.emailExists){
                console.log("success");
                this.addUser();
              }else{
                console.log("failure");
                alert("Email already exists");
              }
            }else{
              console.log("failure");
              alert("Please enter an email");
            }
          }else{
            console.log("failure");
            alert("Please enter a valid ID number");
          }
        }else{
          console.log("failure");
          alert("Passwords do not match");
        }
      }else{
        console.log("failure");
        alert("Please enter a username");
      }
    });
  }

  addUser(){
    const addUser = gql`mutation {
      createAdopter(adopter: {
        name: "${this.uName}",
        email: "${this.email}",
        password: "${this.pass}",
        IDNum: "${this.idnum}",
        pic: null,
        location: null,
        documents:[],
        dogsLiked: [],
        questionnaire: "",
        distance: -1
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
}
