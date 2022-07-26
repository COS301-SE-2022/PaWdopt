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

  // getUserType(id: string){
  //   const getUserType = gql`query {
  //     getUserType(id: "${id}")
  //   }`;

  //   this.apollo.watchQuery({
  //     query: getUserType,
  //     fetchPolicy: 'no-cache'
  //   }).valueChanges.subscribe((result) => {
  //     console.log(result);
  //     const data = result.data as {
  //       getUserType: {
  //         userType: string
  //       }[]
        
  //     }
  //     return data.getUserType;
  //   });
  // }
  
  login()
  {
    const email = this.inputEmail;
    const password = this.inputPassword;
    
    this.fireAuth.signInWithEmailAndPassword(email, password).then((user) => {
      if(user.user?.uid)
      {
        const userType = user.user?.displayName;
        console.log(userType);
          if(userType == "Adopter")
          {
            this.router.navigate(['/home']);
          }
          else if(userType == "OrgMember")
          {
            this.router.navigate(['/owneddogs']);
          }
          else{
            //TODO: Add toast 
            this.router.navigate(["/login"]);
          }
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

