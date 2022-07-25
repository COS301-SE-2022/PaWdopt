import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Apollo, gql } from 'apollo-angular';
import { VarsFacade } from '@pawdopt/shared/data-store';
import { AngularFireAuth } from "@angular/fire/compat/auth";

@Component({
  selector: 'pawdopt-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss', '../../../../../shared/styles/global.scss'],
  providers: [Apollo, VarsFacade, AngularFireAuth],
})
export class LoginPageComponent {

  inputEmail!: string;
  inputPassword!: string;

  constructor(private router: Router, private apollo: Apollo, private varsFacade: VarsFacade, private fireAuth: AngularFireAuth) {
    
  }



   loginadoptquery(email: string, password:string){
    const LoginQueryAdopter = gql`query {
      loginAdopter(email: "${email}", password: "${password}") { name }
    }`;

   
    this.apollo.watchQuery({
      query: LoginQueryAdopter,
      fetchPolicy: 'no-cache'
    }).valueChanges.subscribe((result) => {

    
        const data = result.data as {
          loginAdopter: {
            __typename: string;
          };
        };

        if (data.loginAdopter != null) {
        const typeVar = data.loginAdopter.__typename;

        if (typeVar == "AdopterType") { //"Adopter"
          this.router.navigate(["/home"]);
          return true;
        }
        else{
         //successfulquery = this.loginorgquery(email, password);
         return false;
        }
      } else{
        //successfulquery = this.loginorgquery(email, password);
        return false;
      }

    });
    return false;
  }

   loginorgquery(email: string, password:string){
     let successfulquery = false;
    const LoginQueryOrg = gql`query {
      loginOrg(email: "${email}", password: "${password}") { name, organisation }
    }`;

    this.apollo.watchQuery({
      query: LoginQueryOrg,
      fetchPolicy: 'no-cache'
    }).valueChanges.subscribe((result) => {
        const data = result.data as {
          loginOrg: {
            __typename: string;
          };
        };

        if (data.loginOrg != null) {

        const typeVar = data.loginOrg.__typename;
    
        if (typeVar == "OrgMemberType") { //"Adopter"
          this.router.navigate(["/owneddogs"]);
          successfulquery = true;
        }
      }
    });
    return successfulquery;
  }
  
  login()
  {
    const email = this.inputEmail;
    const password = this.inputPassword;
    
    this.fireAuth.signInWithEmailAndPassword(email, password).then((user) => {
      console.log("Successfully signed in");
      console.log(user);
      if(!this.loginadoptquery(email, password) && !this.loginorgquery(email, password))
      {
        //TODO: Add toast 
        this.router.navigate(["/login"]);
      }
    }).catch((error) => {
      console.log("Error signing in");
      console.log(error);
      //TODO: add toast with error message
    });    
}


  signup(){
    // Done in signup
    this.router.navigate(["/signup"]);
  }
  
  addorg(){
    this.router.navigate(["/addorg"]);
  }

}

