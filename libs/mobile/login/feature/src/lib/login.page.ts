import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Apollo, gql } from 'apollo-angular';
// import { Adopter, OrgMember } from 'libs/backend/shell/api/feature/src/lib/api.schema';
@Component({
  selector: 'pawdopt-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss', '../../../../../shared/styles/global.scss'],
  providers: [Apollo]
})
export class LoginPageComponent {

  inputEmail!: string;
  inputPassword!: string;

  constructor(private router: Router, private apollo: Apollo){}


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
      loginOrg(email: "${email}", password: "${password}") { name }
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
    console.log(this.inputEmail);
    console.log(this.inputPassword);
    //Adopter user: "jason@gmail.com" "1234"
    //Organisation user: "judy@gmail.com" "0000"
    //"${email}" "${password}"

      
    if(this.loginadoptquery(email, password))
    {
      console.log("successful login");
    }
    else if(this.loginorgquery(email, password))
    {
      console.log("successful login");
    }
    else
    {
      console.log("Login failed"); //CHANGE TO TOAST 
      this.router.navigate(["/login"]);
    }
    
}


  signup(){
    // Done in signup
    this.router.navigate(["/signup"]);
  }
  
  addorg(){
    this.router.navigate(["/addorg"]);
  }

}

