import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { VarsFacade } from '@pawdopt/shared/data-store';

@Component({
  selector: 'pawdopt-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss', '../../../../../shared/styles/global.scss'],
  providers: [Apollo]
})
export class LoginPageComponent {

  inputEmail!: string;
  inputPassword!: string;
  public static orgName:string;
  public static adopterEmail:string;

  constructor(private router: Router, private apollo: Apollo, private varsFacade: VarsFacade) {    
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
          LoginPageComponent.adopterEmail = email;
          this.varsFacade.setEmail(email);
          this.router.navigate(["/home"]);
          return true;
        }
        else {
         return false;
        }
      } else {
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
            organisation: string;
            __typename: string;
          };
        };

        if (data.loginOrg != null) {

        const typeVar = data.loginOrg.__typename;
    
        if (typeVar == "OrgMemberType") { //"Adopter"
          this.varsFacade.setEmail(email);
          this.varsFacade.setOrgName(data.loginOrg.organisation);
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
    // console.log(this.inputEmail);
    // console.log(this.inputPassword);
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
      this.varsFacade.setEmail("");
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

