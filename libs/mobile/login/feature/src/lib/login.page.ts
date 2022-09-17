import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { VarsFacade } from '@pawdopt/shared/data-store';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { GoogleAuthProvider } from 'firebase/auth';

@Component({
  selector: 'pawdopt-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss', '../../../../../shared/styles/global.scss'],
  providers: [Apollo, AngularFireAuth],
})
export class LoginPageComponent {

  inputEmail!: string;
  inputPassword!: string;

  constructor(private router: Router, private apollo: Apollo, private fireAuth: AngularFireAuth) {
    
  }
  
  getUserType(id?: string){
    console.log("running");
    const getUserType = gql`query {
      getUserType(id: "${id}")
    }`;
  
   this.apollo.watchQuery({
      query: getUserType,
      fetchPolicy: 'no-cache'
    }).valueChanges.subscribe((result) => {
      console.log(result);
      const data = result.data as {
        getUserType: string
      }
      if(data.getUserType == "Adopter")
        {
          this.router.navigate(['/home']);
        }
        else if(data.getUserType == "OrgMember")
        {
          this.router.navigate(['/owneddogs']);
        }
        else{
          //TODO: Add toast 
          throw new Error("User type not found");
        }
    });
  }

  login()
  {
    const email = this.inputEmail;
    const password = this.inputPassword;
    
    this.fireAuth.signInWithEmailAndPassword(email, password).then((user) => {
      try{
        this.getUserType(user.user?.uid);
      }
      catch(e){
        console.log(e);
      }
    }).catch((error) => {
      console.log("Error signing in");
      console.log(error);
      //TODO: add toast with error message
    });    
}

googleSignin(){
  return this.fireAuth.signInWithPopup(new GoogleAuthProvider()).then((user) => {
    console.log("running");
    const getUserType = gql`query {
      getUserType(id: "${user.user?.uid}")
    }`;
  
   this.apollo.watchQuery({
      query: getUserType,
      fetchPolicy: 'no-cache'
    }).valueChanges.subscribe((result) => {
      console.log(result);
      const data = result.data as {
        getUserType: string
      }
      if(data.getUserType == "Adopter")
        {
          this.router.navigate(['/home']);
        }
        else if(data.getUserType == "OrgMember")
        {
          this.router.navigate(['/owneddogs']);
        }
        else{
          const addUser = gql`mutation {
            createAdopter(adopter: {
              _id: "${user.user?.uid}",
              name: "${user.user?.displayName}",
              email: "${user.user?.email}",
              IDNum: "",
              pic: "${user.user?.photoURL}",
              uploadedDocs: false,
            })
            {
              name
            }
          }`;
          this.apollo.mutate({
            mutation: addUser,
          }).subscribe(() => {
            this.router.navigate(["/home"]);
          });
        }
    });
  }).catch((error) => {
    console.log("Error signing in");
    console.log(error);
  }
);}

signup(){
  // Done in signup
  this.router.navigate(["/signup"]);
}
  
addorg(){
  this.router.navigate(["/addorg"]);
}

}

